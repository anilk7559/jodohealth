import React, { useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';


const ContactUs = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
 
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic for form submission here
    alert('Form submitted!');
  };

  return (
    <>
    <Header/>
        <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h3" gutterBottom style={{ color: 'rgb(13, 121, 173)',textAlign:"center" }}>
          Contact Us
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph sx={{color:"black"}}>
              Have questions? We’re here to help. Send us a message and we’ll get back to you as soon as possible.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Your Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Your Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="message"
                    name="message"
                    label="Your Message"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} sm={6} mt={5}>
          <Typography variant="body1" paragraph sx={{color:"black"}}>
                If you have any questions or concerns, please feel free to contact us:
            </Typography>
            <Typography variant="body1" paragraph sx={{color:"black"}}>
                Email: <a href="Support@jodohealth.com">Support@jodohealth.com</a>
            </Typography>
            <Typography variant="body1" paragraph sx={{color:"black"}}>
                Phone: +91 93988 44881
            </Typography>
            <Typography variant="body1" paragraph sx={{color:"black"}}>
                Address: Empower healthcare LLP, Plot no 129 Venkateswara nagar, HB colony, Moulali, Hyderabad 500040
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
    <Footer/>
    </>

  );
};

export default ContactUs;
