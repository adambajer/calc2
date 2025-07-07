# server.py - jednoduchá Flask proxy pro CORS
from flask import Flask, Response
import requests

app = Flask(__name__)

# Povolit CORS pro všechny
@app.after_request
def add_cors_headers(response: Response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/calendar')
def calendar_proxy():
    # Originální URL kalendáře
    target_url = (
        'https://obsazenost.e-chalupy.cz'
        '/kalendar.php?id=4013&jednotky=ano&legenda=ano'
    )
    try:
        # Přeposlat GET požadavek
        resp = requests.get(target_url, timeout=10)
        resp.raise_for_status()
    except requests.RequestException as e:
        return Response(f"Chyba při fetch kalendáře: {e}", status=502)

    # Vrátit přijaté HTML klientovi
    return Response(resp.text, content_type='text/html; charset=UTF-8')

if __name__ == '__main__':
    # Spustit server na portu 5000
    app.run(host='0.0.0.0', port=5001, debug=True)
