import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './admin.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const roles = localStorage.getItem('role');
    if (loginId == null || roles !== 'Admin') {
      navigate('/login');
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      salary: '',
      dob: '',
      userEmail: '',
      password: '',
      role: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required').min(3, 'First name must be at least 3 characters').max(30, 'First Name must be 30 characters or less'),
      lastName: Yup.string().required('Required').min(1, 'Last name must be at least 1 characters').max(30, 'Last Name must be 30 characters or less'),
      address: Yup.string().required('Required').min(5, 'Address must be at least 5 characters').max(100, 'Address must be 100 characters or less'),
      salary: Yup.number().required('Required').min(0, 'Salary must be a positive number'),
      dob: Yup.date().required('Required'),
      userEmail: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters').max(20, 'Password must be 20 characters or less'),
      role: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        // Check if email already exists
        const emailExistsResponse = await axios.get(`http://localhost:8080/api/userlogin/exists/${values.userEmail}`);
        if (emailExistsResponse.data) {
          setEmailError('Email already exists. Please try with a different email.');
          return;
        }

        // Add UserInfo
        const userInfoResponse = await axios.post('http://localhost:8080/api/userinfo/add-hr', {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          salary: values.salary,
          dob: values.dob,
          managerId: 'UI1000' // Static value for managerId
        });

        const userId = userInfoResponse.data.userId;

        // Add UserLogin for the primary role
        const userLoginResponse = await axios.post('http://localhost:8080/api/userlogin', {
          userId: userId,
          userEmail: values.userEmail,
          password: values.password
        });

        const loginId = userLoginResponse.data.loginId;

        // Add UserRole for the primary role
        await axios.post('http://localhost:8080/api/user-roles/add', {
          loginId: loginId,
          role: values.role
        });

        // If the role is Manager or HR, also create an Employee role
        if (values.role === 'Manager' || values.role === 'HR') {
          const employeeEmail = `${values.firstName.toLowerCase()}.${values.lastName.toLowerCase()}@xylems.com`;

          // Add UserLogin for the Employee role
          const employeeLoginResponse = await axios.post('http://localhost:8080/api/userlogin', {
            userId: userId,
            userEmail: employeeEmail,
            password: values.password
          });

          const employeeLoginId = employeeLoginResponse.data.loginId;

          // Add UserRole for the Employee role
          await axios.post('http://localhost:8080/api/user-roles/add', {
            loginId: employeeLoginId,
            role: 'Employee'
          });
        }

        // Clear the form and error message
        formik.resetForm();
        setEmailError('');
        setSuccessMessage('Employee created successfully!');

        console.log('All data added successfully');
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  });

  return (
    <Container >
      <Paper className="admin-dashboard-paper">
        <Typography variant="h4" gutterBottom>Add User</Typography>
        {successMessage && (
          <Alert severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>
        )}
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <TextField
            label="First Name"
            {...formik.getFieldProps('firstName')}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            {...formik.getFieldProps('address')}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary"
            {...formik.getFieldProps('salary')}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            type="date"
            {...formik.getFieldProps('dob')}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Email"
            {...formik.getFieldProps('userEmail')}
            error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
            helperText={formik.touched.userEmail && formik.errors.userEmail}
            fullWidth
            margin="normal"
          />
          {emailError && (
            <Typography color="error" variant="body2">{emailError}</Typography>
          )}
          <TextField
            label="Password"
            type="password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              {...formik.getFieldProps('role')}
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
            {formik.touched.role && formik.errors.role && (
              <Typography color="error" variant="body2">{formik.errors.role}</Typography>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth className="admin-dashboard-button">Add User</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminDashboard;
