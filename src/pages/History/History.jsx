import React from 'react';
import { AddButton, BookingCard } from 'src/components';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';

const History = () => {
  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] p-4 lg:px-10 lg:py-4 gap-4">
        <AddButton label="New Booking" />
        {[1].map((history, index) => {
          return <BookingCard />;
        })}
      </ContentContainer>
    </MainLayout>
  );
};

export default History;
