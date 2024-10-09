import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const [profile, setProfile] = useState({});
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInOutCount, setCheckInOutCount] = useState(0);
  const navigate=useNavigate();
  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const userEmail = localStorage.getItem('userEmail');
    
    const roles = localStorage.getItem('role');
    if(loginId==null || roles!='Employee' ){
      navigate('/login');
    }
    console.log(userEmail);
    fetchLeaveRequests(loginId);
     fetchProfile(loginId);
    fetchAttendanceRecords(loginId);
  }, []);

  const fetchProfile = (loginId) => {
    axios.get(`http://localhost:8080/api/userinfo/profile/${loginId}`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => console.error('Error fetching profile:', error));
  };

  const fetchAttendanceRecords = (loginId) => {
    console.log(loginId);
    axios.get(`http://localhost:8080/api/attendance/records/${loginId}`)
      .then(response => {
        const records = response.data;
          // Check if all statuses are "A"
      const allStatusesA = records.every(record => record.status === "A");

      // If all statuses are "A", assign only the last record
      if (allStatusesA && records.length > 0) {
        setAttendanceRecords([records[records.length - 1]]);
      } else {
        // Otherwise, assign the whole record list
        setAttendanceRecords(records);
      }
        // Determine the current state based on the latest record
        if (records.length > 0) {
          const latestRecord = records[records.length - 1];
          setIsCheckedIn(!latestRecord.checkOut);
          setCheckInTime(latestRecord.checkIn);
          setCheckOutTime(latestRecord.checkOut);
        // Count the number of check-ins and check-outs for the current day
        const today = new Date().toLocaleDateString();
        const todayRecords = records.filter(record => new Date(record.date).toLocaleDateString() === today);
        setCheckInOutCount(todayRecords.length);
        }
      })
      .catch(error => console.error('Error fetching attendance records:', error));
  };
  const fetchLeaveRequests = (loginId) => {
    axios.get(`http://localhost:8080/api/leave-requests/user/${loginId}`)
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => console.error('Error fetching leave requests:', error));
  };
  const handleCheckIn = () => {
    const loginId = localStorage.getItem('loginId');
    axios.post(`http://localhost:8080/api/attendance/check-in/${loginId}`)
      .then(response => {
        setCheckInTime(response.data.checkIn);
        setIsCheckedIn(true);
        fetchAttendanceRecords(loginId);
      })
      .catch(error => console.error('Error checking in:', error));
  };

  const handleCheckOut = () => {
    const loginId = localStorage.getItem('loginId');
    axios.post(`http://localhost:8080/api/attendance/check-out/${loginId}`)
      .then(response => {
        setCheckOutTime(response.data.checkOut);
        setIsCheckedIn(false);
        fetchAttendanceRecords(loginId);
      })
      .catch(error => console.error('Error checking out:', error));
  };

  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4">Welcome, {profile.firstName} {profile.lastName}</Typography>
        {/* <Typography variant="body1">Email: {profile.userEmail}</Typography> */}
        <Typography variant="h6" style={{ marginTop: '20px' }}>Check-In/Out</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckIn}
          style={{ marginRight: '10px' }}
          disabled={isCheckedIn || checkInOutCount >= 3 }
        >
          Check-In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCheckOut}
          disabled={!isCheckedIn || checkInOutCount >= 4}
        >
          Check-Out
        </Button>
        <Typography variant="body1" style={{ marginTop: '10px' }}>Check-In Time: {checkInTime ? new Date(checkInTime).toLocaleTimeString() : 'N/A'}</Typography>
        <Typography variant="body1">Check-Out Time: {checkOutTime ? new Date(checkOutTime).toLocaleTimeString() : 'N/A'}</Typography>
      </Paper>
    
    </Container>
  );
}

export default EmployeeDashboard;


