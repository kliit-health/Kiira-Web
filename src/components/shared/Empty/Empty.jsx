import React from 'react';
import { AppTypography, ContentContainer } from '../styledComponents';
import { IMAGES } from 'src/data';

const Empty = () => {
  return (
    <ContentContainer className="h-full w-full flex items-center justify-center shrink">
      <AppTypography variant="lead" className='text-sm'>No data Available</AppTypography>
    </ContentContainer>
  );
};

export default Empty;
