import React from 'react';
import {
  AddCircleIcon,
  AppTypography,
  BorderedContainer,
  ContentContainer
} from '../shared/styledComponents';
import { string } from 'prop-types';

const AddButton = ({ label }) => {
  return (
    <BorderedContainer className="h-32 rounded-2xl min-w-36 flex flex-row items-center border-none justify-center gap-1 flex-wrap hover:opacity-80 hover:cursor-pointer">
      <ContentContainer className="flex flex-col flex-nowrap gap-1 items-center">
        <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 p-1 rounded-full">
          <AddCircleIcon />
        </ContentContainer>
        <AppTypography variant="small" className="text-xs md:text-sm text-kiiraDark font-medium">
          {label}
        </AppTypography>
      </ContentContainer>
    </BorderedContainer>
  );
};

AddButton.propTypes = {
  label: string
};

AddButton.defaultPropTypes = {
  label: ''
};

export default AddButton;
