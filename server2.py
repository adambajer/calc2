import datetime
import re
import json
from flask import Flask, Response
import requests
from bs4 import BeautifulSoup
from collections import defaultdict

app = Flask(__name__)

TARGET_URL = (
    'https://obsazenost.e-chalupy.cz'
    '/kalendar.php?id=4013&jednotky=ano&legenda=ano'
)

def parse_calendar_data(html_content):
    """
    Parsuje HTML obsah kalendáře a vrací data o obsazenosti strukturovaná podle data.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    calendar_by_date = defaultdict(lambda: {})
    
    month_name_to_num = {
        'Leden': 1, 'Únor': 2, 'Březen': 3, 'Duben': 4, 'Květen': 5, 'Červen': 6,
        'Červenec': 7, 'Srpen': 8, 'Září': 9, 'Říjen': 10, 'Listopad': 11, 'Prosinec': 12
    }

    tables = soup.find_all('table', class_='month')

    for table in tables:
        month_year_tag = table.find('td', class_='month-name')
        if not month_year_tag:
            continue
        
        month_year_str = month_year_tag.get_text(strip=True)
        month_name_match = re.match(r'([A-Za-zěščřžýáíéůúóĚŠČŘŽÝÁÍÉŮÚÓ]+)\s*(\d{4})', month_year_str)
        
        current_month_name = None
        current_year = None
        current_month_num = None

        if month_name_match:
            current_month_name = month_name_match.group(1)
            current_year = int(month_name_match.group(2))
            current_month_num = month_name_to_num.get(current_month_name)
        else:
            continue

        rows = table.find_all('tr')
        for row_index, row in enumerate(rows):
            if 'days' in row.get('class', []):
                continue
            
            days_in_row = row.find_all('td', class_=lambda x: x and ('day-' in x or 'day-shdw' in x))
            
            for day_tag in days_in_row:
                day_text = day_tag.get_text(strip=True)
                title = day_tag.get('title', '')
                css_classes = day_tag.get('class', [])
                
                if 'day-shdw' in css_classes:
                    continue

                try:
                    day_num = int(day_text)
                    current_date_str = datetime.date(current_year, current_month_num, day_num).strftime('%Y-%m-%d')
                except (ValueError, TypeError):
                    continue

                original_title = title
                
                apartments_status_for_day = {
                    'A': {'state': 'unknown', 'classes': css_classes, 'original_title': original_title, 'title': ''},
                    'B': {'state': 'unknown', 'classes': css_classes, 'original_title': original_title, 'title': ''}
                }
                
                all_apartments = ['A', 'B']

                # Nejprve zjistíme hlavní stav dne z CSS tříd
                is_day_free = 'day-free' in css_classes
                is_day_full = 'day-full' in css_classes
                is_day_half = 'day-half' in css_classes
                
                # Zjištění, zda je den příjezdu nebo odjezdu (platí pro celý den, ale upřesníme pro AP)
                is_arrival_day_overall = ' z' in css_classes
                is_departure_day_overall = ' k' in css_classes

                for ap_key in all_apartments:
                    current_ap_state = 'unknown'
                    current_ap_title_text = '' # Jen textová část stavu

                    if is_day_free:
                        current_ap_state = 'free'
                        current_ap_title_text = "Volno"
                    elif is_day_full:
                        current_ap_state = 'occupied'
                        current_ap_title_text = "Obsazeno"
                    elif is_day_half:
                        # Pokud je den day-half, musíme pro každý apartmán zjistit, zda je to jeho den přechodu
                        # Hledáme "Volné jednotky: Apartmán X" v title.
                        # Pokud to najdeme, znamená to, že tento apartmán je na rozhraní (příjezd/odjezd)
                        is_ap_explicitly_available_in_title = re.search(rf'Volné jednotky:\s*Apartmán\s+{ap_key}', title)
                        
                        if is_ap_explicitly_available_in_title:
                            # Apartmán je zmíněn jako 'Volné jednotky', takže je v přechodu
                            # Musíme rozlišit, zda je to příjezd nebo odjezd na základě globálních tříd 'z' a 'k'
                            if is_arrival_day_overall:
                                current_ap_state = 'arrival'
                                current_ap_title_text = "Příjezd"
                            elif is_departure_day_overall:
                                current_ap_state = 'departure'
                                current_ap_title_text = "Odjezd"
                            else:
                                # Pokud není 'z' ani 'k', ale je 'Volné jednotky' -> bereme jako obecný přechodový den
                                # V tomto případě, pokud 'z' nebo 'k' není explicitně, zkusíme odvodit z celkového 'title'
                                if 'Den příjezdu' in original_title:
                                    current_ap_state = 'arrival'
                                    current_ap_title_text = "Příjezd"
                                elif 'Den odjezdu' in original_title:
                                    current_ap_state = 'departure'
                                    current_ap_title_text = "Odjezd"
                                else:
                                    # Fallback pro případ, kdy je day-half a "Volné jednotky", ale bez z/k tříd
                                    # Může to znamenat, že je volný v rámci částečné obsazenosti, ale není definováno jako ARR/DEP
                                    current_ap_state = 'free' # Pokud je Volné jednotky, považujeme ho za volný
                                    current_ap_title_text = "Volno"

                        else:
                            # Pokud apartmán NENÍ zmíněn jako 'Volné jednotky' a den je 'day-half'
                            # To znamená, že zatímco druhý apartmán je v přechodu, tento apartmán je obsazený.
                            current_ap_state = 'occupied'
                            current_ap_title_text = "Obsazeno"

                    # Složení finálního 'title' pro apartmán
                    final_ap_title = current_ap_title_text
                    
                    # Přidáme prefix "Den příjezdu, " nebo "Den odjezdu, " pokud je to relevantní
                    # a už to není součástí 'state' jako 'arrival'/'departure'
                    if is_arrival_day_overall and current_ap_state not in ['arrival', 'departure']:
                        final_ap_title = "Den příjezdu, " + final_ap_title
                    elif is_departure_day_overall and current_ap_state not in ['arrival', 'departure']:
                        final_ap_title = "Den odjezdu, " + final_ap_title
                    
                    # Pokud je stav explicitně arrival/departure, zajistíme správný prefix
                    if current_ap_state == 'arrival' and not final_ap_title.startswith("Den příjezdu"):
                         final_ap_title = "Den příjezdu, " + final_ap_title
                    elif current_ap_state == 'departure' and not final_ap_title.startswith("Den odjezdu"):
                         final_ap_title = "Den odjezdu, " + final_ap_title


                    apartments_status_for_day[ap_key]['state'] = current_ap_state
                    apartments_status_for_day[ap_key]['title'] = final_ap_title

                calendar_by_date[current_date_str] = apartments_status_for_day
    
    final_output = dict(calendar_by_date)
    return final_output

@app.route('/calendar2', methods=['GET'])
def get_availability_calendar2():
    """
    API endpoint pro získání dat o obsazenosti apartmánů, strukturovaných podle data.
    Dostupné na /calendar2.
    """
    try:
        response = requests.get(TARGET_URL)
        response.raise_for_status()
        
        parsed_data = parse_calendar_data(response.text)
        
        return Response(
            json.dumps(parsed_data, indent=4, ensure_ascii=False),
            mimetype='application/json'
        )
        
    except requests.exceptions.RequestException as e:
        error_message = f"Chyba při stahování kalendáře: {e}"
        return Response(
            json.dumps({"error": error_message}, indent=4, ensure_ascii=False),
            mimetype='application/json',
            status=500
        )

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

if __name__ == '__main__':
    app.run(debug=True)