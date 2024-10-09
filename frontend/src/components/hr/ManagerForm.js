import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

function ManagerForm({ fetchManagers }) {
  const [managerForm, setManagerForm] = useState({ firstName: '', lastName: '', address: '', salary: '', DOB: '' });

  const handleManagerFormChange = (e) => {
    setManagerForm({ ...managerForm, [e.target.name]: e.target.value });
  };

  const handleAddManager = async () => {
    try {
      const managerData = { ...managerForm, managerId: "N/A" };
      await axios.post('http://localhost:8080/api/userinfo', managerData);
      //fetchManagers(); // Refresh the list of managers
    } catch (error) {
      console.error('Error adding manager:', error);
    }
  };

  return (
    <Paper>
      <Typography variant="h6">Add Manager</Typography>
      <form noValidate autoComplete="off">
        <TextField label="First Name" name="firstName" value={managerForm.firstName} onChange={handleManagerFormChange} fullWidth margin="normal" />
        <TextField label="Last Name" name="lastName" value={managerForm.lastName} onChange={handleManagerFormChange} fullWidth margin="normal" />
        <TextField label="Address" name="address" value={managerForm.address} onChange={handleManagerFormChange} fullWidth margin="normal" />
        <TextField label="Salary" name="salary" value={managerForm.salary} onChange={handleManagerFormChange} fullWidth margin="normal" />
        <TextField label="Date of Birth" name="DOB" value={managerForm.DOB} onChange={handleManagerFormChange} fullWidth margin="normal" />
        <Button onClick={handleAddManager}>Add Manager</Button>
      </form>
    </Paper>
  );
}
export default ManagerForm;

