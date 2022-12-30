import React from 'react';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Oauth from '../components/Oauth';
import {MdAccountCircle} from 'react-icons/md'


function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = formData;
  function onChange(e){
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80' alt='house'
               className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <div className='flex items-center justify-center'>
            <MdAccountCircle className='text-7xl rounded-full mb-2' />
          </div>
          <form>
            <label>Email</label>
            <input 
               className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white
                         border-gray-300 rounded transition ease-in-out' 
               type="email" 
               id="email" 
               value={email} 
               onChange={onChange} 
               placeholder="example@gmail.com" 
            />
            <div className='mb-6 relative'>
              <input 
                className='w-full px-4 py-2 text-xl text-gray-700
                         bg-white border-gray-300 rounded transition ease-in-out' 
                type={showPassword ? "text" : "password"}
                id="password" 
                value={password} 
                onChange={onChange}
                placeholder="Password"  
              />
              {showPassword ? (
                <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer'
                                    onClick={()=>setShowPassword((prevState)=> !prevState)} 
                />
              ): (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'
                             onClick={()=>setShowPassword((prevState)=> !prevState)} 
              />)}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to="/sign-up" className='text-blue-600 hover:text-blue-700
                                    transition duration-200 ease-in-out ml-2'>
                  Sign Up
                </Link>
              </p>
              <p>
                <Link to="/reset-password" className='text-red-600 hover:text-red-800
                                    transition duration-200 ease-in-out'>
                  Reset password?
                </Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm 
                             font-medium uppercase rounded shadow-md hover:bg-blue-700
                             transition duration-150 ease-in-out hover:shadow-lg
                            active:bg-blue-800' 
                  type='submit'>
            Sign in
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

export default SignIn;