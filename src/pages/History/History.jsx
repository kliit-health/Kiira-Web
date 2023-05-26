import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton, BookingCard } from 'src/components';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';

const History = () => {
  const navigate = useNavigate();
  return (
    <ContentContainer
      width="100%"
      height="100%"
      className="h-full min-h-[50vh] p-4 lg:px-10 lg:py-4 gap-4">
      <AddButton label="New Booking" onAddClick={() => navigate(ROUTES.BOOK_APPOINTMENT)} />
      {[1].map((history, index) => {
        return <BookingCard bookingAction={() => navigate(`${ROUTES.VIEW_BOOKING}/booking`)} />;
      })}
    </ContentContainer>
  );
};

export default History;
