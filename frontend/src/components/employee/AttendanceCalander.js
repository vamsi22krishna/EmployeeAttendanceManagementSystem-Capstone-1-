import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

function AttendanceCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [correctionReason, setCorrectionReason] = useState('');
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
  const roles = localStorage.getItem('role');
  if(loginId==null || roles!='Employee' ){
    navigate('/login');
  }
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const loginId = localStorage.getItem('loginId');
    try {
      const response = await axios.get(`http://localhost:8080/api/attendance/records/${loginId}`);
      const records = response.data;
      console.log('API Response:', records); // Log the API response
  
      // Group records by date
      const groupedRecords = records.reduce((acc, record) => {
        const date = new Date(record.date).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(record);
        return acc;
      }, {});
  
      // grouped records to verify
      console.log('Grouped Records:', groupedRecords);
  
      // Create a new array of events
      const attendanceEvents = [];
      for (const date in groupedRecords) {
        const recordsForDate = groupedRecords[date];
        console.log('Records for Date:', recordsForDate); //  records for each date
        if (recordsForDate.length > 0) {
          let status = 'A';
          if (recordsForDate.some(record => record.status === 'P')) {
            status = 'P';
          } else if (recordsForDate.some(record => record.status === 'AP')) {
            status = 'AP';
          } else if (recordsForDate.some(record => record.status === 'RJ')) {
            status = 'RJ';
          }
          const attendanceId = recordsForDate.find(record => record.status === status).attendanceId;
          console.log('Attendance ID:', attendanceId); // attendanceId to verify
          attendanceEvents.push({
            id: attendanceId,
            title: status,
            start: new Date(date),
            end: new Date(date),
            allDay: true,
            status: status
          });
        } else {
          console.log('No records for date:', date);
        }
      }
  //  // Add events for Saturdays and Sundays
  //  const startDate = new Date(records.date);
  //  const endDate = new Date(records[records.length - 1].date);
  //  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  //    if (d.getDay() === 0 || d.getDay() === 6) { // Sunday or Saturday
  //      attendanceEvents.push({
  //        id: `R-${d.toDateString()}`,
  //        title: `Status: R ☕`,
  //        start: new Date(d),
  //        end: new Date(d),
  //        allDay: true,
  //        status: 'R'
  //      });
  //    }
  //  }
      setEvents(attendanceEvents);
      console.log('Attendance Events:', attendanceEvents); // Log attendance events
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };
  
 

  const handleSelectEvent = (event) => {
    if (event.status === 'A') {
      console.log('Selected Event:', event); // Log selected event
      setSelectedEvent(event);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setCorrectionReason('');
  };

  const handleCorrectionSubmit = async () => {
    const loginId = localStorage.getItem('loginId');
    try {
      console.log('Submitting Correction:', {
        loginId,
        attendanceId: selectedEvent.id,
        correctionReason
      }); // Log correction request data
      await axios.post('http://localhost:8080/api/attendancecorrections/save', {
        loginId,
        attendanceId: selectedEvent.id,
        correctionReason
      });
      alert('Correction request submitted successfully');
      handleClose();
    } catch (error) {
      console.error('Error submitting correction request:', error);
      alert('Failed to submit correction request');
    }
  };

  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4">Attendance Calendar</Typography>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, marginTop: '20px' }}
          onSelectEvent={handleSelectEvent}
          min={new Date(1970, 1, 1, 9, 0, 0)} // Set the earliest time to 9 AM
          max={new Date(1970, 1, 1, 20, 0, 0)} // Set the latest time to 6 PM
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Attendance Correction</DialogTitle>
        <DialogContent>
          <TextField
            label="Correction Reason"
            fullWidth
            value={correctionReason}
            onChange={(e) => setCorrectionReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleCorrectionSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AttendanceCalendar;

