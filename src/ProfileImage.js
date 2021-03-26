import React, { useRef, useState } from 'react';
import { uploadImage } from './firebase/user';

export const ProfileImage = ({ id }) => {
    const fileInput = useRef(null);
    const [imageUrl, setImageUrl] = useState('');

    const fileChange = async (files) => {
        // console.log(files);
        const ref = await uploadImage(id, files[0]);
        const downloadUrl = await ref.getDownloadURL();
        setImageUrl(downloadUrl);
    }

    return (
        <div className="four wide column profile-image">
            <img className="ui image" src={ imageUrl || '/profile-placeholder.png' } alt="profile"/>
            <input className="file-input" 
                    type="file" 
                    accept=".png,.jpg" 
                    ref={fileInput}
                    onChange={(e) => fileChange(e.target.files)} />
            <button className="ui grey button upload-button" onClick={() => fileInput.current.click()}>Upload Photo</button>
        </div>
    );
}