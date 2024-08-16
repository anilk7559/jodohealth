
  
import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { handlechangepassword } from '../redux/services/AuthService';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '16px',
    },
    textField: {
        marginBottom: '8px',
    },
    errorText: {
        color: 'red',
        marginBottom: '8px',
        fontSize: '0.75rem',
    },
    button: {
        backgroundColor:"rgb(13 121 173)",
        color:"white",
        marginTop: '16px',
    },
};

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Old Password is required'),
    newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});


function LabChangepassword() {

    
    const handleSubmit = async(values, { setSubmitting, resetForm }) => {
        const { oldPassword, newPassword } = values;
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        try {
            const res = await handlechangepassword(body)
            if (res.success === true) {
                toast.success('Password changed successful!');
                console.log(values);
                resetForm();
                setSubmitting(false);
            } else {
              toast.error(' Password changed  failed. Please check your passwords.');
            }
          } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
          }
    };

  return (
    <>

                  <div className="changepassword-main-div">
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body1" color="initial" style={{ fontSize: '2.0em', fontWeight: 'bold', color: "rgb(13 121 173)" }}>
                        Change Password
                    </Typography>
                </div>



                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
                        <Form style={styles.form}>
                            <TextField
                                id="oldPassword"
                                name="oldPassword"
                                type="password"
                                label="Old Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={values.oldPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.oldPassword && Boolean(errors.oldPassword)}
                                helperText={touched.oldPassword && errors.oldPassword}
                                style={styles.textField}
                            />
                            <TextField
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                label="New Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={values.newPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.newPassword && Boolean(errors.newPassword)}
                                helperText={touched.newPassword && errors.newPassword}
                                style={styles.textField}
                            />
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                style={styles.textField}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={styles.button}
                                disabled={isSubmitting}
                            >
                                Change Password
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
    </>
  )
}

export default LabChangepassword
