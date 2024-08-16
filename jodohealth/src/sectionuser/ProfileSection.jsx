import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Header from '../homecomponents/Header';
import CloseIcon from '@mui/icons-material/Close';
import { getAccountDetails, updateAccountDetails } from '../redux/services/AuthService';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../homecomponents/Footer';
const ProfileSection = () => {
  const [profiledata, setProfileData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // State to manage form values
  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    address: '',
    gender: '',
  });

  // State to manage form errors
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    address: '',
    gender: '',
  });

  // State to manage which fields are editable
  const [editableFields, setEditableFields] = useState({
    fullName: true,
    phone: true,
    email: true,
    age: true,
    address: true,
    gender: true,
  });

  // Schema for validation
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .max(50, 'Must be 50 characters or less')
      .when('$editableFields', {
        is: { fullName: true },
        then: Yup.string().required('Required'),
        otherwise: Yup.string().notRequired(),
      }),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
      .when('$editableFields', {
        is: { phone: true },
        then: Yup.string().required('Required'),
        otherwise: Yup.string().notRequired(),
      }),
    email: Yup.string()
      .email('Invalid email address')
      .when('$editableFields', {
        is: { email: true },
        then: Yup.string().required('Required'),
        otherwise: Yup.string().notRequired(),
      }),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .when('$editableFields', {
        is: { age: true },
        then: Yup.number().required('Required'),
        otherwise: Yup.number().notRequired(),
      }),
    address: Yup.string().when('$editableFields', {
      is: { address: true },
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(),
    }),
    gender: Yup.string().when('$editableFields', {
      is: { gender: true },
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(),
    }),
  });
  

  useEffect(() => {
    handleGetProfileData();
  }, []);

  const handleGetProfileData = async () => {
    try {
      const res = await getAccountDetails();
      if (res.success === true) {
        const data = res.response.body || {};
        setProfileData(data);
        setImageUrl(data.avatar || '');
        // Set initial values for form fields
        setValues({
          fullName: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          age: data.age || '',
          address: data.fullAddress || '',
          gender: data.gender || '',
        });
        // Determine which fields should be editable based on initial data
        setEditableFields({
          fullName: !data.name, // Editable if name is blank
          phone: !data.phone, // Editable if phone is blank
          email: !data.email, // Editable if email is blank
          age: true, // Editable if age is blank
          address: true, // Always editable
          gender: !data.gender, // Editable if gender is blank
        });
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      // Handle error
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setImageUrl('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  console.log(values, "i am values");
      const formData = new FormData();
      formData.append('name', values.fullName);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('age', values.age);
      formData.append('fullAddress', values.address);
      formData.append('gender', values.gender);
      if (image) {
        formData.append('avatar', image);
      }
      const res = await updateAccountDetails(formData);
      if(res.success == true){
        toast.success('Profile update successful!');
      }else{
        toast.error('An error occurred. Please try again later.');
      }
  };

  return (
    <>
      <Header />
      <div className="flex md:flex-row h-full w-full overflow-hidden p-4">
        <div className="flex flex-col w-full md:w-[100%] justify-around">
          <div className="flex flex-col h-full">
            <div className="overflow-hidden h-full w-full">
              <div className="flex flex-col w-full h-full ">
                <div className="flex flex-col lg:flex-row w-full gap-4 justify-between">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full lg:w-[100%] max-h-full ">
                      <div className="h-full rounded-lg flex flex-col lg:flex-row border justify-evenly items-center p-[1.5rem] bg-custom-gradient border-customborder shadow-customshadow">
                        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                          <div className="flex flex-col justify-start items-center w-full lg:w-full">
                            <div className="w-full flex flex-col ">
                              <div className="flex justify-between">
                                <div className="detail-heading">
                                  <div className="main-user-heading">User Detail</div>
                                  <div className="sub-user-heading">
                                    Basic Info and personal details for better experience
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="input-container w-full">
                              <form className="user-form" onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-[10px]">
                                  <div className="input-detail-container">
                                    <div className="input-detail">
                                      <label htmlFor="fullName" className="input-detail-label">
                                        Full Name*
                                      </label>
                                      <input
                                        name="fullName"
                                        type="text"
                                        className="custom-input-profilesection"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        disabled={!editableFields.fullName}
                                      />
                                      {errors.fullName && <div className="error">{errors.fullName}</div>}
                                    </div>
                                    <div className="input-detail">
                                      <label htmlFor="phone" className="input-detail-label">
                                        Phone*
                                      </label>
                                      <input
                                        name="phone"
                                        type="text"
                                        className="custom-input-profilesection"
                                        value={values.phone}
                                        onChange={handleChange}
                                        disabled={!editableFields.phone}
                                      />
                                      {errors.phone && <div className="error">{errors.phone}</div>}
                                    </div>
                                  </div>
                                  <div className="input-detail-container">
                                    <div className="input-detail">
                                      <label htmlFor="email" className="input-detail-label">
                                        Email*
                                      </label>
                                      <input
                                        name="email"
                                        type="text"
                                        className="custom-input-profilesection"
                                        value={values.email}
                                        onChange={handleChange}
                                        disabled={!editableFields.email}
                                      />
                                      {errors.email && <div className="error">{errors.email}</div>}
                                    </div>
                                    <div className="input-detail">
                                      <label htmlFor="age" className="input-detail-label">
                                        Age*
                                      </label>
                                      <input
                                        name="age"
                                        type="text"
                                        className="custom-input-profilesection"
                                        value={values.age}
                                        onChange={handleChange}
                                        disabled={!editableFields.age}
                                      />
                                      {errors.age && <div className="error">{errors.age}</div>}
                                    </div>
                                  </div>
                                  <div className="input-detail-container">
                                    <div className="input-detail">
                                      <label htmlFor="address" className="input-detail-label">
                                        Address*
                                      </label>
                                      <input
                                        name="address"
                                        type="text"
                                        className="custom-input-profilesection"
                                        value={values.address}
                                        onChange={handleChange}
                                        disabled={!editableFields.address}
                                      />
                                      {errors.address && <div className="error">{errors.address}</div>}
                                    </div>
                                    <div className="input-detail">
                                      <label htmlFor="gender" className="input-detail-label">
                                        Gender*
                                      </label>
                                      <select
                                        name="gender"
                                        className="custom-input-profilesection"
                                        value={values.gender}
                                        onChange={handleChange}
                                        disabled={!editableFields.gender}
                                      >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                      </select>
                                      {errors.gender && <div className="error">{errors.gender}</div>}
                                    </div>
                                  </div>
                                  <div className="input-detail">
                                    {imageUrl && (
                                      <div className="preview-image-container">
                                        <img src={imageUrl} alt="Uploaded" className="preview-image" />
                                        <button
                                          type="button"
                                          className="clear-image-button"
                                          onClick={handleClearImage}
                                        >
                                          <CloseIcon />
                                        </button>
                                      </div>
                                    )}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                      className="image-input"
                                    />
                                  </div>
                                  <div className="button-container">
                                    <button type="submit" className="button-header">
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfileSection;
