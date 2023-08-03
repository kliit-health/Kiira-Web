import React from 'react';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as AppleIcon } from 'src/assets/icons/apple.svg';
import { Button } from '@material-tailwind/react';
import { GoogleLogin } from '@react-oauth/google';
import { func } from 'prop-types';

const SocialAuth = ({ onGoogleAuthSuccess, onGoogleAuthFailed }) => {
  return (
    <>
      <div className="flex flex-row justify-center w-full gap-5">
        {/* <Button
          variant="text"
          className="w-full h-48 max-h-[48px] border border-kiiraBlue rounded-xl flex items-center justify-center">
          <FacebookIcon />
        </Button> */}
        <GoogleLogin
          text="continue_with"
          shape="pill"
          logo_alignment="left"
          theme="filled_blue"
          onSuccess={(credentialResponse) => {
            console.log(
              '\n 🚀 ~ file: SocialAuth.jsx:23 ~ SocialAuth ~ credentialResponse:',
              credentialResponse
            );
            onGoogleAuthSuccess(credentialResponse);
          }}
          onError={(err) => {
            console.log('\n 🚀 ~ file: SocialAuth.jsx:26 ~ SocialAuth ~ err:', err);
            console.log('Login Failed');
            onGoogleAuthFailed(err);
          }}
        />
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

SocialAuth.propTypes = {
  onGoogleAuthSuccess: func,
  onGoogleAuthFailed: func
};

SocialAuth.defaultProps = {
  onGoogleAuthFailed: () => {},
  onGoogleAuthSuccess: () => {}
};
