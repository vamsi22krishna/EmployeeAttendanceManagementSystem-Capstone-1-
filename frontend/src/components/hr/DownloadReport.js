import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AttendanceReportTable() {
  const [reportData, setReportData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const navigate = useNavigate();

  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const roles = localStorage.getItem('role');
    if (loginId == null || roles !== 'HR') {
      navigate('/login');
    }
  }, [navigate]);

  const fetchReportData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reports/attendance', {
        params: { year, month }
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reports/attendance/csv', {
        params: { year, month },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_report.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const years = Array.from(new Array(10), (val, index) => new Date().getFullYear() - index);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Form className="mb-3 w-75">
        <Form.Group controlId="formYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            as="select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formMonth">
          <Form.Label>Month</Form.Label>
          <Form.Control
            as="select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={fetchReportData}>
          Fetch Report
        </Button>
      </Form>
      <Button variant="primary" className="mb-3" onClick={downloadReport}>
        Download Attendance Report
      </Button>
      <Table striped bordered hover className="w-75">
        <thead style={{ backgroundColor: '#1976d2', color: 'white' }}>
          <tr>
            <th>UserId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Days Present</th>
            <th>Days Absent</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((record, index) => (
            <tr key={index}>
              <td>{record.userId}</td>
              <td>{record.firstName}</td>
              <td>{record.lastName}</td>
              <td>{record.daysPresent}</td>
              <td>{record.daysAbsent}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AttendanceReportTable;

