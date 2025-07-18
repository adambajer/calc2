# calendar_parser.py

import datetime
import json
import requests
from bs4 import BeautifulSoup

# české měsíce → číslo měsíce
CZ_MONTHS = {
    'Leden':   1, 'Únor':    2, 'Březen':   3,
    'Duben':   4, 'Květen':  5, 'Červen':   6,
    'Červenec':7, 'Srpen':   8, 'Září':     9,
    'Říjen':  10, 'Listopad':11, 'Prosinec':12
}

TARGET_URL = (
    'https://obsazenost.e-chalupy.cz'
    '/kalendar.php?id=4013&jednotky=ano&legenda=ano'
)

def fetch_and_parse():
    resp = requests.get(TARGET_URL, timeout=10)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')

    data = {}
    for tbl in soup.find_all('table', class_='month'):
        # 1) najít header buňku
        header_td = tbl.find('td', class_='month-name')
        if not header_td:
            continue

        # 2) normalize a split
        header_text = header_td.get_text(strip=True).replace('\u00A0', ' ')
        parts = header_text.split()
        if len(parts) != 2:
            continue
        cz_month, cz_year = parts

        month = CZ_MONTHS.get(cz_month)
        year  = int(cz_year)
        if not month:
            continue

        # 3) projít všechny <td> v tabulce
        for td in tbl.find_all('td'):
            classes = td.get('class', [])

            # skip header and prev/next‑month cells
            if 'month-name' in classes or 'day-shdw' in classes:
                continue

            txt = td.get_text(strip=True)
            if not txt.isdigit():
                continue

            day = int(txt)
            # složit validní date
            try:
                dt = datetime.date(year, month, day)
            except ValueError:
                continue

            data[dt.isoformat()] = {
                'classes': classes,
                'title': td.get('title', '').strip()
            }

    return data

def main():
    parsed = fetch_and_parse()
    print(json.dumps(parsed, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
