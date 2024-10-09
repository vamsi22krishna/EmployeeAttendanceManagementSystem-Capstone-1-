import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Manager() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  console.log(leaveRequests);
  const navigate=useNavigate();

  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    const roles = localStorage.getItem('role');
    if(loginId==null || roles!='Manager' ){
      navigate('/login');
    }
    console.log('useEffect triggered');
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    const managerId = localStorage.getItem('managerId');
    console.log('Fetching leave requests for managerId:', managerId);
    try {
      const response = await axios.get(`http://localhost:8080/api/manager/leave-requests/${managerId}`);
      console.log('Leave requests fetched:', response.data);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleApprove = async (leaveId) => {
    console.log('Approving leave request with leaveId:', leaveId);
    try {
      await axios.post(`http://localhost:8080/api/manager/approve-leave/${leaveId}`);
      console.log('Leave request approved');
      fetchLeaveRequests();
      
      
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };

  const handleReject = async (leaveId) => {
    console.log('Rejecting leave request with leaveId:', leaveId);
    try {
      await axios.post(`http://localhost:8080/api/manager/reject-leave/${leaveId}`);
      console.log('Leave request rejected');
      setLeaveRequests(leaveRequests.filter(request => request.leaveId !== leaveId)); // Remove rejected request from the list
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4">Leave Requests</Typography>
        <Typography variant="h6" style={{ marginTop: '20px' }}>Pending Leave Requests</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Days Of Leave</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow key={request.leaveId}>
                <TableCell>{request.firstName} {request.lastName}</TableCell>
                <TableCell>{request.leaveTypeName}</TableCell>
                <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{request.numberOfLeaves}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleApprove(request.leaveId)}>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(request.leaveId)}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Manager;


// import React, { useState, useEffect } from 'react';
// import { Container, Paper, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import axios from 'axios';

// function Manager() {
//   const [leaveRequests, setLeaveRequests] = useState([]);

//   useEffect(() => {
//     fetchLeaveRequests();
//   }, []);

//   const fetchLeaveRequests = async () => {
//     const managerId = localStorage.getItem('managerId');
//     try {
//       const response = await axios.get(`http://localhost:8080/api/manager/leave-requests/${managerId}`);
//       setLeaveRequests(response.data);
//     } catch (error) {
//       console.error('Error fetching leave requests:', error);
//     }
//   };

//   const handleApprove = async (leaveId) => {
//     try {
//       await axios.post(`http://localhost:8080/api/manager/approve-leave/${leaveId}`);
//       fetchLeaveRequests(); // Refresh leave requests after approval
//     } catch (error) {
//       console.error('Error approving leave request:', error);
//     }
//   };

//   const handleReject = async (leaveId) => {
//     try {
//       await axios.post(`http://localhost:8080/api/manager/reject-leave/${leaveId}`);
//       fetchLeaveRequests(); // Refresh leave requests after rejection
//     } catch (error) {
//       console.error('Error rejecting leave request:', error);
//     }
//   };

//   return (
//     <Container>
//       <Paper style={{ padding: '20px', marginTop: '20px' }}>
//         <Typography variant="h4">Manager Dashboard</Typography>
//         <Typography variant="h6" style={{ marginTop: '20px' }}>Pending Leave Requests</Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Employee</TableCell>
//               <TableCell>Leave Type</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Reason</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {leaveRequests.map((request) => (
//               <TableRow key={request.leaveId}>
//                 <TableCell>{request.userLogin.userInfo.firstName} {request.userLogin.userInfo.lastName}</TableCell>
//                 <TableCell>{request.leaveTypeName}</TableCell>
//                 <TableCell>{request.startDate}</TableCell>
//                 <TableCell>{request.endDate}</TableCell>
//                 <TableCell>{request.reason}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleApprove(request.leaveId)}>
//                     Approve
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={() => handleReject(request.leaveId)}>
//                     Reject
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Container>
//   );
// }

// export default Manager;
