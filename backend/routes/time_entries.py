from flask import Blueprint, request, jsonify
from models import db, TimeEntry

time_entries_bp = Blueprint(
    "time_entries",
    __name__,
    url_prefix="/time-entries"
)

# POST /time-entries → log daily hours
@time_entries_bp.route("", methods=["POST"])
def add_time_entry():
    data = request.get_json()

    if data["hours_worked"] > 24:
        return jsonify({"msg": "Hours cannot exceed 24"}), 400

    # prevent duplicate entry for same day
    existing = TimeEntry.query.filter_by(
        employee_id=data["employee_id"],
        date=data["date"]
    ).first()

    if existing:
        return jsonify({"msg": "Entry already exists for this date"}), 400

    entry = TimeEntry(
        employee_id=data["employee_id"],
        date=data["date"],
        hours_worked=data["hours_worked"],
        description=data.get("description", "")
    )

    db.session.add(entry)
    db.session.commit()

    return jsonify({"msg": "Time entry added"}), 201


# GET /time-entries → fetch logs
@time_entries_bp.route("", methods=["GET"])
def get_time_entries():
    employee_id = request.args.get("employeeId")
    date = request.args.get("date")

    query = TimeEntry.query.filter_by(employee_id=employee_id)
    if date:
        query = query.filter_by(date=date)

    entries = query.all()

    return jsonify([
        {
            "id": e.id,
            "date": e.date,
            "hours_worked": e.hours_worked,
            "description": e.description
        }
        for e in entries
    ])


# GET /summary/:employeeId → total hours
@time_entries_bp.route("/summary/<int:employee_id>", methods=["GET"])
def summary(employee_id):
    entries = TimeEntry.query.filter_by(employee_id=employee_id).all()
    total_hours = sum(e.hours_worked for e in entries)

    return jsonify({
        "employee_id": employee_id,
        "total_hours": total_hours
    })
