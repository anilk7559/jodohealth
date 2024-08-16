

import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';

import Header from '../homecomponents/Header'
import Footer from '../homecomponents/Footer'

const PrivacyPolicy = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);

  },[])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h3" gutterBottom style={{ color: 'rgb(13, 121, 173)' }}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            At JodoHealth, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We may collect the following types of information when you use our services:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Personal Information: Name, email address, phone number, etc., when voluntarily submitted by you.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Usage Data: Information about your interaction with our website or services, such as pages visited, actions taken, etc.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Cookies: We may use cookies and similar technologies to enhance your experience and track usage patterns.
              </Typography>
            </li>
          </ul>
          <Typography variant="h5" gutterBottom>
            How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the collected information for various purposes, including:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                To provide and maintain our services.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                To personalize your experience and improve our website.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                To communicate with you, including responding to inquiries and providing updates.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                To analyze usage trends and optimize our website.
              </Typography>
            </li>
          </ul>
          <Typography variant="h5" gutterBottom>
            Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time to reflect changes in our practices and services. We encourage you to review this page periodically for any updates.
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about our Privacy Policy, please contact us at <a href="Support@jodohealth.com">Support@jodohealth.com</a>.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
