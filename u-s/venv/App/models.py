import psycopg2
from App.user.views import *
from App.__init__ import *


conn = psycopg2.connect("dbname='usersdb' user = 'postgres' password = 'fifi' host = 'localhost' port = '5432'")

cur= conn.cursor()

def create_table():
    conn = psycopg2.connect("dbname='usersdb' user = 'postgres' password = 'fifi' host = 'localhost' port = '5432'")
    with conn.cursor() as cursor:
            cur.execute("CREATE TABLE IF NOT EXISTS details (userid serial PRIMARY KEY,\
            name VARCHAR(250) NOT NULL,email VARCHAR(150) NOT NULL, rolename VARCHAR(250) NOT NULL\
            password VARCHAR(100) NOT NULL, time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")

            #cur.execute("CREATE TABLE IF NOT EXISTS roles (userid serial PRIMARY KEY,\
            #rolename VARCHAR(250) NOT NULL)" )
    
def register_user(name, email, password, rolename):
        cur.execute("INSERT INTO details (name,email,password,rolename)VALUES(%s, %s, %s, %s);",\
        (name, email, password, rolename))
#def assign_role(rolename):
        #cur.execute("INSERT INTO roles (rolename) VALUES(%s);",(rolename))
def check_email(email):
        cur.execute("SELECT * FROM details WHERE email = '"+email+"'")
