import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import React from 'react'
 
 const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
    })
   return (
     <div>Profile</div>
   )
 }
 
 export default Profile