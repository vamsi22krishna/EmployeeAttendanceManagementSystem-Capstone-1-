import React,{useEffect} from 'react';
import { Container, Typography } from '@mui/material';
import ManagerForm from './ManagerForm';
import EmployeeForm from './EmployeeForm';
import LeaveTypeForm from './LeaveTypeForm';
import { useNavigate } from 'react-router-dom';

function HRDashboard() {
  const navigate=useNavigate();
  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const roles = localStorage.getItem('role');
  if(loginId==null || roles!='HR' ){
    navigate('/login');
  }
  }, []);

  
  return (
    <Container>
      {/* <Typography variant="h4">HR Dashboard</Typography> */}
      {/* <ManagerForm /> */}
      <EmployeeForm />
      {/* <LeaveTypeForm /> */}
    </Container>
  );
}

export default HRDashboard;
