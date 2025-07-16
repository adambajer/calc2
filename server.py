#!/usr/bin/env python3
# server.py — scrape & serve JSON on‐the‐fly with correct UTF‑8 encoding

import datetime
from flask import Flask, Response
import requests
from bs4 import BeautifulSoup
import json

app = Flask(__name__)

# Czech month names → number
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

@app.after_request
def add_cors(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/calendar')
def calendar():
    # 1) fetch HTML
    try:
        r = requests.get(TARGET_URL, timeout=10)
        r.raise_for_status()
    except Exception as e:
        return Response(f'Chyba při stahování: {e}', status=502, mimetype='text/plain')

    # ensure we interpret as UTF‑8
    r.encoding = 'utf-8'
    soup = BeautifulSoup(r.text, 'html.parser')

    data = {}

    # 2) parse each month table
    for tbl in soup.find_all('table', class_='month'):
        # header cell
        header = tbl.find('td', class_='month-name')
        if not header: continue

        header_text = header.get_text(strip=True).replace('\u00A0', ' ')
        parts = header_text.split()
        if len(parts) != 2: continue
        cz_month, cz_year = parts
        month = CZ_MONTHS.get(cz_month)
        try:
            year = int(cz_year)
        except:
            continue
        if not month: continue

        # day cells
        for td in tbl.find_all('td'):
            classes = td.get('class', [])
            # skip header/shadow cells
            if 'month-name' in classes or 'day-shdw' in classes:
                continue

            txt = td.get_text(strip=True)
            if not txt.isdigit(): continue
            day = int(txt)

            try:
                dt = datetime.date(year, month, day)
            except ValueError:
                continue

            data[dt.isoformat()] = {
                'classes': classes,
                'title': td.get('title', '').strip()
            }

    # 3) serialize as JSON with proper UTF‑8
    body = json.dumps(data, ensure_ascii=False)
    return Response(body, content_type='application/json; charset=utf-8')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
