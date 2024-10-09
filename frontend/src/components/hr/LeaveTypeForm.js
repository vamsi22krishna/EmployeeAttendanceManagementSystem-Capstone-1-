import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LeaveTypeForm() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    const loginId = localStorage.getItem('loginId');

    if (loginId == null ||(role !== 'HR' && role !== 'Admin')) {
      navigate('/login');
    }
  }, [navigate, role]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      leaveType: '',
      maxLeaves: ''
    },
    validationSchema: Yup.object({
      leaveType: Yup.string().required('Required'),
      maxLeaves: Yup.number().required('Required').positive('Must be a positive number').integer('Must be an integer')
    }),
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/leavetypes/exists?leaveType=${values.leaveType}`);
        if (response.data) {
          await axios.put('http://localhost:8080/api/leavetypes', values);
          setSuccessMessage('Leave type updated successfully!');
        } else {
          await axios.post('http://localhost:8080/api/leavetypes', values);
          setSuccessMessage('Leave type added successfully!');
        }
        setOpenSnackbar(true);
        resetForm();
      } catch (error) {
        console.error('Error adding or updating leave type:', error);
      }
    }
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper style={{ padding: '2rem', maxWidth: '400px', width: '100%', position: 'relative' }}>
      
        {successMessage && (
          <Alert severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>
        )}
        <Typography variant="h6">Add or Update Leave Type</Typography>
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <FormControl fullWidth margin="normal">
            <InputLabel>Leave Type</InputLabel>
            <Select
              name="leaveType"
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              error={formik.touched.leaveType && Boolean(formik.errors.leaveType)}
            >
              <MenuItem value="Sick Leave">Sick Leave</MenuItem>
              <MenuItem value="Casual Leave">Casual Leave</MenuItem>
              <MenuItem value="Earned Leave">Earned Leave</MenuItem>
            </Select>
            {formik.touched.leaveType && formik.errors.leaveType && (
              <Typography color="error" variant="body2">{formik.errors.leaveType}</Typography>
            )}
          </FormControl>
          <TextField
            label="Max Leaves"
            name="maxLeaves"
            type="number"
            value={formik.values.maxLeaves}
            onChange={formik.handleChange}
            error={formik.touched.maxLeaves && Boolean(formik.errors.maxLeaves)}
            helperText={formik.touched.maxLeaves && formik.errors.maxLeaves}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Add or Update Leave Type</Button>
        </form>
      </Paper>
    </div>
  );
}

export default LeaveTypeForm;
