import React from 'react';
import { storage } from '../Services/firebaseConnection';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfilePic } from '../reducers/profile';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { motion } from 'framer-motion';
import './SetProfilePic.css';

function SetProfilePic() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.value);

  const uploadFile = (profilePic) => {
    console.log('image', profilePic);
    if (profilePic == null) return;
    const imageRef = ref(storage, `profilePics/${profilePic.name + v4()}`);
    uploadBytes(imageRef, profilePic).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        dispatch(changeProfilePic(url));
      });
    });
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.1 }} className="action-button">
        <div className="image-upload">
          <label htmlFor="file-input">
            <img src={profile.profilePic} alt="profilePic" className="profile-dashboard-img" />
          </label>

          <input
            id="file-input"
            type="file"
            className="profilepic-input"
            onChange={(event) => {
              uploadFile(event.target.files[0]);
            }}
          />
        </div>
      </motion.button>
    </>
  );
}

export default SetProfilePic;
