import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Changecontent() {
  const [homeBanner, setHomeBanner] = useState('');
  const [footerBanner, setFooterBanner] = useState('');

  useEffect(() => {
    setHomeBanner('https://media.istockphoto.com/id/1575126031/photo/mid-aged-business-man-working-on-laptop-computer-in-office-writing-notes.jpg?s=1024x1024&w=is&k=20&c=82XMOh_afD8_1zHod6AXf5bcatm4rWOlsxHP1Efod1o=');
    setFooterBanner('https://media.istockphoto.com/id/1887444772/photo/three-diverse-professional-women-in-business-attire-smiling-and-posing-in-an-office.jpg?s=1024x1024&w=is&k=20&c=DbWPa69Mom9o2Chb36HDQSiJmLU13iSTndwf0H1gDIA=');
  }, []);

  const handleImageChange = (event, bannerType) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (bannerType === 'home') {
          setHomeBanner(reader.result);
        } else if (bannerType === 'footer') {
          setFooterBanner(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (bannerType) => {
    if (bannerType === 'home') {
      setHomeBanner('');
    } else if (bannerType === 'footer') {
      setFooterBanner('');
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" className='pt-10'>
        <Typography variant="h6" style={{ marginLeft: '16px' }}>Update Content Dynamically JodoHealth</Typography>
      <Grid item xs={12} md={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            accept="image/*"
            id="home-banner-upload"
            type="file"
            onChange={(e) => handleImageChange(e, 'home')}
            style={{ display: 'none' }}
          />
          <label htmlFor="home-banner-upload">
            <Button variant="contained" component="span" sx={{paddingRight:"34px"}}>
              Upload Home Banner
            </Button>
          </label>
          {homeBanner && (
            <div style={{ marginLeft: '10px' }}>
                 <IconButton onClick={() => handleClearImage('home')}>
                <CloseIcon />
              </IconButton>
              <img src={homeBanner} alt="Home Banner" style={{ maxWidth: '200px', maxHeight: '150px' }} />
             
            </div>
          )}
        </div>
      </Grid>

      <Grid item xs={12} md={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            accept="image/*"
            id="footer-banner-upload"
            type="file"
            onChange={(e) => handleImageChange(e, 'footer')}
            style={{ display: 'none' }}
          />
          <label htmlFor="footer-banner-upload">
            <Button variant="contained" component="span">
              Upload Footer Banner
            </Button>
          </label>
          {footerBanner && (
            
            <div style={{ marginLeft: '10px' }}>
                 <IconButton onClick={() => handleClearImage('footer')}>
                <CloseIcon />
              </IconButton>
              <img src={footerBanner} alt="Footer Banner" style={{ maxWidth: '200px', maxHeight: '150px' }} />
             
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default Changecontent;
