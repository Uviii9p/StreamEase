from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import re
from cachetools import cached, TTLCache

app = Flask(__name__)
CORS(app)

M3U_URL = "https://iptv-org.github.io/iptv/index.m3u"

# Cache results for 1 hour
cache = TTLCache(maxsize=1, ttl=3600)

def parse_m3u(content):
    channels = []
    lines = content.split('\n')
    current_channel = {}
    
    for line in lines:
        line = line.strip()
        if line.startswith('#EXTINF:'):
            # Parse EXTINF
            # Example: #EXTINF:-1 tvg-id="CNN.us" tvg-name="CNN" tvg-logo="https://..." group-title="News",CNN
            info = line.split(',', 1)
            params_part = info[0]
            name = info[1] if len(info) > 1 else "Unknown"
            
            current_channel = {
                "name": name,
                "logo": "",
                "group": "General",
                "id": ""
            }
            
            # Extract attributes using regex
            tvg_id = re.search(r'tvg-id="([^"]*)"', params_part)
            tvg_logo = re.search(r'tvg-logo="([^"]*)"', params_part)
            group_title = re.search(r'group-title="([^"]*)"', params_part)
            
            if tvg_id: current_channel["id"] = tvg_id.group(1)
            if tvg_logo: current_channel["logo"] = tvg_logo.group(1)
            if group_title: current_channel["group"] = group_title.group(1)
            
        elif line.startswith('http'):
            if current_channel:
                current_channel["url"] = line
                channels.append(current_channel)
                current_channel = {}
                
    return channels

@cached(cache)
def get_channels():
    try:
        response = requests.get(M3U_URL)
        response.raise_for_status()
        return parse_m3u(response.text)
    except Exception as e:
        print(f"Error fetching M3U: {e}")
        return []

@app.route('/api/channels', methods=['GET'])
def list_channels():
    print("GET /api/channels")
    channels = get_channels()
    category = request.args.get('category')
    search = request.args.get('search')
    
    filtered = channels
    if category:
        filtered = [c for c in filtered if c.get('group') == category]
    if search:
        search = search.lower()
        filtered = [c for c in filtered if search in c.get('name', '').lower() or search in c.get('group', '').lower()]
        
    print(f"Returning {len(filtered)} channels")
    return jsonify(filtered)

@app.route('/api/categories', methods=['GET'])
def list_categories():
    print("GET /api/categories")
    channels = get_channels()
    all_cats = set()
    for c in channels:
        group = c.get('group', 'General')
        # Split by semicolon and clean up
        for part in group.split(';'):
            clean_part = part.strip()
            if clean_part:
                all_cats.add(clean_part)
                
    categories = sorted(list(all_cats))
    print(f"Returning {len(categories)} atomic categories")
    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
