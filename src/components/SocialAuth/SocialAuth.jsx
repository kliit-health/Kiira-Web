import React from 'react';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as AppleIcon } from 'src/assets/icons/apple.svg';
import { Button } from '@material-tailwind/react';

const SocialAuth = () => {
  return (
    <>
      <div className="flex flex-row justify-center w-full gap-5">
        {/* <Button
          variant="text"
          className="w-full h-48 max-h-[48px] border border-kiiraBlue rounded-xl flex items-center justify-center">
          <FacebookIcon />
        </Button> */}
        <Button
          variant="text"
          className="relative w-full h-48 max-h-[48px] max-w-xs  border border-kiiraBlue/30 rounded-full shadow-md  flex items-center justify-center">
          <GoogleIcon className='absolute left-5' /> <span>Continue with Google</span>
        </Button>
        {/* <Button
          variant="text"
          className="w-full h-48 max-h-[48px] border border-kiiraBlue rounded-xl flex items-center justify-center">
          <AppleIcon />
        </Button> */}
      </div>
    </>
  );
};

export default SocialAuth;
