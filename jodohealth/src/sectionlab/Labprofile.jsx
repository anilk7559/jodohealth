

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Clear } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { getAccountDetails, updateAccountDetails } from '../redux/services/AuthService';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  fullAddress: Yup.string().required('Full Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone Number is required'),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, 'Invalid pincode')
    .required('Pincode is required'),
  latitude: Yup.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .required('Latitude is required'),
  longitude: Yup.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
    .required('Longitude is required'),
});

function Labprofile() {
  // Formik hook for managing form state and validation
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      avatar: '',
      fullAddress: '',
      city: '',
      state: '',
      phone: '',
      pincode: '',
      latitude: '',
      longitude: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formDataForUpdate = new FormData();
        formDataForUpdate.append('name', values.name);
        formDataForUpdate.append('email', values.email);
        if (values.avatar && values.avatar instanceof File && values.avatar.type.startsWith('image/')) {
          formDataForUpdate.append('avatar', values.avatar);
        }
        formDataForUpdate.append('fullAddress', values.fullAddress);
        formDataForUpdate.append('city', values.city);
        formDataForUpdate.append('state', values.state);
        formDataForUpdate.append('phone', values.phone);
        formDataForUpdate.append('pincode', values.pincode);
        formDataForUpdate.append('latitude', values.latitude);
        formDataForUpdate.append('longitude', values.longitude);

        const res = await updateAccountDetails(formDataForUpdate);
        console.log('Update response:', res);
        if (res.success ==true){
          toast.success('Profile update successful!');
        }else{
          toast.error('An error occurred. Please try again later.');
        }
      } catch (error) {
        console.error('Error updating agency profile:', error);
      }
    },
  });

  // Fetch agency details on component mount
  useEffect(() => {
    getAgencyDetailsAndUpdateState();
  }, []);

  // Function to fetch agency details and update formik values
  const getAgencyDetailsAndUpdateState = async () => {
    try {
      const res = await getAccountDetails(); // Implement this function in your AgencyService
      console.log('Agency details:', res);
      if (res.success) {
        const { name, email, avatar, fullAddress, city, state, phone, pincode, latitude, longitude } = res.response.body;
        formik.setValues({
          name,
          email,
          avatar,
          fullAddress,
          city,
          state,
          phone,
          pincode,
          latitude,
          longitude
        });
      } else {

        console.error('Failed to fetch agency details:', res.error);
      }
    } catch (error) {
      console.error('Error fetching agency details:', error);
    }
  };

  // Function to handle avatar upload
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('avatar', file);
  };

  // Function to clear uploaded avatar
  const handleClearImage = () => {
    formik.setFieldValue('avatar', '');
  };

  return (
    <>
      <div className="admin-profile">
        <div style={{ textAlign: 'center' }}>
          <Typography variant="body1" color="initial" style={{ fontSize: '2.0em', fontWeight: 'bold', color: 'rgb(13 121 173)' }}>
            LAB Profile
          </Typography>
        </div>

        <div className="admin-details">
          <div className="admin-avatar-container">
            {formik.values.avatar ? (
              <div>
                <img src={formik.values.avatar instanceof File ? URL.createObjectURL(formik.values.avatar) : formik.values.avatar} alt="Agency" width={200} />

                <Button
                  className="clear-button"
                  onClick={handleClearImage}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<Clear />}
                  style={{ position: 'relative', top: 0, right: 0, border: '1px solid #adaaaa', color: '#adaaaa' }}
                >
                  Clear
                </Button>
              </div>
            ) : (
              <label htmlFor="upload-button" className="upload-label">
                <input
                  accept="image/*"
                  id="upload-button"
                  type="file"
                  onChange={handleUploadImage}
                  style={{ display: 'none' }}
                />
                <Button
                  className="upload-button"
                  variant="contained"
                  component="span"
                  sx={{ backgroundColor: 'rgb(13 121 173)', color: 'white' }}
                >
                  Upload
                </Button>
              </label>
            )}
          </div>

          {/* Form for name, email, and other fields */}
          <form onSubmit={formik.handleSubmit} className="admin-form">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}

                /></Grid>

              <Grid item xs={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}

                /></Grid>

              <Grid item xs={6}>
                <TextField
                  id="fullAddress"
                  name="fullAddress"
                  label="Full Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.fullAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.fullAddress && Boolean(formik.errors.fullAddress)}
                  helperText={formik.touched.fullAddress && formik.errors.fullAddress}
                /></Grid>

              <Grid item xs={6}>
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                /></Grid>

              <Grid item xs={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                /></Grid>

              <Grid item xs={6}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                /></Grid>

              <Grid item xs={6}>
                <TextField
                  id="pincode"
                  name="pincode"
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                /></Grid>

              <Grid item xs={6}>
                <TextField
                  id="latitude"
                  name="latitude"
                  label="Latitude"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                  helperText={formik.touched.latitude && formik.errors.latitude}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="longitude"
                  name="longitude"
                  label="Longitude"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                  helperText={formik.touched.longitude && formik.errors.longitude}
                />
              </Grid>

            </Grid>
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'rgb(13 121 173)', color: 'white', marginTop: '1rem' }}>
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Labprofile;
