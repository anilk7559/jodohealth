import React, { useEffect } from 'react';
import Header from '../homecomponents/Header';
import Footer from '../homecomponents/Footer';
import { Container, Typography } from '@mui/material';


const TermsAndConditions = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    
      },[])
    return (
        <div>
            <Header />
            <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom style={{textAlign:"center",color:"rgb(13 121 173)"}}>
                    Terms and Conditions
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to JodoHealth! These terms and conditions outline the rules and regulations for the use of our website, accessible at www.jodohealth.com.
                    By accessing this website, we assume you accept these terms and conditions. Do not continue to use JodoHealth if you do not agree to take all of the terms and conditions stated on this page.
                </Typography>

                <Typography variant="h5" gutterBottom style={{color:"rgb(13 121 173)"}}>
                    Lab Test Bookings
                </Typography>
                <Typography variant="body1" paragraph>
                    Users can make lab test bookings through our website from different labs listed. We provide a convenient platform to book lab tests at various locations.
                </Typography>

                <Typography variant="h5" gutterBottom style={{color:"rgb(13 121 173)"}}>
                    Nearby Labs
                </Typography>
                <Typography variant="body1" paragraph>
                    Users can view nearby labs and book tests accordingly. Our platform helps users find and book lab tests based on their location preferences.
                </Typography>

                <Typography variant="h5" gutterBottom style={{color:"rgb(13 121 173)"}}>
                    Subscription Details
                </Typography>
                <Typography variant="body1" paragraph>
                    JodoHealth offers a subscription for ₹999, which includes access to exclusive features and services. This fee is non-refundable, so please review all subscription details carefully before subscribing.
                </Typography>

                <Typography variant="h5" gutterBottom style={{color:"rgb(13 121 173)"}}>
                    Location
                </Typography>
                <Typography variant="body1" paragraph>
                    Our physical address for correspondence is Plot no 129 Venkateswara nagar, HB colony, Moulali, Hyderabad 500040. For any queries regarding our location or services, please contact us using the information provided below.
                </Typography>
                <Typography variant="h5" gutterBottom style={{color:"rgb(13 121 173)"}}>
                    Refund Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    All subscriptions are non-refundable unless explicitly stated otherwise in writing. Please contact our customer support for clarification on any refund-related queries.
                </Typography>

                <Typography variant="h5" gutterBottom style={{color:"rgb(13 121 173)"}}>
                    Changes to Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    JodoHealth reserves the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on the website. It is your responsibility to review these terms periodically for updates.
                </Typography>

                <Typography variant="h5" gutterBottom style={{color:"rgb(13 121 173)"}}>
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions about these terms, please contact us at <a href="Support@jodohealth.com" style={{color:"rgb(13 121 173)"}}>Support@jodohealth.com</a>. Our team is dedicated to addressing any concerns you may have regarding our terms and conditions.
                </Typography>
            </Container>
        
          

      
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
