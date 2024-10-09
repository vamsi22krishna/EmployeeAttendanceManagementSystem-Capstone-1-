
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Checkbox, Alert, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import authService from '../../services/AuthService'; 
import './Login.css';

function Login({ setUserRole }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const formik = useFormik({
    initialValues: {
      userEmail: '',
      password: '',
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .email('Invalid email address')
        .required('Required')
        .min(5, 'Email must be at least 5 characters')
        .max(50, 'Email must be 50 characters or less'),
      password: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be 20 characters or less'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await authService.login(values.userEmail, values.password);

        console.log('Login successful:', response.data);
        const { loginId, roles } = response.data;
        localStorage.setItem('loginId', loginId);
        localStorage.setItem('role', roles);
        localStorage.setItem('userEmail', values.userEmail); // Store email in local storage

        // Fetch and store manager's userId
        const userIdResponse = await axios.get(`http://localhost:8080/api/manager/user-id/${loginId}`);
        const managerId = userIdResponse.data;
        localStorage.setItem('managerId', managerId);

        if (roles.includes('Admin')) {
          setUserRole('Admin');
          navigate('/userprofile'); // Redirect to admin dashboard
        } else if ( roles.includes('HR')) {
          setUserRole('HR');
          navigate('/userprofile'); // Redirect to HR dashboard
        } else if (roles.includes('Manager')) {
          setUserRole('Manager');
          navigate('/userprofile'); // Redirect to manager dashboard
        } else {
          setUserRole('Employee');
          navigate('/userprofile'); // Redirect to employee dashboard
        }
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        setErrorMessage('Invalid username or password');
      }
    },
  });
  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
    setForgotPasswordEmail('');
    setForgotPasswordError('');
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/userlogin/exists/${forgotPasswordEmail}`);
      if (response.data) {
        navigate('/password-change', { state: { email: forgotPasswordEmail } });
      } else {
        setForgotPasswordError('Email does not exist');
      }
    } catch (error) {
      console.error('Error checking email:', error.response ? error.response.data : error.message);
      setForgotPasswordError('Error checking email');
    }
  };
  return (
    <Container className="login-container">
      <Paper className="login-paper">
        <Typography variant="h4" gutterBottom>
        <h2 style={{color:'#134B70', fontWeight: 'bold'}}> AttendSmart Login </h2>
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('userEmail')}
            error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
            helperText={formik.touched.userEmail && formik.errors.userEmail}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                color="primary"
              />
            }
            label="Show Password"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="login-button"
          >
            Login
          </Button>
        </form>
        <Button color="primary" onClick={handleForgotPasswordOpen}>
          Forgot Password?
        </Button>
      </Paper>
      <div className="login-image">
        <img src="./images/login.jpeg" alt="Attendance Management System" />
      </div>
      <Dialog open={forgotPasswordOpen} onClose={handleForgotPasswordClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address. We will check if it exists in our system.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />
          {forgotPasswordError && <Alert severity="error">{forgotPasswordError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotPasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleForgotPasswordSubmit} color="primary">
            Check Email
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Login;
