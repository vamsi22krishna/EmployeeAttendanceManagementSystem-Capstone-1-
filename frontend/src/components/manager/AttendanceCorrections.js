import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ManagerCorrectionRequests() {
  const [corrections, setCorrections] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedCorrection, setSelectedCorrection] = useState(null);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const roles = localStorage.getItem('role');
    if (loginId == null || roles !== 'Manager') {
      navigate('/login');
    }
    fetchCorrections();
    fetchHistory();
  }, []);

  const fetchCorrections = async () => {
    const managerId = localStorage.getItem('managerId');
    try {
      const response = await axios.get(`http://localhost:8080/api/attendancecorrections/manager/${managerId}`);
      setCorrections(response.data);
    } catch (error) {
      console.error('Error fetching corrections:', error);
    }
  };

  const fetchHistory = async () => {
    const managerId = localStorage.getItem('managerId');
    try {
      const response = await axios.get(`http://localhost:8080/api/attendancecorrections/manager/history/${managerId}`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleSelectCorrection = (correction) => {
    setSelectedCorrection(correction);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCorrection(null);
  };

  const handleStatusUpdate = async (status) => {
    try {
      await axios.post(`http://localhost:8080/api/attendancecorrections/updatestatus/${selectedCorrection.correctionId}`, null, {
        params: { status }
      });
      alert('Status updated successfully');
      handleClose();
      // Update the state to move the request from pending to history
      setCorrections(corrections.filter(c => c.correctionId !== selectedCorrection.correctionId));
      setHistory([...history, { ...selectedCorrection, status }]);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <Paper className="manager-paper">
        <Typography variant="h4">Attendance Requests</Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab label="Pending Requests" />
          <Tab label="Request History" />
        </Tabs>
        <Box hidden={tabIndex !== 0}>
          <List>
            {corrections.map(correction => (
              <ListItem button onClick={() => handleSelectCorrection(correction)} key={correction.correctionId}>
                <ListItemText primary={`Correction ID: ${correction.correctionId}`} secondary={`Reason: ${correction.correctionReason}`} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box hidden={tabIndex !== 1}>
          <List>
            {history.map(correction => (
              <ListItem key={correction.correctionId}>
                <ListItemText primary={`Correction ID: ${correction.correctionId}`} secondary={`Reason: ${correction.correctionReason} - Status: ${correction.status}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Correction Status</DialogTitle>
        <DialogContent>
          <Typography>Reason: {selectedCorrection?.correctionReason}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={() => handleStatusUpdate('Approved')} color="primary" disabled={selectedCorrection?.status === 'Approved'}>Approve</Button>
          <Button onClick={() => handleStatusUpdate('Rejected')} color="secondary" disabled={selectedCorrection?.status === 'Approved'}>Reject</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManagerCorrectionRequests;
