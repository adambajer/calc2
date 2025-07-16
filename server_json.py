# server_json.py
from flask import Flask, Response
import os

app = Flask(__name__)

# Povolit CORS pro všechny
@app.after_request
def add_cors_headers(response: Response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

JSON_PATH = os.path.join(os.path.dirname(__file__), './kalendar.json')

import codecs

@app.route('/calendar')
def calendar():
    try:
        # Read raw bytes
        with open(JSON_PATH, 'rb') as f:
            raw = f.read()
        # If it starts with a UTF‑16 LE or BE BOM, decode as utf‑16
        if raw.startswith(codecs.BOM_UTF16_LE) or raw.startswith(codecs.BOM_UTF16_BE):
            content = raw.decode('utf-16')
        else:
            # Otherwise try UTF-8‑SIG (strips UTF‑8 BOM if present)
            content = raw.decode('utf-8-sig')
    except Exception as e:
        return Response(f"Chyba při načítání JSON: {e}", status=500)

    return Response(content, mimetype='application/json')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
