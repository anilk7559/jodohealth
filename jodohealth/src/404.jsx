import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; // If using React Router

function Error404() {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Grid item xs={12} textAlign="center">
          <Typography variant="h1" color="primary">
            404
          </Typography>
          <Typography variant="h4" color="textSecondary">
            Oops! Page not found.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary" style={{ marginTop: 20 }}>
            Go to Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Error404;
