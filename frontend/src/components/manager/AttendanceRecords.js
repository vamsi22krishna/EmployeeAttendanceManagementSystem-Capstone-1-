import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AttendanceRecords() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [managerId, setManagerId] = useState(localStorage.getItem('managerId'));

    const navigate=useNavigate();
    useEffect(() => {
        const loginId = localStorage.getItem('loginId');
        const roles = localStorage.getItem('role');
        if(loginId==null || roles!='Manager' ){
          navigate('/login');
        }
        const fetchAttendanceRecords = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/attendance/manager/${managerId}`);
                setAttendanceRecords(response.data);
                setFilteredRecords(response.data); // Initialize filtered records
            } catch (error) {
                console.error('Error fetching attendance records:', error);
            }
        };

        fetchAttendanceRecords();
    }, [managerId]);

    useEffect(() => {
        // Filter records based on the search term
        const filtered = attendanceRecords.filter(record => 
            `${record.firstName} ${record.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecords(filtered);
    }, [searchTerm, attendanceRecords]);

    return (
        <Container>
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4">Attendance Records</Typography>
                <TextField 
                    label="Search Employee" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecords.map((record) => (
                            <TableRow key={record.attendanceId}>
                                <TableCell>{record.firstName} {record.lastName}</TableCell>
                                <TableCell>{record.date.toString().split('T')[0]}</TableCell>
                                <TableCell>{record.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}

export default AttendanceRecords;
