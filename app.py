import os, urllib, json

from flask import Flask, request, render_template, \
     flash, session, url_for, redirect

app = Flask(__name__)

app.secret_key = os.urandom(32)

#root route
@app.route("/")
def home():
    return render_template("draw.html")





if __name__ == "__main__":
    app.debug = True
    app.run()
