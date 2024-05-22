import React, { useState, createContext } from 'react';
import { ThemeProvider, CssBaseline, Box, Typography, IconButton } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import MetadataDisplay from './MetadataDisplay';
import Sidebar from './Sidebar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ResourceArrangement from './ResourceArrangement';
import StaffAvailability from './StaffAvailability';
import StudentAvailability from './StudentAvailability';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState('light');

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, backgroundColor: 'primary.main', color: 'white' }}>
            <Typography variant="h3">Scuba Diving Shop Resource Planning</Typography>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              <Routes>
                <Route path="/" element={<MetadataDisplay view="staff" />} />
                <Route path="/students" element={<MetadataDisplay view="students" />} />
                <Route path="/resource-arrangement" element={<ResourceArrangement />} />
                <Route path="/staff-availability" element={<StaffAvailability />} />
                <Route path="/student-availability" element={<StudentAvailability />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
