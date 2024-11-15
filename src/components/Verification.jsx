import React from 'react'
import Logo from "../assets/Total - x.png"
import LabeledInput from './LabeledInput';
import Image from "../assets/login.png";

function Verification() {
  return (
    <div className='flex justify-around items-center'>
 <div className=' w-1/2 h-screen flex flex-col  gap-4 px-10 py-5 '>

 <img src={Logo} alt="" className='size-20 mb-8' />
 <div className='flex flex-col gap-4 mx-6'>
 <p className='text-zinc-800 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.7)] text-3xl font-bold'>Verify code</p>
 <p className='text-zinc-500  '> An authentication code has been sent to your email.</p>
 </div>
 <div className='relative w-full max-w-sm my-8'>
   <div className=" flex flex-col gap-8">
      <LabeledInput id="mobile number"  label=" Enter code" type="number" className="col-span-2" />

   </div>
   <p className='text-center my-2'>Didn’t receive a code?  <span className='text-red-400 cursor-pointer font-medium' onClick={()=> navigate('/signup')}>Resend</span></p> 
   <div
     className="relative w-full max-w-md mx-auto"
   >
     <div
       className="w-full text-center py-3 text-sm text-white  bg-blue-600 font-medium rounded-sm "
     >
       Verify
     </div>
   </div>
   </div>

</div>
<div className='flex justify-center'>
        <img src={Image} className='size-3/5' />
      </div>
    </div>
  )
}

export default Verification