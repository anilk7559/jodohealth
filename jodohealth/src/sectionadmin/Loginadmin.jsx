import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Container, Box } from '@mui/material';
import { AdminLogin } from '../redux/services/AuthService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo.png';
function Loginadmin() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    const body = {
      email: values.username,
      password: values.password
    };

    try {
      const res = await AdminLogin(body);
      console.log(res, "admin log respose");
      if (res.response?.body?.userDetail?.role_type == "Admin") {
        toast.success('Login successful! Redirecting to admin dashboard.');
        setTimeout(() => {
          navigate('/admindashboard');
        }, 3000);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <>

      <Container maxWidth="sm" sx={{ paddingTop: "10%" }}>
        <Box sx={{ padding: "20px", backgroundColor: "transparant" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img src={logo} alt="Your Company" className="h-auto" style={{ minHeight: '60px', maxWidth: '100%' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 8, md: 0 } }}>
                <Typography sx={{ mb: 3 ,fontSize:"20px",fontWeight:"600"}}>
                  Admin Login
                </Typography>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            type="text"
                            name="username"

                            fullWidth
                            variant="outlined"
                            size="small"
                            error={Boolean(errors.username && touched.username)}
                            helperText={touched.username ? errors.username : ''}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            type="password"
                            name="password"

                            fullWidth
                            variant="outlined"
                            size="small"
                            error={Boolean(errors.password && touched.password)}
                            helperText={touched.password ? errors.password : ''}
                          />
                        </Grid>
                      </Grid>
                      <div class="grid-container">
                        <div class="grid-item">
                          <Link to="/forgotpassword">Forgot Password ?</Link>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'rgb(13 121 173)', '&:hover': { bgcolor: 'rgb(90 198 249 / 80%)' } }}
                      >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Container>


    </>

  );
}

export default Loginadmin;
