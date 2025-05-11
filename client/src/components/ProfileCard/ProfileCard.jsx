import { useState, useEffect } from 'react';
import './ProfileCard.css';
import axios from 'axios';


const ProfileCard = ({ profile, UserId }) => {
  const [deleteAccountStatus, setDeleteAccount] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccountTrue, setDeleteAccountTrue] = useState(false);
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  console.log("Profile Recieved:")
  console.log(profile)

  const deleteAccountToggle =  ( ()=> {
    console.log("Deleting Account")
    setDeleteAccount(true)
  });

  const deleteAccount = ( async() => {
    if(deleteAccountTrue === false){
      //prevent function accidently deleting account
      return 
    }
    console.log("Attemping Account Delete")

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No token found. Cannot delete account.');
      return;
    }

    try {
      // check if token is valid
      await axios.get('http://localhost:5000/api/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },});
      
      const response = await axios.post( 'http://localhost:5000/api/account/delete',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      console.log(response)

      if(response.data.deleted === true){
        console.log('Account Deleted');
        localStorage.removeItem('authToken')
        window.location.reload();
      }
    
    }catch (error) {
      console.log(error)
    }
    
    

  })

  if(deleteAccountStatus){
    return (
      <div className='profile-card Delete-Check'>
        <p>Are You Sure?</p>
        <button className='confirm-delete'
        onClick={() => {setDeleteAccountTrue(true); deleteAccount()}}
        >Confirm</button>
        <button className='cancel-delete'
        onClick={() => setDeleteAccount(false)}
        >Cancel</button>
      </div>
    )
  }

  if(changePassword){

    const changePasswordFunction = ( async() => {
      if(newPassword.length === 0){
        window.alert('Please Enter A Password')
      };
      if(newPassword === previousPassword){
        window.alert('New Password Must Be Different')
      }

      const token = localStorage.getItem('authToken')

      try {
      // check if token is valid
        await axios.get('http://localhost:5000/api/auth/verify-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },});
        
        const response = await axios.post( 'http://localhost:5000/api/account/change-password',
        {
          previous: previousPassword,
          new: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );

        console.log(response)

        if(response.data.changed === true){
          console.log('Password Changed');
          localStorage.removeItem('authToken')
          window.location.reload();
        }

        if(response.data.message === 'Existing Password Does Not Match'){
          window.alert('Previous Password Incorrect')
        }
      
      }catch (error) {
        console.log(error)
      }

    })

    return (
      <div className='profile-card Change-Password'>
        <p>Change Password</p>
        <div className='existing-password' >
          <input placeholder='existing password' type='password'
          value={previousPassword}
          onChange={(e) => setPreviousPassword(e.target.value)}
          ></input>
        </div>
        <div className='new-password'>
          <input placeholder='new password' type='password'
          value={newPassword}
          onChange={(e) => setnewPassword(e.target.value)}
          ></input>
        </div>
        <button className='change-password' onClick={changePasswordFunction}>Change</button>
        <button className='cancel-delete' onClick={() => setChangePassword(false)}>Cancel</button>
      </div>
    )
  }


  return (
    <div className="profile-card">
      <p>Account ID: {UserId}</p>
      <p>Name: {profile.firstName + " "+ profile.surname}</p>
      <p>Form: {profile.formName}</p>
      <p>Email: {profile.email}</p>
      <button className='delete-account' onClick={deleteAccountToggle} >Delete Account</button>
      <button className='change-password' onClick={ () => setChangePassword(true)}>Change Password</button>
    </div>
  );
}

export default ProfileCard