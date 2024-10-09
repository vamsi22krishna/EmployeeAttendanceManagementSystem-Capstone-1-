// src/components/HRsList.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import './table.css';
function HRsList() {
  const [hrs, setHRs] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const roles = localStorage.getItem('role');
    if(loginId==null || roles!='Admin' ){
      navigate('/login');
    }
    fetchHRs();
  }, []);

  const fetchHRs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/userinfo/hrs');
      setHRs(response.data);
    } catch (error) {
      console.error('Error fetching HRs:', error);
    }
  };
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Table  striped bordered hover className="w-75">
        <thead className="custom-header">
          <tr>
            <th>UserId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {hrs.map((hr, index) => (
            <tr key={hr.userId}>
              <td>{hr.userId}</td>
              <td>{hr.firstName}</td>
              <td>{hr.lastName}</td>
              <td>{hr.userEmail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default HRsList;
