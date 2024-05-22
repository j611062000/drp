import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ResourceArrangement = () => {
  const [date, setDate] = useState('');
  const [allocation, setAllocation] = useState(null);

  const handleGenerate = () => {
    axios.post('http://127.0.0.1:5000/api/resource-arrangement', { date })
      .then(response => setAllocation(response.data))
      .catch(error => console.error('Error generating resource arrangement:', error));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Resource Arrangement</Typography>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleGenerate}>
        Generate
      </Button>

      {allocation && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5">Allocation for {allocation.date}</Typography>
          
          <Typography variant="h6" sx={{ marginTop: 2 }}>Available Staff</Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocation.available_staff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6">Scheduled Activities</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Activity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocation.scheduled_activities.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>{student.activities.find(activity => activity.date === allocation.date).type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default ResourceArrangement;
