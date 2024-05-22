import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Chip } from '@mui/material';

const StaffAvailability = () => {
  const [staff, setStaff] = useState([]);
  const [editId, setEditId] = useState(null);
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    axios.get('http://127.0.0.1:5000/api/staff')
      .then(response => setStaff(response.data))
      .catch(error => console.error('Error fetching staff data:', error));
  };

  const handleEdit = (id, currentAvailability) => {
    setEditId(id);
    setAvailability(currentAvailability.join(', '));
  };

  const handleSave = () => {
    axios.put(`http://127.0.0.1:5000/api/staff/${editId}/availability`, { availability: availability.split(', ') })
      .then(() => {
        fetchStaff();
        setEditId(null);
        setAvailability('');
      })
      .catch(error => console.error('Error updating availability:', error));
  };

  const renderAvailability = (dates) => (
    <Box>
      {dates.map((date, index) => (
        <Chip key={index} label={date} sx={{ margin: 0.5 }} />
      ))}
    </Box>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Staff Availability</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  {editId === member.id ? (
                    <TextField
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      fullWidth
                    />
                  ) : (
                    renderAvailability(member.availability)
                  )}
                </TableCell>
                <TableCell>
                  {editId === member.id ? (
                    <Button onClick={handleSave}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEdit(member.id, member.availability)}>Edit</Button>
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

export default StaffAvailability;
