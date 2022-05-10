import json
from flask import Flask, request, jsonify
from flask.wrappers import Response
from flask_mongoengine import MongoEngine
from bson import json_util
from flask_cors import CORS
from mongoengine.errors import ValidationError
import requests


app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'mini_mobile',
    'host': 'localhost',
    'port': 27017
}
CORS(app)
db = MongoEngine(app)

def parse_json(data):
    return json.loads(json_util.dumps(data))

class Post(db.Document):
    make = db.StringField()
    model = db.StringField()
    year = db.IntField()
    description = db.StringField()
    url = db.URLField()
    email = db.EmailField()
    price = db.IntField()
    def to_json(self):
        return parse_json({
            "make": self.make,
            "model": self.model,
            "year": self.year,
            "email": self.email,
            "price": self.price,
            "description": self.description,
            "url": self.url,
            "id": str(self.id),
        })

@app.route('/posts/<post_id>', methods=['GET'])
def query_record(post_id):
    post = Post.objects(id=post_id).first()
    if not post:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify({"post": post.to_json()})

@app.route('/posts', methods=['GET'])
def query_records():
    posts = Post.objects()
    res = {"posts": [post.to_json() for post in posts]}
    return jsonify(res)

@app.route('/posts', methods=['PUT'])
def create_record():
    record = json.loads(request.data)
    post = Post(make=record['make'],
                email=record['email'],
                model=record['model'],
                description=record['description'],
                year=record['year'],
                url=record['url'],
                price=record['price'])
    try:
        post.validate()
    except ValidationError as err:
        raise err
    post.save()
    return jsonify(post.to_json())

@app.route('/image', methods=['GET'])
def request_image():
    url = request.args['url']
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
    r = requests.get(url, headers=headers)
    print(r.headers['content-type'])
    print(r.status_code)
    import pdb; pdb.set_trace()
    return Response(
        status=r.status_code,
        content_type=r.headers['content-type'])

@app.errorhandler(ValidationError)
def validation_error(e):
    fields = ', '.join(e.to_dict().keys())
    return jsonify({"error": "The following fields were not valid: {}".format(fields)}), 406

if __name__ == "__main__":
    app.run(debug=True)
