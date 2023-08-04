import React from 'react';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as AppleIcon } from 'src/assets/icons/apple.svg';
import { Button } from '@material-tailwind/react';
import { GoogleLogin } from '@react-oauth/google';
import { bool, func, string } from 'prop-types';
import { Divider } from '../shared/styledComponents';

const SocialAuth = ({
  onGoogleAuthSuccess,
  onGoogleAuthFailed,
  showDivder,
  dividerText,
  dividerClassName
}) => {
  return (
    <>
      {showDivder ? (
        <Divider
          className={
            dividerClassName
              ? 'my-4 md:my-6 text-xs backdrop:md:text-sm text-kiiraText ' + dividerClassName
              : 'my-4 md:my-6 text-xs backdrop:md:text-sm text-kiiraText'
          }
          data-content={dividerText}
        />
      ) : null}

      <div className="flex flex-row justify-center w-full gap-5 mb-2">
        {/* <Button
          variant="text"
          className="w-full h-48 max-h-[48px] border border-kiiraBlue rounded-xl flex items-center justify-center">
          <FacebookIcon />
        </Button> */}
        <GoogleLogin
          allowed_parent_origin
          login_uri="http://localhost:3000/login"
          text="continue_with"
          shape="pill"
          logo_alignment="left"
          theme="filled_blue"
          onSuccess={(credentialResponse) => {
            console.log(
              '\n 🚀 ~ file: SocialAuth.jsx:23 ~ SocialAuth ~ credentialResponse:',
              credentialResponse?.credential
            );
            onGoogleAuthSuccess(credentialResponse?.credential);
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
  onGoogleAuthFailed: func,
  showDivder: bool,
  dividerText: string,
  dividerClassName: string
};

SocialAuth.defaultProps = {
  onGoogleAuthFailed: () => {},
  onGoogleAuthSuccess: () => {},
  dividerText: 'Or login with',
  showDivder: true,
  dividerClassName: ''
};
