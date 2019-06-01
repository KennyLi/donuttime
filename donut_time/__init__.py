import os, urllib, json, base64, math

from flask import Flask, request, render_template, \
     flash, session, url_for, redirect

from util import db

app = Flask(__name__)

app.secret_key = os.urandom(32)

#root route
@app.route("/", methods = ["POST","GET"])
def home():
    try:
        return render_template("draw.html", user=session["logged_in"], data=request.form["drawing"], name=request.form["name"], background=request.form["background"])
    except:
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

@app.route("/blob", methods = ["POST","GET"])
def blob():
    db.add_drawing(session["logged_in"], request.form["drawing_name"], request.files["file"].read(), request.form["background"])
    return "Successfully Downloaded"

@app.route("/confirm", methods = ["POST","GET"])
def confirm():
    return db.check_drawing(session["logged_in"], request.form["drawing_name"])

@app.route("/delete", methods = ["POST", "GET"])
def delete():
    db.delete_drawing(session["logged_in"], request.form["delete"])
    return redirect(url_for("saved"))

@app.route("/saved")
def saved():
    try:
        # drawings = db.get_drawing(session["logged_in"])
        data = db.get_drawing(session["logged_in"])
        drawings = [(drawing[0], base64.b64encode(drawing[1]).decode('utf8'), drawing[2]) for drawing in data]
        grid = [drawings[i*4:i*4+4] for i in range(math.ceil(len(drawings) / 4))]
        return render_template("saved.html", imgs=grid, user=session["logged_in"])
    except:
        return render_template("saved.html", imgs=[], user=session["logged_in"])

if __name__ == "__main__":
    app.debug = True
    app.run()
