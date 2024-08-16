// Import necessary components and styles from Material-UI
import React, { useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

// Define your Aboutus component
const Aboutus = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);

  },[])
  return (
    <>
    <Header/>
        <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h3" gutterBottom style={{ color: 'rgb(13, 121, 173)' ,textAlign:"center" }}>
          About Us
        </Typography>
        <Typography variant="body1" paragraph sx={{color:"black"}}>
          Welcome to JodoHealth, your ultimate destination for convenient and affordable lab testing services.
          At JodoHealth, we understand the importance of easy access to healthcare services without compromising on quality.
          Our platform revolutionizes the way you book lab tests, ensuring seamless bookings and exclusive discounts directly from reputable labs.
        </Typography>

        <Box my={4}>
          <Typography variant="h4" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph sx={{color:"black"}}>
            Our mission at JodoHealth is to empower individuals and families by simplifying the process of booking lab tests.
            We aim to promote proactive health management through easy accessibility, affordability, and reliability.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
            What We Offer
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" paragraph sx={{color:"black"}}>
                <strong>Multiple Lab Bookings:</strong> With JodoHealth, you can book lab tests from multiple labs in just a few clicks.
                We bring together a network of trusted laboratories to provide you with a wide range of testing options.
              </Typography>
              <Typography variant="body1" paragraph sx={{color:"black"}}>
                <strong>Exclusive Discounts:</strong> By booking through JodoHealth, you unlock special discounts offered directly by our partner labs.
                This ensures that you receive the best possible rates for your healthcare needs.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" paragraph sx={{color:"black"}}>
                <strong style={{ color: 'rgb(13, 121, 173)' }}>Family Health Packages:</strong> Our unique subscription model allows you to add up to 3 family members under a single subscription of just Rs. 999.
                This all-in-one package simplifies healthcare management for your entire family.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" paragraph sx={{color:"black"}}>
            At JodoHealth, we prioritize your convenience and well-being. Here’s why thousands of users trust us:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" sx={{color:"black"}}>
                <strong>User-Friendly Platform:</strong> Our website is designed to be intuitive and easy-to-use, making the booking process effortless.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{color:"black"}}>
                <strong>Trusted Partner Labs:</strong> We collaborate with reputed laboratories that adhere to stringent quality standards, ensuring accurate results and reliable service.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{color:"black"}}>
                <strong>Affordability:</strong> We believe in transparent pricing and strive to offer competitive rates with added discounts for our users.
              </Typography>
            </li>
          </ul>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
            Our Commitment
          </Typography>
          <Typography variant="body1" paragraph>
            We are committed to fostering a healthier community by providing accessible healthcare solutions.
            Whether you need routine tests or specialized diagnostics, JodoHealth is your reliable partner in managing your health journey.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
            Join Us Today
          </Typography>
          <Typography variant="body1" paragraph>
            Experience the future of healthcare booking with JodoHealth.
            Take charge of your health with our comprehensive and affordable lab testing services.
            Join us in our mission to make healthcare accessible to all.
          </Typography>
        </Box>

      </Box>
    </Container>
    <Footer/>
    </>
  );
}

export default Aboutus;
