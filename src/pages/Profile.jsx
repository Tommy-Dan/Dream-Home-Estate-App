import React from 'react';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { async } from '@firebase/util';
import { GiHouseKeys } from 'react-icons/gi';




function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

// destructuring the data
  const {name, email} = formData;
  function onLogout(){
    auth.signOut();
    navigate("/");
  }
// onChange function to allow us make changes to the form data
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value, 
    }));
  }

// onSubmit function for submitting the data/changes
  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){

    // update the display name in the db auth
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
       // update name in the fireStore
       const docRef = doc(db, "users", auth.currentUser.uid)
       await updateDoc(docRef, {
        name,
       });
      }
      toast.success("Profile updated!")
    } catch (error) {
      toast.error("Couldn't update your profile details!")
    }
  }
  return (
    <>
     <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        My Profile
      </h1>
      <div className='w-full md:w-[40%] mt-6 px-3'>
        <form>
          <input type='text' id='name' value={name} 
                 disabled={!changeDetail}
                 onChange={onChange}
                 className={`w-full mb-6 px-4 py-2 text-xl text-gray-700
                 bg-white border border-gray-300 rounded 
                  transition ease-out ${
                  changeDetail && 'border-red-500'
                 }`}
          />
          <input type='email' id='email' value={email} 
                  disabled={!changeDetail} 
                  onChange={onChange}
                  className={`w-full mb-6 px-4 py-2 text-xl text-gray-700
                   bg-white border border-gray-300 rounded 
                    transition ease-out ${
                    changeDetail && 'border-red-500'
                  }`}
          />
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>Do you want to change your name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                  } 
                } 
                className='text-red-600 hover:text-red-700 transition ease-in-out
                duration-200 ml-1 cursor-pointer'
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 
               transition duration-200 ease-in-out cursor-pointer ml-4'
            >
              Sign out
            </p>
          </div>
        </form>
        <button type='submit' className='w-[60%] bg-blue-600 text-white uppercase ml-20
                      px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700
                      transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
        >
          <Link to="/create-card" className='flex justify-center items-center'>
            <GiHouseKeys  className='mr-2 text-3xl rounded-full p-1 border-2'/>
            For Sale or Rent
          </Link>
        </button>
      </div>
     </section>
    </>
  )
}

export default Profile;