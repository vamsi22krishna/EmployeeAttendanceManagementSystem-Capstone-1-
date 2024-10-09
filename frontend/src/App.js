import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper, IconButton, Menu } from '@mui/material';
import { Home, Login as LoginIcon, ContactMail, Star } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DoneIcon from '@mui/icons-material/Done';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Login from './components/login/Login'; 
import AdminDashboard from './components/admin/AdminDashboard';
import HRDashboard from './components/hr/HrDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import LeaveRequestForm from './components/employee/LeaveRequestForm';

import Manager from './components/manager/Manager';
import AttendanceRecords from './components/manager/AttendanceRecords';
import AttendanceCalendar from './components/employee/AttendanceCalander';
import ManagerCorrectionRequests from './components/manager/AttendanceCorrections';
import LeaveTypeForm from './components/hr/LeaveTypeForm';
import AttendanceRecordsPage from './components/employee/EmployeeAttendance';
import Logout from './components/login/Logout';
import ManagersList from './components/admin/ViewManager';
import HRsList from './components/admin/ViewHrs';

import AttendanceReportTable from './components/hr/DownloadReport';
import UserProfile from './components/profile/Profile';
import PasswordChange from './components/login/PasswordChange';
import ContactPage from './components/profile/Contact';

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    { src: "images/home.jpeg", alt: "Carousel Image 1" },
    //  { src: "images/image2.jpeg", alt: "Carousel Image 2" },
    { src: "images/image1.jpeg", alt: "Carousel Image 3" }
  ];

  // Automatically scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [images.length]);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="homepage">
      <main>
        <section className="carousel-section">
          <div className="carousel">
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                  key={index}
                >
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>

            <button className="carousel-control prev" onClick={prevImage}>
              &#10094;
            </button>
            <button className="carousel-control next" onClick={nextImage}>
              &#10095;
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              ></span>
            ))}
          </div>
        </section>

        <section className="get-heard-section card">
          <h2>Get Heard</h2>
          <p>Share your feedback and ideas to help us improve.</p>
          <div className="testimonial">
            <img src="images/Testimonial.jpeg" alt="Testimonial Image" />
            <p>"Great experience using the platform. Highly recommended!"</p>
            <p>- Radha Krishna</p>
          </div>
        </section>

        <section className="card-grid">
          <div className="for-employees-section card">
            <h3>For Employees</h3>
            <ul>
              <li>Track attendance and leaves</li>
              <li>Submit Attendance Correction Requests</li>
             
            </ul>
          </div>

          <div className="for-hr-admin-section card">
            <h3>For HR & Admin</h3>
            <ul>
              <li>Manage employee records</li>
              <li>Generate Attendance reports</li>
              <li>Onboard new employees</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function AdminNavBar() {
  return (
   <header>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <img src={"/images/Attend.png"} alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
        <Typography>
          {/* Admin Dashboard */}
        </Typography>
        <div style={{ display: 'flex', gap: '16px' }}>
        <Button color="inherit" startIcon={<Home />} component={Link} to="/userprofile">Dashboard</Button>
        <Button color="inherit" startIcon={<Person2Icon />}   component={Link} to="/admin/dashboard">Add User</Button>
        <Button color="inherit" startIcon={<ContactMail />} component={Link} to="/viewmanagers">Managers</Button>
        <Button color="inherit" startIcon={<Star />} component={Link} to="/viewhrs">HRs</Button>
        <Button color="inherit" startIcon={<ContactMail />} component={Link} to="/leavetype/leave-type-form">Set Leave</Button>
        
        <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/logout">Logout</Button>
      </div>
      </Toolbar>
    </header>
  );
}

function HRNavBar() {
  return (
   <header>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <img src={"/images/Attend.png"} alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
        <Typography>
          {/* HR Dashboard */}
        </Typography>
        <div style={{ display: 'flex', gap: '16px' }}>
        <Button color="inherit" startIcon={<Home />} component={Link} to="/userprofile">Dashboard</Button>
        <Button color="inherit" startIcon={<Person2Icon />} component={Link} to="/hr/dashboard">Add Employee</Button>
        <Button color="inherit" startIcon={<ContactMail />} component={Link} to="/leavetype/leave-type-form">Set Leave</Button>
        <Button color="inherit" startIcon={<Star />} component={Link} to="/attendance-report">Attendance Report</Button>
        <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/logout">Logout</Button>
      </div>
      </Toolbar>
   </header>
  );
}

function EmployeeNavBar() {
  return (
   <header>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <img src={"/images/Attend.png"} alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
        <Typography>
          {/* Employee Dashboard */}
        </Typography>
        <div style={{ display: 'flex', gap: '16px' }}>
        <Button color="inherit" startIcon={<Home />} component={Link} to="/userprofile">Dashboard</Button>
        <Button color="inherit" startIcon={<DoneIcon />} component={Link} to="/employee/dashboard">CheckInOut</Button>
        <Button color="inherit" startIcon={<EnergySavingsLeafIcon/>}component={Link} to="/employee/request-leave">Request Leave</Button>
        {/* <Button color="inherit" component={Link} to="/employee/attendance-records">Attendance Records</Button> */}
        <Button color="inherit" startIcon={<CalendarMonthIcon/>}component={Link} to="/employee/submit-correction">Attendance Info</Button>
        <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/logout">Logout</Button>
      </div>
      </Toolbar>
   </header>
  );
}
function ManagerNavbar() {
  return (
   <header>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        
        </IconButton> */}
        <img src={"/images/Attend.png"} alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
        <Typography >
          {/* Manager Dashboard */}
        </Typography>
        <div style={{ display: 'flex', gap: '16px' }}> {/* Space between buttons */}
        <Button color="inherit"  startIcon={<Home />} component={Link} to="/userprofile">Dashboard</Button>
        <Button color="inherit"  startIcon={<EnergySavingsLeafIcon/>} component={Link} to="/leave-requests">Leave Requests</Button>
        <Button color="inherit" startIcon={<AcUnitIcon/>}component={Link} to="/manager/attendance">Team Attendance</Button>
        {/* <Button color="inherit" component={Link} to="/attendance-reports">Generate Reports</Button>
        <Button color="inherit" component={Link} to="/attendance-discrepancies">Discrepancies</Button> */}
        <Button color="inherit" startIcon={<AnnouncementIcon/>} component={Link} to="/manager/attendance-corrections">Correction Request</Button>
        <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/logout">Logout</Button>
      </div>
      </Toolbar>
    </header>
  );
}

function App() {
  const [userRole, setUserRole] = useState(null); // This should be set based on the logged-in user's role

  console.log('Current user role:', userRole); // Debugging log

  return (
    <Router>
      <div className="App">
        {userRole === 'Admin' ? <AdminNavBar /> : userRole === 'HR' ? <HRNavBar /> : userRole === 'Employee' ? <EmployeeNavBar /> :userRole === 'Manager' ? <ManagerNavbar /> :(
         <header>
           <Toolbar style={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
           <img src={"/images/Attend.png"} alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
              <Typography variant="h6" style={{ flexGrow: 1 }}>
              {/* <img src="images/attendsmart.jpeg"alt="AttendSmart Logo" className='logo' /> */}
              {/* AttendSmart */}
              </Typography>
           
              <Button color="inherit" startIcon={<Home />} component={Link} to="/">Home</Button>
              <Button color="inherit" startIcon={<ContactMail />} component={Link} to="/contactus">Contacts</Button>
              <Button color="inherit" startIcon={<Star />} component={Link} to="#testimonials">Testimonials</Button>
              <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/login">Login</Button>
            
            </Toolbar>
            </header>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/leave-requests" element={< Manager/>}/>
          {/* <Route path="/employee/request-leave" element={<RequestLeave />} />  */}
          <Route path="/manager/attendance" element={<AttendanceRecords />} />
          <Route path="/manager/attendance-corrections" element={<ManagerCorrectionRequests />} />
          {/* <Route path="/employee/attendance-records" element={<AttendanceRecords />} /> */}
          <Route path="/employee/submit-correction" element={<AttendanceCalendar />} />
          <Route path="/employee/request-leave" element={<LeaveRequestForm />} />
          <Route path="/leavetype/leave-type-form" element={<LeaveTypeForm />} />
          <Route path="/employee/attendance-records" element={<AttendanceRecordsPage/>}/>
         <Route path="/logout" element={<Logout setUserRole={setUserRole}/>}/>
         <Route path="/viewmanagers"element={<ManagersList/>}/>
         <Route path="/viewhrs"element={<HRsList/>}/>
         <Route path="/attendance-report"element={<AttendanceReportTable/>}/>
         <Route path="/userprofile"element={<UserProfile/>}/>
         <Route path="/password-change" element={<PasswordChange />} />
         <Route path="contactus"element={<ContactPage/>}/>
        </Routes>

        <footer className="App-footer">
          <Typography variant="body2" color="white">
            © 2024 Attendance Management System
          </Typography>
        </footer>
      </div>
    </Router>
  );
}


export default App;

// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
// import { Home, Login as LoginIcon, ContactMail, Star } from '@mui/icons-material';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Login from './components/login/Login'; // Ensure the path is correct
// import AdminDashboard from './components/admin/AdminDashboard';
// import HRDashboard from './components/hr/HrDashboard';

// function HomePage() {
//   return (
//     <Container>
//       <header className="App-header">
//         <Typography variant="h2" gutterBottom>
//           Welcome to the Attendance Management System
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           Manage your attendance efficiently and effectively.
//         </Typography>
//       </header>
//       <main>
//         <Box my={4}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Paper className="paper">
//                 <Typography variant="h6">Feature 1</Typography>
//                 <Typography variant="body1">Description of feature 1.</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Paper className="paper">
//                 <Typography variant="h6">Feature 2</Typography>
//                 <Typography variant="body1">Description of feature 2.</Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </main>
//     </Container>
//   );
// }

// function AdminNavBar() {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           Admin Dashboard
//         </Typography>
//         <Button color="inherit" startIcon={<Home />} component={Link} to="/admin/dashboard">Dashboard</Button>
//         <Button color="inherit" startIcon={<ContactMail />} component={Link} to="#contacts">Contacts</Button>
//         <Button color="inherit" startIcon={<Star />} component={Link} to="#testimonials">Testimonials</Button>
//         <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/login">Logout</Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

// function HRNavBar() {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           HR Dashboard
//         </Typography>
//         <Button color="inherit" startIcon={<Home />} component={Link} to="/hr/dashboard">Dashboard</Button>
//         <Button color="inherit" startIcon={<ContactMail />} component={Link} to="#contacts">Contacts</Button>
//         <Button color="inherit" startIcon={<Star />} component={Link} to="#testimonials">Testimonials</Button>
//         <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/login">Logout</Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

// function App() {
//   const [userRole, setUserRole] = useState(null); // This should be set based on the logged-in user's role

//   console.log('Current user role:', userRole); // Debugging log

//   return (
//     <Router>
//       <div className="App">
//         {userRole === 'Admin' ? <AdminNavBar /> : userRole === 'HR' ? <HRNavBar /> : (
//           <AppBar position="static">
//             <Toolbar>
//               <Typography variant="h6" style={{ flexGrow: 1 }}>
//                 Attendance Management System
//               </Typography>
//               <Button color="inherit" startIcon={<Home />} component={Link} to="/">Home</Button>
//               <Button color="inherit" startIcon={<ContactMail />} component={Link} to="#contacts">Contacts</Button>
//               <Button color="inherit" startIcon={<Star />} component={Link} to="#testimonials">Testimonials</Button>
//               <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/login">Login</Button>
//             </Toolbar>
//           </AppBar>
//         )}

//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login setUserRole={setUserRole} />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/hr/dashboard" element={<HRDashboard />} />
//         </Routes>

//         <footer className="App-footer">
//           <Typography variant="body2" color="white">
//             © 2024 Attendance Management System
//           </Typography>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import logo from './logo.svg';
// import './App.css';
// import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
// import { Home, Login as LoginIcon, ContactMail, Star } from '@mui/icons-material';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Login from './components/login/Login'; // Ensure the path is correct
// import AdminDashboard from './components/admin/AdminDashboard';
// import HRDashboard from './components/hr/HrDashboard';

// function HomePage() {
//   return (
//     <Container>
//       <header className="App-header">
//         <Typography variant="h2" gutterBottom>
//           Welcome to the Attendance Management System
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           Manage your attendance efficiently and effectively.
//         </Typography>
//       </header>
//       <main>
//         <Box my={4}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Paper className="paper">
//                 <Typography variant="h6">Feature 1</Typography>
//                 <Typography variant="body1">Description of feature 1.</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Paper className="paper">
//                 <Typography variant="h6">Feature 2</Typography>
//                 <Typography variant="body1">Description of feature 2.</Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </main>
//     </Container>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h6" style={{ flexGrow: 1 }}>
//               Attendance Management System
//             </Typography>
//             <Button color="inherit" startIcon={<Home />} component={Link} to="/">Home</Button>
//             <Button color="inherit" startIcon={<ContactMail />} component={Link} to="#contacts">Contacts</Button>
//             <Button color="inherit" startIcon={<Star />} component={Link} to="#testimonials">Testimonials</Button>
//             <Button color="inherit" startIcon={<LoginIcon />} component={Link} to="/login">Login</Button>
//           </Toolbar>
//         </AppBar>

//         {/* Define Routes here */}
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/hr/dashboard" element={<HRDashboard/>} />
//         </Routes>

//         <footer className="App-footer">
//           <Typography variant="body2" color="white">
//             &copy; 2024 Attendance Management System
//           </Typography>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import logo from './logo.svg';
// import './App.css';
// import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
// import { Home, Login, Logout, ContactMail, Star } from '@mui/icons-material';
// function App() {
//   return (
//     <div className="App">
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           Attendance Management System
//         </Typography>
//         <Button color="inherit" startIcon={<Home />} href="#home">Home</Button>
        
//         {/* <Button color="inherit" startIcon={<Logout />} href="#logout">Logout</Button> */}
//         <Button color="inherit" startIcon={<ContactMail />} href="#contacts">Contacts</Button>
//         <Button color="inherit" startIcon={<Star />} href="#testimonials">Testimonials</Button>
//         <Button color="inherit" startIcon={<Login />} href="#login">Login</Button>
//       </Toolbar>
//     </AppBar>
//     <Container>
//       <header className="App-header">
//         <Typography variant="h2" gutterBottom>
//           Welcome to the Attendance Management System
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           Manage your attendance efficiently and effectively.
//         </Typography>
//       </header>
//       <main>
//         <Box my={4}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Paper className="paper">
//                 <Typography variant="h6">Feature 1</Typography>
//                 <Typography variant="body1">Description of feature 1.</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Paper className="paper">
//                 <Typography variant="h6">Feature 2</Typography>
//                 <Typography variant="body1">Description of feature 2.</Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </main>
//     </Container>
//     <footer className="App-footer">
//       <Typography variant="body2" color="white">
//         &copy; 2024 Attendance Management System
//       </Typography>
//     </footer>
//   </div>
//   );
// }

// export default App;
