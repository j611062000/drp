import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, IconButton, TextField, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const MetadataDisplay = ({ view }) => {
  const [staff, setStaff] = useState([]);
  const [students, setStudents] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchStaff();
    fetchStudents();
  }, []);

  const fetchStaff = () => {
    axios.get('http://127.0.0.1:5000/api/staff')
      .then(response => setStaff(response.data))
      .catch(error => console.error('Error fetching staff data:', error));
  };

  const fetchStudents = () => {
    axios.get('http://127.0.0.1:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students data:', error));
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditItem(null);
  };

  const handleChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const endpoint = view === 'staff' ? 'staff' : 'students';
    axios.put(`http://127.0.0.1:5000/api/${endpoint}/${editItem.id}`, editItem)
      .then(() => {
        setOpen(false);
        fetchStaff();
        fetchStudents();
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const renderTable = (items, columns) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column}>{item[column.toLowerCase()]}</TableCell>
              ))}
              <TableCell>
                <IconButton edge="end" onClick={() => handleEdit(item)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ padding: 2, flexGrow: 1 }}>
      {view === 'staff' && (
        <Box>
          <Typography variant="h4" gutterBottom>Staff Metadata</Typography>
          {renderTable(staff, ['Name', 'Role'])}
        </Box>
      )}

      {view === 'students' && (
        <Box>
          <Typography variant="h4" gutterBottom>Students Metadata</Typography>
          {renderTable(students, ['Name', 'Level'])}
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit {view.slice(0, -1)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the details of the {view.slice(0, -1)}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editItem?.name || ''}
            onChange={handleChange}
          />
          {view === 'staff' && (
            <TextField
              margin="dense"
              name="role"
              label="Role"
              type="text"
              fullWidth
              value={editItem?.role || ''}
              onChange={handleChange}
            />
          )}
          {view === 'students' && (
            <TextField
              margin="dense"
              name="level"
              label="Level"
              type="text"
              fullWidth
              value={editItem?.level || ''}
              onChange={handleChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MetadataDisplay;
