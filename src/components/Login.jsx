import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../assets/Total - x.png";
import LabeledInput from './LabeledInput';
import Image from "../assets/login.png";
import { sendOtp } from '../redux/loginSclice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const handleSendOtp = async () => {
    dispatch(sendOtp(phone))
      .unwrap()
      .then(({ verificationId }) => {
        navigate('/verify', { state: { verificationId } });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='flex justify-around items-center'>
      <div className=' w-1/2 h-screen flex flex-col  gap-4 px-10 py-5 '>
        <img src={Logo} alt="" className='size-20 mb-8' />
        <div className='flex flex-col gap-4 mx-6'>
          <p className='text-zinc-800 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.7)] text-3xl font-bold'>Login</p>
          <p className='text-zinc-500 [text-shadow:_0_1px_10px_rgb(0_0_0_/_0.7)] '> Login to access your travelwise  account</p>
        </div>
        <div className='relative w-full max-w-sm my-8'>
          <div className=" flex flex-col gap-8">
            <LabeledInput id="mobile number" label=" Enter mobile number" type="tel" className="col-span-2" onChange={(e) => setPhone(e.target.value)} />
            <div id="recaptcha-container"></div>
            <div
              className="relative w-full max-w-md mx-auto"
            >
              <div
                className="w-full text-center py-3 text-sm text-white  bg-blue-600 font-medium rounded-sm "
                onClick={handleSendOtp}
              >
                Get OTP
              </div>
            </div>
          </div>
          <p className='text-center my-2'>Don’t have an account? <span className='text-red-400 cursor-pointer font-medium' onClick={() => navigate('/signup')}>Sign up</span></p>
        </div>
      </div>
      <div className='flex justify-center'>
        <img src={Image} className='size-3/5' />
      </div>
    </div>
  )
}

export default Login;
