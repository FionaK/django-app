from flask import Flask, request
from flask_restful import Api, Resource
import datetime
from App.models import *
import jwt
import base64
import re
from App.__init__ import *

api = Api(app)

class Register(Resource):
    def post(self):
        name=request.get_json()['name'].strip()
        email=request.get_json()['email'].strip()
        password=request.get_json()['password'].strip()
        confirm_pwd=request.get_json()['confirm_pwd'].strip()
        rolename=request.get_json()['rolename'].strip()

        if len(name)==0:
            return {'message':'Name is too short'}
        if len(password) < 8:
            return {'message':'password must be 8 characters or more'}
        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            return {"message":"password should contain atleast a capital letter and a number"}
        if password != confirm_pwd:
            return {'message':'Password do not match!'}
        if not email:
            return {'message':'You must provide an email address'}
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            return {'message':'Invalid email address!'}
        check_email(email)
        if cur.fetchone() is not None:
            return {'message':'Email address already exist!'}
        else:
            register_user(name, email, base64.b64encode(bytes(password, 'utf-8')), rolename)
        conn.commit()
        return {'message':'Registration successful'}

class Login(Resource):
    def post(self):
        email=request.get_json()['email'].strip()
        password=request.get_json()['password'].strip()
        
        if not email:
            return {'message':'Enter an email address!'}
        check_email(email)
        result = cur.fetchone()
        if result is not None:
            if password == result[3]:
                token=jwt.encode({'email':email,'userid':result[0],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},app.config['SECRET_KEY'])
                return {'message':'succesfuly logged in','token':token.decode ('UTF-8')}, 200
            else:
                return {'message':'wrong password'}
        else:
            return {'message':'Invalid email address'}
        conn.commit()

api.add_resource(Register, '/api/register/') 
api.add_resource(Login, '/api/login/')