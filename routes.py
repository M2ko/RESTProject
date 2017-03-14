
from flask import Flask, render_template
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
import json
from bson import BSON
from bson import json_util
from functools import wraps
from flask import request, abort

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'BarDB'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/BarDB'

mongo = PyMongo(app)

# The actual decorator function
def require_appkey(view_function):
    @wraps(view_function)
    # the new, post-decoration function. Note *args and **kwargs here.
    def decorated_function(*args, **kwargs):
        hashs = ["2ad72c", "5ec987", "78721e", "adc21b", "12562", "aef21b"]
        if request.args.get('key') and request.args.get('key') in hashs:
            return view_function(*args, **kwargs)
        else:
            abort(401)
    return decorated_function

@app.route('/developer')
def developer():
    return render_template('developer.html')
        
@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/v2/bar/<name>/prizes', methods=['GET'])
@require_appkey
def get_prices(name):
    bars = mongo.db.bars
    s = bars.find_one_or_404({'name' : name})
    if s:
      output = s['prizes']
    return json.dumps(output, sort_keys=True, indent=4, default=json_util.default)

  
@app.route('/v2/bars', methods=['GET'])
@require_appkey
def get_all_bars():
  bars = mongo.db.bars
  output = []
  for s in bars.find():
    output.append(s)
  return json.dumps(output, sort_keys=True, indent=4, default=json_util.default)


@app.route('/v2/bar/<name>', methods=['GET', 'DELETE', 'POST'])
@require_appkey
def bar_request(name):
    if request.method == 'GET':
        return get_one_bar(name)
    elif request.method == 'DELETE':
        return delete_bar(name)
    elif request.method == 'POST':
        return update_one(name)
        
        
def get_one_bar(name):
  bars = mongo.db.bars
  s = bars.find_one_or_404({'name' : name})
  if s:
    output = s
  else:
    output = "No such name"
  return json.dumps(output, sort_keys=True, indent=4, default=json_util.default)

@app.route('/v2/bar/setnew', methods=['POST'])
@require_appkey
def add_bar():
  bar = mongo.db.bars
  name = request.form['name']
  lon = request.form['lon']
  lat = request.form['lat']
  beerprize = request.form['beerprize']
  jagermaister = request.form['jagermaister']
  openhours = request.form['openhours']
  bar_id = bar.insert_one({"name" : name, "lon":lon, "lat":lat, "prizes":{"beerprize":beerprize, "jagermaister":jagermaister}, "openhours":openhours})
  new_bar = bar.find_one({'name': name })
  return json.dumps(new_bar, sort_keys=True, indent=4, default=json_util.default)


@app.route('/v2/bar/count', methods=['GET'])
@require_appkey
def get_count():
    bar = mongo.db.bars
    return str(bar.count())


###@app.route('/v2/bar/update', methods=['POST'])
def update_one(name):
    bars = mongo.db.bars
    key = request.form['key']
    val = request.form['val']
    bar_id = bars.update_one({'name':name}, {"$set": {key:val}}, upsert=False)
    new_bar = bars.find_one({'name' : name})
    if(new_bar[key]==val):
        return "success"
    else:
        return "false"
       
##@app.route('/v2/bar/delete/<name>', methods=['DELETE'])
def delete_bar(name):
    bars = mongo.db.bars
    bars.delete_one({"name":name})
    if("No such" not in get_one_bar(name)):
        abort(410)
    else:
        abort(404)

if __name__ == '__main__':
    app.run(debug=True)
