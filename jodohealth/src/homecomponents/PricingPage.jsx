import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const PricingPage = () => {
  return (
    <>
    <Header/>
    <Container maxWidth="lg">
      <Box py={4}>

        <Grid container spacing={3} justifyContent="center">
          <Typography variant="h3" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
            Pricing Policy
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
                Family Health Plan
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
                ₹999
              </Typography>
              <Typography variant="body1" paragraph>
                Includes up to 4 family members
              </Typography>
              <Typography variant="body1" paragraph>
                Enjoy peace of mind with our Family Health Plan. For just ₹999, you can cover up to four family members under one convenient subscription.
              </Typography>
              <Typography variant="body1" paragraph>
                Our platform simplifies the process of booking lab tests for your entire family. No more multiple bookings or separate transactions—everything you need is right here.
              </Typography>
              <Typography variant="body1" paragraph>
                Benefits:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    Book lab tests for multiple family members in one go
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Exclusive discounts from partner labs, ensuring you get the best rates available
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Access to a user-friendly platform that prioritizes your convenience
                  </Typography>
                </li>
              </ul>
              <Typography variant="body1" paragraph>
                Whether it’s routine check-ups or specialized diagnostics, JodoHealth is your trusted partner in managing your family’s health.
              </Typography>
              <Typography variant="body1" paragraph style={{ color: 'red', fontWeight: 'bold' }}>
                Please note: The subscription fee of ₹999 for the Family Health Plan is non-refundable.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Container>
    <Footer/>
    </>

  );
};

export default PricingPage;
