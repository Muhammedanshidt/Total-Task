import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/Total - x.png";
import Image from "../assets/signup.svg";
import LabeledInput from './LabeledInput';
import { setFirstName, setLastName, setEmail, setPhone, createUser } from '../redux/userSclice';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { firstName, lastName, email, phone } = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleCreateAccount = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!firstName) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid Email is required';
      isValid = false;
    }

    if (!phone || !/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Valid Mobile number is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;
    const userData = { firstName, lastName, email, phone };
    dispatch(createUser(userData))
      .unwrap()
      .then((result) => {
        console.log("User created:", result);
        navigate('/home', { state: { userId: result.id, userData: result } });
      })
      .catch((error) => {
        console.error("Failed to create user:", error);
      });
  };

  return (
    <div className='flex justify-around'>
      <div className=' hidden lg:block my-10'>
        <img src={Image} className='w-80' />
      </div>

      <div className="h-screen flex flex-col items-end gap-4 p-10 mr-10">
        <img src={Logo} alt="Logo" className="size-20 mb-8" />

        <div className="relative w-full max-w-md flex flex-col gap-5">
          <div className="flex flex-col gap-4 mb-4">
            <p className="text-zinc-800 text-3xl font-bold">Sign up</p>
            <p className="text-zinc-500">
              Let’s get you all set up so you can access your personal account.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <div className="col-span-1 lg:col-span-3">
              {errors.firstName && (
                <p className="text-red-500 text-sm mb-1">{errors.firstName}</p>
              )}
              <LabeledInput
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => dispatch(setFirstName(e.target.value))}
                required
              />
            </div>

            <div className="col-span-1 lg:col-span-3">
              {errors.lastName && (
                <p className="text-red-500 text-sm mb-1">{errors.lastName}</p>
              )}
              <LabeledInput
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => dispatch(setLastName(e.target.value))}
                required
              />
            </div>

            <div className="col-span-1 lg:col-span-4">
              {errors.email && (
                <p className="text-red-500 text-sm mb-1">{errors.email}</p>
              )}
              <LabeledInput
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                required
              />
            </div>

            <div className="col-span-1 lg:col-span-2">
              {errors.phone && (
                <p className="text-red-500 text-sm mb-1">{errors.phone}</p>
              )}
              <LabeledInput
                id="mobile"
                label="Mobile"
                value={phone}
                onChange={(e) => dispatch(setPhone(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              className="w-4 h-4 text-red-500 border-2 border-black rounded cursor-pointer"
            />
            <p className="text-center text-sm">
              I agree to all the{" "}
              <span className="text-red-400 cursor-pointer font-medium">Terms</span> and{" "}
              <span className="text-red-400 cursor-pointer font-medium">
                Privacy Policies
              </span>
            </p>
          </div>

          <button
            className="w-full py-3 text-sm text-white bg-blue-600 font-medium rounded-sm"
            onClick={handleCreateAccount}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="text-center my-2 text-sm font-medium">
            Already have an account?{" "}
            <span
              className="text-red-400 cursor-pointer font-medium"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
