
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Clear } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { getAccountDetails, updateAccountDetails } from '../redux/services/AuthService';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminProfile() {
  const [adminData, setAdminData] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    getAccountDetailsAndUpdateState();
  }, []);

  const getAccountDetailsAndUpdateState = async () => {
    try {
      const res = await getAccountDetails();
      console.log('Account details:', res);
      if (res.success) {
        const { name, email, avatar } = res.response.body;
        setAdminData({ name, email, avatar });
        setFormData({ username: name, email, image: avatar });
      } else {
        // Handle error if needed
        console.error('Failed to fetch account details:', res.error);
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearImage = () => {
    setFormData({
      ...formData,
      image: '',
    });
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, image } = formData;
      const formDataForUpdate = new FormData();
      formDataForUpdate.append('name', username);
      formDataForUpdate.append('email', email);
      if (image instanceof File) {
        formDataForUpdate.append('avatar', image);
      }

      const res = await updateAccountDetails(formDataForUpdate);
      if (res.success ==true){
        toast.success('Profile update successful!');
      }else{
        toast.error('An error occurred. Please try again later.');
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  return (
    <>
      <div className="admin-profile">
        <div style={{ textAlign: 'center' }}>
          <Typography variant="body1" color="initial" style={{ fontSize: '2.0em', fontWeight: 'bold', color: 'rgb(13 121 173)' }}>
            My Profile
          </Typography>
        </div>

        <div className="admin-details">
          <div className="admin-image-container">
            {formData.image ? (
              <div>
                <img src={formData.image} alt="Admin" width={200} />
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

          {/* Form for username and email */}
          <form onSubmit={handleSubmit} className="admin-form">
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
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

export default AdminProfile;
