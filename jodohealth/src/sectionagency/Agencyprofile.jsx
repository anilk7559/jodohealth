import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Clear } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { getAccountDetails, updateAccountDetails } from '../redux/services/AuthService';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AgencyProfile() {
  // State to hold agency profile data
  const [agencyData, setAgencyData] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  // State to manage form data for editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  // Fetch agency details on component mount
  useEffect(() => {
    getAgencyDetailsAndUpdateState();
  }, []);

  // Function to fetch agency details and update state
  const getAgencyDetailsAndUpdateState = async () => {
    try {
      const res = await getAccountDetails(); // Implement this function in your AgencyService
      console.log('Agency details:', res);
      if (res.success) {
        const { name, email, avatar } = res.response.body;
        setAgencyData({ name, email, avatar });
        setFormData({ name, email, avatar });
      } else {
        // Handle error if needed
        console.error('Failed to fetch agency details:', res.error);
      }
    } catch (error) {
      console.error('Error fetching agency details:', error);
    }
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to clear uploaded avatar
  const handleClearImage = () => {
    setFormData({
      ...formData,
      avatar: '',
    });
  };

  // Function to handle avatar upload
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        avatar: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, avatar } = formData;
      const formDataForUpdate = new FormData();
      formDataForUpdate.append('name', name);
      formDataForUpdate.append('email', email);
      if (avatar instanceof File) {
        formDataForUpdate.append('avatar', avatar);
      }

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
  };

  return (
    <>
      <div className="admin-profile">
        <div style={{ textAlign: 'center' }}>
          <Typography variant="body1" color="initial" style={{ fontSize: '2.0em', fontWeight: 'bold', color: 'rgb(13 121 173)' }}>
            Agency Profile
          </Typography>
        </div>

        <div className="admin-details">
          <div className="admin-avatar-container">
            {formData.avatar ? (
              <div>
                <img src={formData.avatar} alt="Agency" width={200} />

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
                  accept="avatar/*"
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

          {/* Form for name and email */}
          <form onSubmit={handleSubmit} className="admin-form">
            <TextField
              id="name"
              name="name"
              label="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />
            {/* Add more form fields as needed */}
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'rgb(13 121 173)', color: 'white', marginTop: '1rem' }}>
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgencyProfile;
