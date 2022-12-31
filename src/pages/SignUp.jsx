import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Oauth from '../components/Oauth';
import {GoPerson} from 'react-icons/go';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {name, email, password} = formData;
  const navigate = useNavigate();

  function onChange(e){
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  async function onSubmit(e){
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // toast.success("Sign up was successful");
      // navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the signing up!");
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
        <div className='md:w-[67%] lg:w-[50%]'>
          <img src='https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png' alt='house'
               className='w-full rounded-2xl bg-transparent'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <div className='flex items-center justify-center'>
            <GoPerson className='text-7xl rounded-full mb-2' />
          </div>
          <form onSubmit={onSubmit}>
          <label>Name</label>
            <input 
               className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white
                         border-gray-300 rounded transition ease-in-out' 
               type="text" 
               id="name" 
               value={name} 
               onChange={onChange} 
               placeholder="Full name" 
            />
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
              <p className='mb-6'>Have an account?
                <Link to="/sign-in" className='text-blue-600 hover:text-blue-700
                                    transition duration-200 ease-in-out ml-2'>
                  Sign In
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
            Sign up
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

export default SignUp;