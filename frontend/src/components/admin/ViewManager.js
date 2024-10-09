// src/components/ManagersList.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import './table.css';
function ManagersList() {
  const [managers, setManagers] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const roles = localStorage.getItem('role');
    if(loginId==null || roles!='Admin' ){
      navigate('/login');
    }
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/userinfo/managers');
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Table striped bordered hover className="w-75">
        <thead className="custom-header">
          <tr>
            <th>UserId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager, index) => (
            <tr key={manager.userId}>
              <td>{manager.userId}</td>
              <td>{manager.firstName}</td>
              <td>{manager.lastName}</td>
              <td>{manager.userEmail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManagersList;
