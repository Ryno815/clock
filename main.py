from flask import Flask, request, redirect,session
from replit import db
import os

app = Flask(__name__)
app.secret_key = os.environ['sessionKey']


@app.route('/')
def index():
  f=open("home.html","r")
  page=f.read()
  f.close()
  return page

  
@app.route("/nope")
def nope():
  f=open ("nope.html","r")
  page=f.read()
  f.close()
  return page


@app.route("/login")
def login():
  f=open("login.html","r")
  page=f.read()
  f.close()
  return page

@app.route("/reset")
def reset():
  session.clear()
  return redirect("/")


@app.route("/account", methods=["POST"])
def process():
  form = request.form
  session["usersession"] = db[form['email']]['username']
  try:
    if form["email"] in db:
      if form["password"]==db[form["email"]]["password"]:
        return redirect ("/home")
      else:
        return redirect("/nope")
    else:
      return redirect("/nope")
  except:
    return redirect ("/nope")
   

@app.route("/home")
def home():
  name=""
  page=""
  if session.get("usersession"):
    name=session['usersession']
  if name=="":
    return redirect ('/nope')
  page+=f"<h1>{name}</h1>"
  page+='''<button type="button" onclick="location.href='/reset'">Log out</button>'''
  return page

@app.route("/signup")
def signup():
  f=open("signup.html","r")
  page=f.read()
  f.close()
  return page

@app.route("/signing", methods=["POST"])
def signform():
  signform=request.form
  db[signform["email"]]= {'username':signform["username"],"password":signform["password"]}

  return redirect ('/login')

app.run(host='0.0.0.0', port=81)

