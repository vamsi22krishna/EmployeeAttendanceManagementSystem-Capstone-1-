import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AttendanceRecordsPage() {
const navigate=useNavigate();
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const role = localStorage.getItem('role');
    if(loginId==null || role !='Employee'){
        navigate('/login');
      }
    fetchAttendanceRecords(loginId);

  }, []);

  

  const fetchAttendanceRecords = (loginId) => {
    axios.get(`http://localhost:8080/api/attendance/records/${loginId}`)
      .then(response => {
        const records = response.data;
        const allStatusesA = records.every(record => record.status === "A");

        if (allStatusesA && records.length > 0) {
          setAttendanceRecords([records[records.length - 1]]);
        } else {
          setAttendanceRecords(records);
        }
      })
      .catch(error => console.error('Error fetching attendance records:', error));
  };

  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Attendance Records</Typography>
        {attendanceRecords.map(record => (
          <Typography key={record.attendanceId} variant="body1">
            Date: {new Date(record.date).toLocaleDateString()}, Check-In: {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : 'N/A'}, Check-Out: {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'N/A'}, Status: {record.status}
          </Typography>
        ))}
      </Paper>
    </Container>
  );
}

export default AttendanceRecordsPage;
