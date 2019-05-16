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
    #if username in session:
        #enable save
    return render_template("draw.html")

@app.route("/login")
def login():
    return render_template("auth.html")

@app.route("/logout")
def logout():
    '''
    Logs user out of session by popping them from the session. Returns user to log-in screen
    '''
    if 'username' in session:
        session.pop('username')
        return redirect(url_for('authPage'))
    else:
        return redirect(url_for('home'))

@app.route("/auth",methods=['GET','POST'])
def authPage():
    '''
    Authenticates user signing in. Checks to see if password is correct or not;
    if correct, logs user in. If not, flashes "incorrect credentials"
    '''
    if 'username' in session:
        username = session['username']
        return redirect(url_for('home'))
    else:
        try:
            username=request.form['username'] #username
            password = search.password(username) #password that matches the username
            if password == None: #if credentials are incorrect
                flash('Wrong Username or Password!')
                return redirect(url_for('login')) #redirects
            elif sha256_crypt.verify(request.form['password'], password[0]): #if password is correct, login
                session['username'] = username
                return redirect(url_for('authPage'))
            else: #else credentials are wrong
                flash('Wrong Username or Password!')
                return redirect(url_for('login'))
        except:
            return redirect(url_for('login'))

@app.route("/reg",methods=['GET','POST'])
def register():
    '''
    Loads the template that takes information and allows user to register,
    creating a new account that they can sign into session with
    '''
    if 'username' in session:
        return redirect(url_for('authPage'))
    return render_template('reg.html')

@app.route("/added",methods=['GET','POST'])
def added():
    '''
    Checks to see if username is unique,
    flashes "username taken" if it is,
    adds user and password to database if not and sends to home
    '''
    try:
        if request.form['password'] == request.form['confirmpassword']:
            newUsername = request.form['username']
            newPassword = sha256_crypt.encrypt(request.form['password']) #encrypts password
            userList = search.username(newUsername)
            if userList == [] : #if username isn't taken
                #add to database
                return redirect(url_for('home'))
            else: #if username is taken
                flash('Username Taken')
                return redirect(url_for('reg'))
        else:
            flash("Passwords don't match")
            return redirect(url_for('reg'))
    except:
        return redirect(url_for('home'))

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
