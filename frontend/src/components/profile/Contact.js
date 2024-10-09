import React from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Contact.css';

function ContactPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be 50 characters or less'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      subject: Yup.string()
        .required('Subject is required')
        .min(5, 'Subject must be at least 5 characters')
        .max(100, 'Subject must be 100 characters or less'),
      message: Yup.string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters')
        .max(500, 'Message must be 500 characters or less'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container className="contact-container">
      <Paper className="contact-paper">
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('subject')}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...formik.getFieldProps('message')}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="contact-button"
          >
            Send Message
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ContactPage;
