import React from 'react';
import { AppTypography, ContentContainer } from '../styledComponents';
import { IMAGES } from 'src/data';
import { string } from 'prop-types';

const Empty = ({ label }) => {
  return (
    <ContentContainer className="h-full w-full flex items-center justify-center shrink">
      <AppTypography variant="lead" className="text-sm">
        {label ? label : 'No data Available'}
      </AppTypography>
    </ContentContainer>
  );
};

Empty.propTypes = { label: string };

export default Empty;
