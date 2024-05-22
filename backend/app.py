from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data with availability and activities
staff = [
    {'id': 1, 'name': 'Alice', 'role': 'Instructor', 'availability': ['2023-05-22', '2023-05-23']},
    {'id': 2, 'name': 'Bob', 'role': 'Assistant', 'availability': ['2023-05-22']},
]

students = [
    {'id': 1, 'name': 'Charlie', 'level': 'Beginner', 'activities': [{'date': '2023-05-22', 'type': 'course'}]},
    {'id': 2, 'name': 'Dave', 'level': 'Intermediate', 'activities': [{'date': '2023-05-23', 'type': 'fun dive'}]},
]

@app.route('/api/staff', methods=['GET'])
def get_staff():
    return jsonify(staff)

@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify(students)

@app.route('/api/staff/<int:id>/availability', methods=['PUT'])
def update_staff_availability(id):
    data = request.json
    for member in staff:
        if member['id'] == id:
            member['availability'] = data['availability']
            return jsonify(member), 200
    return jsonify({'error': 'Staff member not found'}), 404

@app.route('/api/students/<int:id>/activities', methods=['PUT'])
def update_student_activities(id):
    data = request.json
    for student in students:
        if student['id'] == id:
            student['activities'] = data['activities']
            return jsonify(student), 200
    return jsonify({'error': 'Student not found'}), 404

@app.route('/api/resource-arrangement', methods=['POST'])
def resource_arrangement():
    data = request.json
    date = data['date']
    
    available_staff = [member for member in staff if date in member['availability']]
    scheduled_activities = [student for student in students if any(activity['date'] == date for activity in student['activities'])]

    allocation = {
        'date': date,
        'available_staff': available_staff,
        'scheduled_activities': scheduled_activities
    }
    
    return jsonify(allocation)

if __name__ == '__main__':
    app.run(debug=True)
