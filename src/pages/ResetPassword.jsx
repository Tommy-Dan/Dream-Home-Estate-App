import React from 'react';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Oauth from '../components/Oauth';
import {MdAccountCircle} from 'react-icons/md';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';


function ResetPassword() {
  const [email, setEmail] = useState("");

  function onChange(e){
    setEmail(e.target.value);
  }
  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    } catch (error) {
      toast.error("Couldn't send reset password!")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Password Reset</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://icon-library.com/images/reset-password-icon/reset-password-icon-29.jpg' alt='house'
               className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <div className='flex items-center justify-center'>
            <MdAccountCircle className='text-7xl rounded-full mb-2' />
          </div>
          <form onSubmit={onSubmit}>
            <label>Email</label>
            <input 
               className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white
                         border-gray-300 rounded transition ease-in-out' 
               type="email" 
               id="email" 
               value={email} 
               onChange={onChange} 
               placeholder="Email address" 
            />
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to="/sign-up" className='text-blue-600 hover:text-blue-700
                                    transition duration-200 ease-in-out ml-2'>
                  Sign Up
                </Link>
              </p>
              <p>
                <Link to="/sign-in" className='text-red-600 hover:text-red-800
                                    transition duration-200 ease-in-out'>
                  Sign in instead
                </Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm 
                             font-medium uppercase rounded shadow-md hover:bg-blue-700
                             transition duration-150 ease-in-out hover:shadow-lg
                            active:bg-blue-800' 
                  type='submit'>
            Reset Password
          </button>
          <div className='flex items-center my-4 before:border-t before:flex-1 
                         before:border-gray-300 
                         after:border-t  after:flex-1 
                         after:border-gray-300'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <Oauth />
          </form>

        </div>
      </div>
     
    </section>
  )
}

export default ResetPassword;