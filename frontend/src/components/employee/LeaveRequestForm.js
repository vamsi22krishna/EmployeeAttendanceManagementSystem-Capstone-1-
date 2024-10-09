import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Tabs, Tab, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LeaveRequestForm() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState({
    leaveTypeId: '',
    startDate: '',
    startSession: '',
    endDate: '',
    endSession: '',
    reason: '',
  });
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate=useNavigate();
  useEffect(() => {
   
  const loginId = localStorage.getItem('loginId');
  const roles = localStorage.getItem('role');
  if(loginId==null || roles!='Employee' ){
    navigate('/login');
  }
    fetchLeaveTypes();
    fetchLeaveHistory();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/leavetypes');
      setLeaveTypes(response.data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

  const fetchLeaveBalance = async (leaveTypeId) => {
    const loginId = localStorage.getItem('loginId');
    try {
      const response = await axios.get(`http://localhost:8080/api/leavebalances/${loginId}/${leaveTypeId}`);
      setLeaveBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching leave balance:', error);
    }
  };

  const fetchLeaveHistory = async () => {
    const loginId = localStorage.getItem('loginId');
    try {
      const response = await axios.get(`http://localhost:8080/api/leave-requests/user/${loginId}`);
      setLeaveHistory(response.data);
    } catch (error) {
      console.error('Error fetching leave history:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest({ ...leaveRequest, [name]: value });
    if (name === 'leaveTypeId') {
      fetchLeaveBalance(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginId = localStorage.getItem('loginId');
    try {
      await axios.post('http://localhost:8080/api/leave-requests/submit', leaveRequest, {
        params: { loginId }
      });
      alert('Leave request submitted successfully');
      fetchLeaveHistory(); // Refresh leave history after submission
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredLeaveHistory = leaveHistory.filter(request => 
    filterStatus === 'All' || request.status === filterStatus
  );

  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4">Leave Management</Typography>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="leave management tabs">
          <Tab label="Apply" />
       
          <Tab label="History" />
        
        </Tabs>
        <Box hidden={tabValue !== 0}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Leave Type</InputLabel>
                  <Select name="leaveTypeId" value={leaveRequest.leaveTypeId} onChange={handleChange} required>
                    {leaveTypes.map((type) => (
                      <MenuItem key={type.leaveTypeId} value={type.leaveTypeId}>
                        {type.leaveType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" style={{ marginTop: '16px' }}>Leave Balance: {leaveBalance}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={leaveRequest.startDate}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Start Session</InputLabel>
                  <Select name="startSession" value={leaveRequest.startSession} onChange={handleChange} required>
                    <MenuItem value="First Half">First Half</MenuItem>
                    <MenuItem value="Second Half">Second Half</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={leaveRequest.endDate}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>End Session</InputLabel>
                  <Select name="endSession" value={leaveRequest.endSession} onChange={handleChange} required>
                    <MenuItem value="First Half">First Half</MenuItem>
                    <MenuItem value="Second Half">Second Half</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Reason"
                  name="reason"
                  value={leaveRequest.reason}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
       
        <Box hidden={tabValue !== 1}>
          <Typography variant="h6">Leave History</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={handleFilterChange}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeaveHistory.map(request => (
                  <TableRow key={request.leaveId}>
                    <TableCell>{request.leaveTypeName}</TableCell>
                    <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      
      </Paper>
    </Container>
  );
}

export default LeaveRequestForm;
