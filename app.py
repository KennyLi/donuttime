import os, urllib, json

from flask import Flask, request, render_template, \
     flash, session, url_for, redirect

from util import db

app = Flask(__name__)

app.secret_key = os.urandom(32)

#root route
@app.route("/")
def home():
    return render_template("draw.html")


@app.route("/test")
def test():
    return render_template("blob.html")

@app.route("/blob", methods =["POST"])
def blob():
    print("hi")
    # print(request.headers)
    # print(request.files)
    print (request.files["file"])
    print(request.form)
    # db.add_drawing("Kenny", "blob", request.files["file"])
    return "hi"
