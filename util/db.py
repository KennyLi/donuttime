import sqlite3

#change later when connected with app.py
DB_FILE="./data/drawing.db"

def createTable():
    """Create all data tables."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    command = "CREATE TABLE users (username TEXT, password TEXT)"
    c.execute(command)

    command = "CREATE TABLE drawing (username TEXT, drawing_name TEXT, drawing BLOB)"
    c.execute(command)

    db.commit()
    db.close()

def add_user(username, password):
    """Insert credentials for newly registered user into database."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("INSERT INTO users VALUES(?, ?)", (username, password))
    db.commit()
    db.close()

def add_drawing(username, drawing_name, drawing):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("INSERT INTO drawing VALUES(?, ?, ?)", (username, drawing_name, drawing))
    db.commit()
    db.close()

