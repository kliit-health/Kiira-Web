import { Button } from '@material-tailwind/react';
import { bool, element, string } from 'prop-types';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ContentContainer } from '../styledComponents';

const Loader = ({ spinner, label, fullWidth, size, className }) => {
  return (
    <Button
      disabled
      size={size}
      className={
        className
          ? [
              'flex flex-row justify-center items-center gap-1 text-sm font-medium text-white capitalize bg-kiiraBlue disabled:opacity-100 shadow-transparent',
              className
            ]
          : 'flex flex-row justify-center items-center gap-1 text-sm font-medium text-white capitalize bg-kiiraBlue disabled:opacity-100 shadow-transparent'
      }
      fullWidth={fullWidth}>
      {spinner}{' '}
      <ContentContainer className="font-poppins font-semibold text-base">{label}</ContentContainer>
    </Button>
  );
};

export default Loader;

Loader.propTypes = {
  spinner: element,
  label: string,
  fullWidth: bool,
  size: string,
  className: string
};

Loader.defaultProps = {
  label: '',
  size: 'sm',
  fullWidth: true,
  className: '',
  spinner: (
    <ColorRing
      visible={true}
      height="32"
      width="32"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#0A02E2', '#fff', '#fff', '#fff', '#00C0E2']}
    />
  )
};
