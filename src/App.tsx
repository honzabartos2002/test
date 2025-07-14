import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './Screens/Home';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import createAppTheme from './Themes/CreateAppTheme';
import Login from './Screens/Auth/Login';
import Register from './Screens/Auth/Register';
import MainScreen from './Shared/MainScreen';
import { useAuthorization } from './Hooks/useAuthorization';
import { AuthorizationProvider } from './Contexts/AuthorizationContext';
import NotFoundScreen from './Shared/NotFoundScreen';
import LanguagePicker from './Localization/LanguagePicker';

const AuthWrapper: React.FC = () => {
  const { isAuthenticated, isInitialized } = useAuthorization();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  const theme = createAppTheme();
  return (
    <AuthorizationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
        <Routes>
            <Route index element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/logged' element={<AuthWrapper />}>
              <Route element={<MainScreen />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<div>Profile Page</div>} />
                <Route path="settings" element={<Box><LanguagePicker /></Box>} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthorizationProvider>
  );
};

export default App;
