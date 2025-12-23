from flask import Blueprint, request, jsonify, session
from models import db, Employee
from functools import wraps

auth_bp = Blueprint('auth', __name__)



def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"msg": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check for admin email (hardcoded for simplicity)
        if "user_id" not in session or session.get("user_name") != "Admin":
            return jsonify({"msg": "Forbidden"}), 403
        return f(*args, **kwargs)
    return decorated_function

# Register
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if Employee.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already registered"}), 400

    user = Employee(name=data['name'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Employee registered successfully"}), 201

# Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Employee.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({"msg": "Invalid credentials"}), 401

    session['user_id'] = user.id
    session['user_name'] = user.name
    
    user_type = "admin" if user.email == "anandtrambadiya036@gmail.com" else "employee"
    return jsonify({
        "msg": "Logged in successfully",
        "name": user.name,
        "user_id": user.id,
        "user_type": user_type
    }), 200

# Logout
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"msg": "Logged out successfully"}), 200
