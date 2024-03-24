import jwt
import datetime
from flask import jsonify, request, current_app
from app import app, users_collection

def generate_token(emailId):
    try:
        # Expiration time for the token (for example, 24 hours)
        exp_time = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        # Generate the token
        token = jwt.encode({'emailId': emailId, 'exp': exp_time}, current_app.config['SECRET_KEY'], algorithm="HS256")
        print(current_app.config['SECRET_KEY'])
        return token
    except Exception as e:
        return e

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('emailId')
    password = data.get('password')

    print("here found")

    if users_collection.find_one({'emailId': username}):
        return jsonify({'error': 'Username already exists'}), 400

    new_user = {'emailId': username, 'password': password}
    users_collection.insert_one(new_user)

    token = generate_token(username)
    return jsonify({'message': 'User created successfully', 'token': token}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('emailId')
    password = data.get('password')

    user = users_collection.find_one({'emailId': username, 'password': password})
    if user:
        token = generate_token(username)
        return jsonify({'message': 'Login successful', 'token': token}), 200

    return jsonify({'error': 'Invalid emailId or password'}), 401
