import React, { useState } from 'react';
import Logo from "../assets/Total - x.png";
import LabeledInput from './LabeledInput';
import Image from "../assets/login.png";
import { verifyOtp } from '../redux/loginSclice';
import { useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Verification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [opt, setOpt] = useState("");  // Correct variable name is 'opt'
  const { verificationId } = location.state || {};

  const { authError, loading } = useSelector(
    (state) => state.user
  );

  const verifyOtpCode = async () => { 
    console.log(verificationId)  
    if (opt !== "") {  
      dispatch(verifyOtp({ otp: opt, verificationId }))  
        .unwrap()
        .then(({ phone }) => {
          // console.log(phoneNumber);
          navigate('/home', { state: { userData:{phone} } });
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to send OTP. Please try again.");
        });
    } else {
      alert("Please enter a valid OTP");
    }
  };

  return (
    <div className='flex justify-around items-center'>
      <div className='h-screen flex flex-col justify-center gap-4 px-10 py-5'>
        <img src={Logo} alt="" className='size-20 mb-8' />
        <div className='font-semibold cursor-pointer my-3' onClick={() => navigate('/login')}>{`<`} back to login</div>
        <div className='flex flex-col gap-4 mx-6'>
          <p className='text-zinc-800 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.7)] text-3xl font-bold'>Verify code</p>
          <p className='text-zinc-500'>An authentication code has been sent to your email.</p>
        </div>
        <div className='relative w-full max-w-sm my-8'>
          <div className="flex flex-col gap-8">
            <LabeledInput 
              id="otp" 
              label="Enter code" 
              type="number" 
              className="col-span-2" 
              onChange={(e) => setOpt(e.target.value)} 
            />
          </div>
          <p className='text-center my-2'>Didn’t receive a code? <span className='text-red-400 cursor-pointer font-medium' onClick={() => navigate('/signup')}>Resend</span></p> 
          <div className="relative w-full max-w-md mx-auto">
            <div
              className="w-full text-center py-3 text-sm text-white bg-blue-600 font-medium rounded-sm"
              onClick={verifyOtpCode}
              disabled={loading}
            >
              {loading ? "Processing..." : "Verify OTP"}
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex justify-center'>
        <img src={Image} className='size-3/5' />
      </div>
    </div>
  );
}

export default Verification;
