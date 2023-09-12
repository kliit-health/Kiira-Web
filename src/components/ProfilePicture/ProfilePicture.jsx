import { Avatar } from '@material-tailwind/react';
import { string } from 'prop-types';
import React from 'react';
import { IMAGES } from 'src/data';
import useAuth from 'src/hooks/useAuth';

const ProfilePicture = ({ imgSrc, size, className }) => {
  const { user } = useAuth();
  return (
    <Avatar
      src={imgSrc || user?.profile_pic_url || IMAGES.dummyProfilePhoto}
      alt={user?.lastName}
      variant="circular"
      size={size}
      className={`rounded-full bg-kiiraText/50 ${className}`}
    />
  );
};

export default ProfilePicture;

ProfilePicture.propTypes = {
  imgSrc: string,
  size: string,
  className: string
};

ProfilePicture.defaultPropTypes = {
  imgSrc: '',
  size: 'sm',
  className: ''
};
