import pymongo, json
from flask_cors import CORS
from flask import Flask, request


app = Flask(__name__)
CORS(app)
conn_str = "mongodb+srv://TroNine:0207185859@gettingstarted.9uzod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

client = pymongo.MongoClient(conn_str)
collection = client['db_python']['collection']

def get_data():
    data_array = []
    for data in collection.find():
        data['_id'] = str(data['_id'])
        data_array.append( data )
    return data_array

def update_data(data):
    new_data = {
        "title" : data['title'],
        "cardText" : data['cardText']
    }
    try :
        result = collection.insert_one(new_data);
        return str(result.inserted_id)
    except : 
        return False


def delete_data(data):
    query = { "title" : data['title'] }
    try :
        result = collection.delete_many(query)
        return True if result.deleted_count > 0 else False
    except :
        return False

@app.route("/")
def hello_world():
    print(request)
    return "<p>Hello, World</p>"

@app.route("/get", methods=["GET"])
def get_api():
    data_array = get_data()
    data_json = {
        "data" : data_array
    } 
    return data_json

@app.route("/post/update", methods=["POST"])
def update_api() :
    data = request.json
    _id = update_data(data)
    result = "success" if _id else "fail"
    return {
        "status": result,
        "body": data,
        "_id" : _id 
    } 

@app.route("/post/delete", methods=["POST"])
def delete_api():
    data = request.json
    result = delete_data(data);
    result = "success" if result else "fail"
    return { "result" : result, "body" : data }


    