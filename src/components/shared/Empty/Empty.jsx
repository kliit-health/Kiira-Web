import React from 'react';
import { AppTypography, ContentContainer } from '../styledComponents';
import { any, } from 'prop-types';

const Empty = ({ label }) => {
  return (
    <ContentContainer className="h-full w-full flex items-center justify-center shrink">
      <AppTypography variant="lead" className="text-sm text-center">
        {label ? label : 'No data Available'}
      </AppTypography>
    </ContentContainer>
  );
};

Empty.propTypes = { label: any };

export default Empty;
