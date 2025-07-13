import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Screens/Login';
import Home from './Screens/Home';
import { ThemeProvider } from '@mui/material';
import createAppTheme from './Themes/CreateAppTheme';

const App: React.FC = () => {
    const theme = createAppTheme();
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
