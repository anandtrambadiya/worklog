from flask import Blueprint, request, jsonify
from models import db, Employee

employees_bp = Blueprint(
    "employees",
    __name__,
    url_prefix="/employees"
)

# POST /employees → add employee
@employees_bp.route("", methods=["POST"])
def add_employee():
    data = request.get_json()

    if not data.get("name") or not data.get("email"):
        return jsonify({"msg": "Name and email required"}), 400

    if Employee.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email already exists"}), 400

    emp = Employee(name=data["name"], email=data["email"])
    db.session.add(emp)
    db.session.commit()

    return jsonify({
        "msg": "Employee added",
        "employee": {"id": emp.id, "name": emp.name, "email": emp.email}
    }), 201


# GET /employees → list employees
@employees_bp.route("", methods=["GET"])
def list_employees():
    employees = Employee.query.all()
    return jsonify([
        {"id": e.id, "name": e.name, "email": e.email}
        for e in employees
    ])
