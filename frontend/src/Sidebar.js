import React from 'react';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box className="sidebar" sx={{ padding: 2, width: 200 }}>
      <Button component={Link} to="/" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
        Staff
      </Button>
      <Button component={Link} to="/students" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
        Students
      </Button>
      <Button component={Link} to="/resource-arrangement" variant="contained" color="secondary" fullWidth sx={{ marginBottom: 2 }}>
        Resource Arrangement
      </Button>
      <Button component={Link} to="/staff-availability" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
        Staff Availability
      </Button>
      <Button component={Link} to="/student-availability" variant="contained" color="primary" fullWidth>
        Student Availability
      </Button>
    </Box>
  );
};

export default Sidebar;
