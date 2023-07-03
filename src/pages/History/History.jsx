import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AddButton, BookingCard, Empty } from 'src/components';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';
import { useAppointments } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';

const History = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useAppointments();
  const appointments = data?.data?.booking_history;
  return (
    <ContentContainer
      width="100%"
      height="100%"
      className="h-full min-h-[50vh] p-4 lg:px-10 lg:py-4 gap-4">
      {isLoading ? (
        <ContentContainer className="flex h-full w-full min-h-[300px] items-center justify-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#005eff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </ContentContainer>
      ) : null}

      {!isLoading ? (
        <>
          <AddButton label="New Booking" onAddClick={() => navigate(ROUTES.BOOK_APPOINTMENT)} />
          {appointments?.map((booking, index) => {
            return (
              <BookingCard
                bookingData={booking}
                bookingAction={(data) =>
                  navigate(`${ROUTES.VIEW_BOOKING}/${booking?.reference}`, { state: data })
                }
                key={index?.toString()}
              />
            );
          })}
        </>
      ) : null}
    </ContentContainer>
  );
};

export default History;
