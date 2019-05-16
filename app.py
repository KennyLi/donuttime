import os, urllib, json

from flask import Flask, request, render_template, \
     flash, session, url_for, redirect

from util import db

from passlib.hash import sha256_crypt


app = Flask(__name__)

app.secret_key = os.urandom(32)

#root route
@app.route("/")
def home():
    try:
        return render_template("draw.html", user=session["logged_in"])
    except:
        return render_template("draw.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/auth")
def authenticate():
    if db.auth_user(request.args["user"], request.args["password"]):
        session["logged_in"] = request.args["user"]
        return redirect(url_for("home"))
    else:
        flash("username or password is incorrect")
        return redirect(url_for("login"))

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/adduser")
def add_user():
    if(not request.args["user"].strip() or not request.args["password"] or not request.args["confirm_password"]):
        flash("Please fill in all fields")
        return redirect(url_for("register"))

    if(db.check_user(request.args["user"])):
        flash("User already exists")
        return redirect(url_for("register"))

    if(request.args["password"] != request.args["confirm_password"]):
        flash("Passwords don't match")
        return redirect(url_for("register"))

    db.add_user(request.args["user"], request.args["password"])
    session["logged_in"] = request.args["user"]
    return redirect(url_for("home"))

@app.route("/logout")
def logout():
    try:
        for key in session.keys():
            session.pop(key)
    finally:
        return redirect(url_for("home"))

@app.route("/test")
def test():
    return render_template("blob.html")

@app.route("/blob", methods = ["POST"])
def blob():
    db.add_drawing("Kenny", request.form["drawing_name"], request.files["file"].read())
    return "Successfully Downloaded"

if __name__ == "__main__":
    app.debug = True
    app.run()
