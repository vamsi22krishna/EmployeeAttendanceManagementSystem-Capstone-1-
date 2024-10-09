import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './passwordChange.css';

function PasswordChange() {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: location.state.email,
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be 20 characters or less'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:8080/api/userlogin/change-password', {
          email: values.email,
          newPassword: values.newPassword,
        });
        setSuccessMessage('Password changed successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Error changing password:', error.response ? error.response.data : error.message);
        setErrorMessage('Error changing password');
      }
    },
  });

  return (
    <Container className="password-change-container">
      <Paper className="password-change-paper">
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.email}
            disabled
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('newPassword')}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="password-change-button"
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default PasswordChange;
