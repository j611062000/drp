import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Chip } from '@mui/material';

const StudentAvailability = () => {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [activities, setActivities] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://127.0.0.1:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students data:', error));
  };

  const handleEdit = (id, currentActivities) => {
    setEditId(id);
    setActivities(currentActivities.map(activity => `${activity.date}: ${activity.type}`).join(', '));
  };

  const handleSave = () => {
    const updatedActivities = activities.split(', ').map(activity => {
      const [date, type] = activity.split(': ');
      return { date, type };
    });
    axios.put(`http://127.0.0.1:5000/api/students/${editId}/activities`, { activities: updatedActivities })
      .then(() => {
        fetchStudents();
        setEditId(null);
        setActivities('');
      })
      .catch(error => console.error('Error updating activities:', error));
  };

  const renderActivities = (activities) => (
    <Box>
      {activities.map((activity, index) => (
        <Chip key={index} label={`${activity.date}: ${activity.type}`} sx={{ margin: 0.5 }} />
      ))}
    </Box>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Student Activities</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Activities</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>
                  {editId === student.id ? (
                    <TextField
                      value={activities}
                      onChange={(e) => setActivities(e.target.value)}
                      fullWidth
                    />
                  ) : (
                    renderActivities(student.activities)
                  )}
                </TableCell>
                <TableCell>
                  {editId === student.id ? (
                    <Button onClick={handleSave}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEdit(student.id, student.activities)}>Edit</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentAvailability;
