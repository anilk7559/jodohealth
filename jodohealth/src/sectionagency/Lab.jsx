
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Loader } from '../constants/Loader';
import { ChangeLabsAccountpassword, CreateLabsAccount, DeleteLabsAccountpassword, GetOneLabsAccount, Getlablists, UpdateLabsAccount } from '../redux/services/otherServices/Lab';
import { BASE_URL } from '../constants/urls';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  discount: Yup.string().required('Discount is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Lab = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [totalaccounts, settotalaccounts] = useState("0");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [editableLab, setEditableLab] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [pdf, setPdf] = useState(null); // New state for PDF
  const handleSearchInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    handleGetAgencyData(page, newQuery);
  };
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdf(file);
    }
  };
  const handleChangePassword = async () => {
    if (!newPassword) {
      setError('Password is required.');
      return;
    }
    const body = {
      newPassword: newPassword
    }
    setLoading(true); // Start loading
    try {
      const res = await ChangeLabsAccountpassword(body, idToUpdate);
      if (res.success == true) {
        toast.success('Password changed successful!');
        setOpenDialog2(false)
      } else {
        toast.error('Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError('');
  };

  const handleopenchangepassword = () => {
    setOpenDialog(false);
    setOpenDialog2(true);
  };

  const handleclodesetOpenDialog2 = () => {
    setOpenDialog2(false);
  };

  useEffect(() => {
    handleGetAgencyData(page, query);
  }, [page, query]);

  const handleGetAgencyData = async (page, query) => {
    setLoading(true);
    try {
      const res = await Getlablists(page, query);
      console.log(res, "search response");
      if (res.success === true) {
        setData(res?.response?.body?.findLab);
        settotalaccounts(res.response?.body?.totalCount);
      } else {
        console.error(res.error || 'Failed to fetch agency data:');
      }
    } catch (error) {
      console.error('Error fetching agency data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEdit = async (id) => {
    setLoading(true); // Start loading
    const res = await GetOneLabsAccount(id);
    setIdToUpdate(id);
    if (res.success == true) {
      setEditableLab({
        ...res.response.body,
        password: '',
      });
      setAvatar(BASE_URL + res?.response?.body?.avatar);
      setOpenDialog(true);

    } else {
    }
    setLoading(false); // Stop loading
  };

  const handleDelete = async (id) => {
    const res = await DeleteLabsAccountpassword(id);
    if (res.success == true) {
      toast.success("Delete  Account Sucessfully")
      handleGetAgencyData(page, query);
    } else {
      toast.error("Delete  Account Failed")
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditableLab(null);
    setAvatar(null);
    setIdToUpdate('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleClearImage = () => {
    setAvatar(null);
  };

  const handleSubmit = async (values) => {
    console.log('discount ', values.discount);
    setLoading(true); // Start loading
    const formData = new FormData();
    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }
    if (pdf instanceof File) {
      formData.append('lab_info_pdf', pdf);
    }
    formData.append('user_name', values.username);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('discount', values.discount);

    let res;
    try {
      if (editableLab) {
        res = await UpdateLabsAccount(formData, idToUpdate);
        if (res.success === true) {
          toast.success('Lab updated successfully!');
          handleCloseDialog();

        } else {
          toast.error(res.error || 'Failed to update lab:');
        }
      } else {
        formData.append('password', values.password);

        res = await CreateLabsAccount(formData);
        if (res.success === true) {
          handleCloseDialog();
          toast.success('Lab created successfully.');

        } else {
          toast.error(res.error || 'Failed to create lab.');
        }
      }
      handleGetAgencyData(page, query);
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>

      {loading && <Loader />}

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={query}
            onChange={handleSearchInputChange}
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <SearchIcon />
                </IconButton>
              ),
              style: { paddingRight: 0 } // Remove right padding of input field
            }}
            style={{ width: '300px' }}
          />
          <button className='create-agency-button' onClick={() => setOpenDialog(true)}>Create  Lab</button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Discount</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.avatar && (
                      <img
                        src={BASE_URL + row.avatar}
                        alt="avatar"
                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.user_name}</TableCell>
                  <TableCell>{row.discount}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row.id)} size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)} size="small" color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalaccounts} // Replace with total count of items from API if available
          rowsPerPage={10} // Adjust as per your pagination needs
          page={page}
          onPageChange={(e, newPage) => {
            setPage(newPage);
            handleGetAgencyData(newPage, query);
          }}
        />
        <Dialog open={openDialog2} onClose={handleclodesetOpenDialog2} aria-labelledby="form-dialog-title">
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="new-password"
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={handlePasswordChange}
              error={!!error}
              helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleclodesetOpenDialog2} color="primary" variant="contained">
              Close
            </Button>
            <Button onClick={handleChangePassword} color="primary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{editableLab ? 'Edit Lab' : 'Create Lab'}</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                name: editableLab ? editableLab.name : '',
                username: editableLab ? editableLab.user_name : '',
                email: editableLab ? editableLab.email : '',
                password: editableLab ? editableLab.password : '',
                discount: editableLab ? editableLab.discount : '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  {avatar ? (
                    <div style={{ marginBottom: '10px', position: 'relative' }}>
                      <img
                        src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)}
                        alt="Uploaded"
                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '5px' }}
                      />
                      <IconButton
                        onClick={handleClearImage}
                        size="small"
                        style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'white' }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <Button variant="outlined" component="label">
                      Upload Image
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </Button>
                  )}

                  {/* Name */}
                  <Field
                    as={TextField}
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <Field
                    as={TextField}
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    margin="dense"
                    id="discount"
                    name="discount"
                    label="Discount"
                    fullWidth
                    variant="outlined"
                    value={values.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.discount && Boolean(errors.discount)}
                    helperText={touched.discount && errors.discount}
                  />
                  {!editableLab && (
                    <Field
                      as={TextField}
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  )}
                  <Box marginTop={2}>
                    <Typography>Upload Tests</Typography>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handlePdfUpload(e)}
                    />
                    {pdf && <p>{pdf.name}</p>}
                  </Box>


                  <Box display="flex" justifyContent="space-between" marginTop="10px">
                    <Box>
                      {editableLab && (
                        <Button onClick={handleopenchangepassword} color="primary" variant="contained">
                          Change Password
                        </Button>
                      )}
                    </Box>
                    <Box>
                      <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                      </Button>
                      <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                        {editableLab ? 'Update' : 'Create'}
                      </Button>
                    </Box>
                  </Box>


                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>

  );
};

export default Lab;




