import React, { useState } from 'react';
import { Button, Typography, Grid, Container, Box, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo.png'; 
import * as Yup from 'yup';
import { forgotPassword, otpVerify, resetPassword } from '../redux/services/AuthService';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  newPassword: Yup.string().required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Forgotpassword() {
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']); // Array to hold OTP digits
  const [email, setEmail] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmitEmail = async () => {
    try {
      const body = {
        email: email
      }
      const res = await forgotPassword(body)
      if (res.success == true) {
        toast.success('send password reset email.');
        setShowOtpInput(true);
      } else {
        setEmailError('Email not recognized. Please enter a valid email.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send password reset email.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const enteredOtp = otp.join('');
      const body = {
        email: email,
        otp: enteredOtp
      }
      const res = await otpVerify(body)
      if (res.success == true) {
        setShowOtpInput(false);
        setShowResetPasswordForm(true);
        toast.success('OTP verified successfully.');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const body = {
        email: email,
        newPassword: newpassword,
        confirmPassword: confirmpassword
      }
      const res = await resetPassword(body)
      if (res.success == true) {
        toast.success('Password reset successful.');
        setShowResetPasswordForm(false);
        navigate("/admin")
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to reset password.');
    }
  };

  const handleChangeOtp = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (index < 3 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePasswords = () => {
    let valid = true;
    if (!newpassword) {
      setNewPasswordError('New Password is required');
      valid = false;
    } else {
      setNewPasswordError('');
    }

    if (!confirmpassword) {
      setConfirmPasswordError('Confirm Password is required');
      valid = false;
    } else if (confirmpassword !== newpassword) {
      setConfirmPasswordError('Passwords must match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    return valid;
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '10%' }}>

      <Box sx={{ padding: '20px',  backgroundColor: 'transparant' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img src={logo} alt="Your Company" className="h-auto" style={{ minHeight: '60px', maxWidth: '100%' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 8, md: 0 } }}>
              <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: '600' }}>
                Forgot Password
              </Typography>
              {!showOtpInput && !showResetPasswordForm && (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        name="email"
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                        disabled={showOtpInput || showResetPasswordForm}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      bgcolor: 'rgb(13 121 173)',
                      '&:hover': { bgcolor: 'rgb(90 198 249 / 80%)' },
                    }}
                    onClick={() => {
                      if (validateEmail()) {
                        handleSubmitEmail();
                      }
                    }}
                  >
                    Send OTP
                  </Button>
                </form>
              )}

              {showOtpInput && (
                <Box sx={{ marginTop: '10px' }}>
                  <Grid container spacing={2} justifyContent="center">
                    {[0, 1, 2, 3].map((index) => (
                      <Grid item key={index}>
                        <TextField
                          id={`otp-input-${index}`}
                          type="text"
                          variant="outlined"
                          size="small"
                          inputProps={{ maxLength: 1 }}
                          value={otp[index]}
                          onChange={(e) => handleChangeOtp(index, e.target.value)}
                          autoFocus={index === 0}
                          style={{
                            width: '40px',
                            height: '40px',
                            margin: '0 5px',
                            fontSize: '20px',
                            textAlign: 'center',
                            borderRadius: '5px',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    onClick={handleVerifyOtp}
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      bgcolor: 'rgb(13 121 173)',
                      '&:hover': { bgcolor: 'rgb(90 198 249 / 80%)' },
                    }}
                  >
                    Verify OTP
                  </Button>
                </Box>
              )}

              {showResetPasswordForm && (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        name="newPassword"
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="New Password"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={!!newPasswordError}
                        helperText={newPasswordError}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        name="confirmPassword"
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      bgcolor: 'rgb(13 121 173)',
                      '&:hover': { bgcolor: 'rgb(90 198 249 / 80%)' },
                    }}
                    onClick={() => {
                      if (validatePasswords()) {
                        handleResetPassword();
                      }
                    }}
                  >
                    Reset Password
                  </Button>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Forgotpassword;
