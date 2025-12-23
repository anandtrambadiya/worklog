from flask import Flask
# from flask_cors import CORS
from models import db
# from routes import register_blueprints


app = Flask(__name__)
# CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///worklog.sqlite3'
app.config['SECRET_KEY'] = 'Ati03G6psY'

db.init_app(app)
app.app_context().push()

if __name__ == '__main__':
    app.run(debug=True)