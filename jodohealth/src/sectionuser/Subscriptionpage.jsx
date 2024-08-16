import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getData, storageKey, storeData } from '../constants/storage';
import Header from '../homecomponents/Header';
import Footer from '../homecomponents/Footer';
import { Typography } from '@mui/material';
import { makeSubscription } from '../redux/services/otherServices/Users';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Subscriptionpage() {
    const navigate = useNavigate();
    const [phonenumber, setPhonenumber] = useState("");
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [users, setUsers] = useState([]);
    const [isOpentermandcondition, setIsOpentermandcondition] = useState(true);

    // Formik for Member details
    const memberFormik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            age: '',
            address: '', // Optional field
            gender: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            age: Yup.number()
                .typeError('Age must be a number')
                .positive('Age must be a positive number')
                .integer('Age must be an integer')
                .required('Required'),
            gender: Yup.string()
                .required('Required'),
        }),
        onSubmit: (values) => {
            if (selectedUserIndex !== null) {
                const updatedUsers = [...users];
                updatedUsers[selectedUserIndex] = { ...values };
                setUsers(updatedUsers);
                setSelectedUserIndex(null);
            } else {
                if (users.length < 4) {
                    setUsers([...users, values]);
                } else {
                    alert('You can only add up to 4 members.');
                }
            }
            memberFormik.resetForm();
        },
    });

    useEffect(() => {
        const userdata = getData(storageKey.USER_PHONE);
        setPhonenumber(userdata);
    }, []);

    const handlePayment = async () => {
        if (users.length === 0) {
            toast.error("Please add at least one member before subscribing.");
            return;
        }
        try {
            const orderResponse = await axios.post('https://razorepay.onrender.com/order', {
                amount: 999*100, 
                currency: 'INR'
            });
    
            const { id} = orderResponse.data.orderLink;
            console.log(orderResponse, "order response");
            const options = {
                key: 'rzp_test_wGm93ljkuSPi5M',
                amount: 999*100, 
                currency: "INR",
                name: 'Jodo Health',
                description: 'Subscription Payment',
                order_id: id, 
                handler: async function (response) {
                    console.log('Payment Response:', response);
                    if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
                        toast.error("Incomplete payment response. Please try again.");
                        return;
                    }
    
                    const verifyBody = {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    try {
                        const verifyResponse = await axios.post('https://razorepay.onrender.com/verify', verifyBody);
                        if (verifyResponse.status === 200) {
                         toast.success("payment successfully ")
                          const body = {
                            membersData: users
                          };
                      
                            const res = await makeSubscription(body);
                            if (res.success === true) {
                                console.log(res, "i am response");
                                toast.success("Success! You're now subscribed.");
                                navigate("/user/members");
                                storeData(storageKey.SUBSCRIPTION, "0");
                            } else {
                                toast.error("Subscription failed. Please try again.");
                            }
                        } else {
                            toast.error("Payment verification failed. Please try again.");
                        }
                    } catch (error) {
                        console.error('Error while verifying payment:', error);
                        toast.error("Error while verifying payment. Please try again.");
                    }
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    contact: phonenumber
                },
                theme: {
                    color: '#F37254'
                }
            };
    
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error while creating order:', error);
            toast.error("Error while creating order. Please try again.");
        }
    };
    

    const handleEditUser = (index) => {
        memberFormik.setValues(users[index]);
        setSelectedUserIndex(index);
    };

    const handleClearUser = (index) => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    };

    const handleAgree = () => {
        setIsOpentermandcondition(false);
        console.log('User agreed to the terms and conditions');
    };

    return (
        <div>
            <Header />
            <div className="benefit-card">
                <div className="benefit-subcard flex flex-col">
                    <div>
                        <div className="sub-user-heading p-3 m-2" style={{ background: "#f3f3f3" }}>
                            <strong>Add up to 4 members only</strong> <strong style={{ color: "red", marginLeft: "5%" }}>Note:</strong> please add information carefully as it will not be editable in the future
                        </div>
                        <div className="left-section">
                            <div className="user-detail-container">
                                <div className="custom-detail">
                                    <div className="detail-heading">
                                        <div className="main-user-heading">Member Details</div>
                                    </div>
                                    <div className="input-container">
                                        <form className="user-form" onSubmit={memberFormik.handleSubmit}>
                                            <div className='flex flex-col w-full gap-[10px]'>
                                                <div className="input-detail-container">
                                                    <div className="input-detail">
                                                        <label htmlFor="name" className="input-detail-label">Full Name*</label>
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            className="custom-input"
                                                            value={memberFormik.values.name}
                                                            onChange={memberFormik.handleChange}
                                                            onBlur={memberFormik.handleBlur}
                                                        />
                                                        {memberFormik.touched.name && memberFormik.errors.name ? (
                                                            <div className="error">{memberFormik.errors.name}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className="input-detail">
                                                        <label htmlFor="phone" className="input-detail-label">Phone*</label>
                                                        <input
                                                            name="phone"
                                                            type="text"
                                                            className="custom-input"
                                                            value={memberFormik.values.phone}
                                                            onChange={memberFormik.handleChange}
                                                            onBlur={memberFormik.handleBlur}
                                                        />
                                                        {memberFormik.touched.phone && memberFormik.errors.phone ? (
                                                            <div className="error">{memberFormik.errors.phone}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="input-detail-container">
                                                    <div className="input-detail">
                                                        <label htmlFor="email" className="input-detail-label">Email*</label>
                                                        <input
                                                            name="email"
                                                            type="text"
                                                            className="custom-input"
                                                            value={memberFormik.values.email}
                                                            onChange={memberFormik.handleChange}
                                                            onBlur={memberFormik.handleBlur}
                                                        />
                                                        {memberFormik.touched.email && memberFormik.errors.email ? (
                                                            <div className="error">{memberFormik.errors.email}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className="input-detail">
                                                        <label htmlFor="age" className="input-detail-label">Age*</label>
                                                        <input
                                                            name="age"
                                                            type="text"
                                                            className="custom-input"
                                                            value={memberFormik.values.age}
                                                            onChange={memberFormik.handleChange}
                                                            onBlur={memberFormik.handleBlur}
                                                        />
                                                        {memberFormik.touched.age && memberFormik.errors.age ? (
                                                            <div className="error">{memberFormik.errors.age}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="input-detail-container">
                                                    <div className="input-detail">
                                                        <label htmlFor="address" className="input-detail-label">Address</label>
                                                        <input
                                                            name="address"
                                                            type="text"
                                                            className="custom-input"
                                                            value={memberFormik.values.address}
                                                            onChange={memberFormik.handleChange}
                                                            onBlur={memberFormik.handleBlur}
                                                        />
                                                        {memberFormik.touched.address && memberFormik.errors.address ? (
                                                            <div className="error">{memberFormik.errors.address}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className="input-detail">
                                                        <label htmlFor="gender" className="input-detail-label">Gender*</label>
                                                        <select
                                                            name="gender"
                                                            className="custom-input"
                                                            value={memberFormik.values.gender}
                                                            onChange={memberFormik.handleChange}
                                                            onBlur={memberFormik.handleBlur}
                                                        >
                                                            <option value="" label="Select" />
                                                            <option value="male" label="Male" />
                                                            <option value="female" label="Female" />
                                                            <option value="other" label="Other" />
                                                        </select>
                                                        {memberFormik.touched.gender && memberFormik.errors.gender ? (
                                                            <div className="error">{memberFormik.errors.gender}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="button-container">
                                                    <button type="submit" className="button-header">ADD MEMBER</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-user-container">
                        <div className="add-user">
                            <div className="main-user-heading">View/Edit Members Here!</div>
                            <div className="flex add-user justify-between">
                                <div className="show-user-container">
                                    {users.map((user, index) => (
                                        <div className="show-user" key={index} onClick={() => handleEditUser(index)}>
                                            <Typography variant="body1">{user.name}</Typography>
                                            <button onClick={() => handleClearUser(index)} className="remove-button" >Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={handlePayment} className="button-header">SUBSCRIBE NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Subscriptionpage;
