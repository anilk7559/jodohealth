
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../homecomponents/Header';
import Footer from '../homecomponents/Footer';
import { getData, storageKey } from '../constants/storage';
import { getMemberlist, makeSubscription } from '../redux/services/otherServices/Users';
import { Loader } from '../constants/Loader';

const MembersDetail = () => {
    const navigate = useNavigate();
    const [checksubscriptin, setchecksubscription] = useState("")
    const [showForm, setShowForm] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [loadingMembers, setLoadingMembers] = useState(false);

    const initialMemberData = {
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
    };

    const memberFormik = useFormik({
        initialValues: initialMemberData,
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
                .required('Required'),
            age: Yup.number()
                .typeError('Age must be a number')
                .positive('Age must be a positive number')
                .integer('Age must be an integer')
                .required('Required'),
            address: Yup.string().required('Required'),
            gender: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {

            const body = {
                membersData: Array.isArray(values) ? values : [values]  // Ensure it's always an array
            };

            const res = await makeSubscription(body)

            if (res.success == true) {
                toast.success('Member Added');
                setMembers([...members, values]);
                memberFormik.resetForm();
                setShowForm(false);
            } else {
                toast.error("something went wronge.please try again!")
            }
        },
    });

    useEffect(() => {
        getMemberList();
        const subscription = getData(storageKey.SUBSCRIPTION);
        setchecksubscription(subscription)
    }, []);

    const getMemberList = async () => {
        setLoadingMembers(true); // Show loader before making the API call
        try {
            const res = await getMemberlist();
            console.log(res, "i am memberlist new for live");

            if (res.success === true) {
                setMembers(res.response?.body?.findMembers);
            } else {
                toast.error('Failed to fetch member data.');
            }
        } catch (error) {
            console.error('Error fetching member data:', error);
            toast.error('An error occurred while fetching member data.');
        } finally {
            setLoadingMembers(false); // Hide loader after API call completes
        }
    };
    const handleAddMember = () => {

        if (checksubscriptin == "1") {
            toast.error('subscribe first');
        } else if (checksubscriptin == "0") {
            if (members.length < 4) {
                setShowForm(true);
            } else {
                toast.error('You can only add 4 members');
            }
        }

    };

    const handleBookNow = (member) => {
        console.log('Book Now clicked for member:', member);
        const data = getData(storageKey.USER_LOGIN);
        const subscription = getData(storageKey.SUBSCRIPTION);
        if (data === "User") {
            if (subscription === "1") {
                toast.error("Subscribe first");
                setTimeout(() => {
                    navigate("/user/subscription");
                }, 2000);

            } else if (subscription === "0") {
                navigate("/user/bookappointment", { state: { bookNowData: member } });
            }
            else {
                toast.error("Invalid subscription value");
            }
        } else {
            toast.error("Please login first");
        }
    };



    return (
        <>
            {loadingMembers && <Loader />}
            <Header />
            <div className="p-5">
                <div className="w-full mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-customcolor">Members</h1>
                        <button
                            type="button"
                            className="bg-customcolor text-white font-bold rounded-lg px-4 py-2"
                            onClick={handleAddMember}
                        >
                            Add Member
                        </button>
                    </div>

                    <div className={`grid  gap-4 lg:grid-cols-3  ${showForm ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1' : 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1'}`}>
                        {members.length === 0 ? (
                            <div className="bg-yellow-50 p-4 rounded-lg shadow-md border border-gray-300 mb-4 text-center " style={{ minHeight: '400px' }}>
                                <p className="text-gray-700">No member added by you. Please add a member.</p>
                            </div>
                        ) : (
                            members.map((member) => (
                                <div key={member.id} className={`bg-blue-50 p-4 rounded-lg shadow-md border border-gray-300 mb-4 ${showForm ? 'w-full' : ''}`}>
                                    <p className="font-bold text-lg mb-2">{member.name}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">Email:</span> {member.email}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">Phone:</span> {member.phone}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">Age:</span> {member.age}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">Gender:</span> {member.gender}</p>
                                    <p className="text-gray-700"><span className="font-medium">Address:</span> {member.address}</p>
                                    <div className='flex justify-end'>
                                        <button
                                            type="button"
                                            className="bg-customcolor text-white font-bold rounded-lg px-4 py-2"
                                            onClick={() => handleBookNow(member)}
                                        >
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}



                        {showForm && (
                            <div className="lg:col-span-1">
                                <form onSubmit={memberFormik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700">Name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={memberFormik.values.name}
                                                onChange={memberFormik.handleChange}
                                                className="border border-gray-300 px-3 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-customcolor"
                                            />
                                            {memberFormik.touched.name && memberFormik.errors.name ? (
                                                <div className="text-red-500 text-sm">{memberFormik.errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={memberFormik.values.email}
                                                onChange={memberFormik.handleChange}
                                                className="border border-gray-300 px-3 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-customcolor"
                                            />
                                            {memberFormik.touched.email && memberFormik.errors.email ? (
                                                <div className="text-red-500 text-sm">{memberFormik.errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-gray-700">Phone:</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={memberFormik.values.phone}
                                                onChange={memberFormik.handleChange}
                                                className="border border-gray-300 px-3 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-customcolor"
                                            />
                                            {memberFormik.touched.phone && memberFormik.errors.phone ? (
                                                <div className="text-red-500 text-sm">{memberFormik.errors.phone}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="age" className="block text-gray-700">Age:</label>
                                            <input
                                                type="number"
                                                id="age"
                                                name="age"
                                                value={memberFormik.values.age}
                                                onChange={memberFormik.handleChange}
                                                className="border border-gray-300 px-3 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-customcolor"
                                            />
                                            {memberFormik.touched.age && memberFormik.errors.age ? (
                                                <div className="text-red-500 text-sm">{memberFormik.errors.age}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="address" className="block text-gray-700">Address:</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={memberFormik.values.address}
                                                onChange={memberFormik.handleChange}
                                                className="border border-gray-300 px-3 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-customcolor"
                                            />
                                            {memberFormik.touched.address && memberFormik.errors.address ? (
                                                <div className="text-red-500 text-sm">{memberFormik.errors.address}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="gender" className="block text-gray-700">Gender:</label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={memberFormik.values.gender}
                                                onChange={memberFormik.handleChange}
                                                className="border border-gray-300 px-3 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-customcolor"
                                            >
                                                <option value="" label="Select gender" />
                                                <option value="male" label="Male" />
                                                <option value="female" label="Female" />
                                            </select>
                                            {memberFormik.touched.gender && memberFormik.errors.gender ? (
                                                <div className="text-red-500 text-sm">{memberFormik.errors.gender}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex justify-end">

                                        <button
                                            type="submit"
                                            className="bg-customcolor text-white font-bold rounded-lg px-4 py-2"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default MembersDetail;
