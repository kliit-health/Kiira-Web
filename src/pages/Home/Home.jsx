import { Button, Card } from '@material-tailwind/react';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import {useNavigate } from 'react-router-dom';
import { AddButton, BlogItem, BookingCard, Empty } from 'src/components';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';
import { useAppointmentsHistory, useBlogCollections } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useAppointmentsHistory();
  const { data: blogResponse, isLoading: blogLoading } = useBlogCollections();
  const blogCollections = blogResponse?.data?.collections;
  const appointments = data?.data?.booking_history;

  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh]  p-4 lg:px-10 lg:py-4 gap-4">
        <AppTypography variant="h6" className="text-kiiraDark font-bold text-base lg:text-lg">
          Kick it with Kiira
        </AppTypography>

        <ContentContainer
          hideScroll
          width="100%"
          className="overflow-hidden overflow-x-auto flex flex-row items-center gap-4 space-x-2">
          {blogLoading
            ? Array.apply(null, Array(8)).map((item, index) => {
                return <BlogItem item={item} loading={true} key={index.toString()} />;
              })
            : null}
          {!blogLoading && !isEmpty(blogCollections)
            ? blogCollections?.map((item, index) => {
                return <BlogItem item={item} loading={blogLoading} key={index.toString()} />;
              })
            : null}
        </ContentContainer>

        <Card className="w-full h-full bg-kiiraBg2 p-4 lg:px-5 lg:py-4 gap-4 shadow-none">
          <AppTypography variant="h6" className="text-kiiraDark font-bold text-base lg:text-lg">
            Book a new appointment
          </AppTypography>

          <AddButton label="New Booking" onAddClick={() => navigate(ROUTES.BOOK_APPOINTMENT)} />

          <ContentContainer row className="flex-row flex-nowrap items-center justify-between mt-4">
            <AppTypography
              variant="h6"
              className="text-[#112211] font-semibold text-xs lg:text-base">
              Booking History
            </AppTypography>
            <Button
              onClick={() => navigate(ROUTES.HISTORY)}
              variant="text"
              size="sm"
              className="text-xs rounded-2xl bg-kiiraBlue text-white py-1 px-5">
              <span className="text-[0.5rem]">View all</span>
            </Button>
          </ContentContainer>

          {!isLoading && !isEmpty(appointments) ? (
            <>
              {appointments
                .map((booking, index) => {
                  if (booking?.status === 'payment_failed') return;
                  return (
                    <BookingCard
                      bookingData={booking}
                      bookingAction={(data) =>
                        navigate(`${ROUTES.VIEW_BOOKING}/${booking?.id}`, {
                          state: data
                        })
                      }
                      key={index?.toString()}
                    />
                  );
                })
                .splice(0, 3)}
              {appointments?.length > 3 ? (
                <ContentContainer className="w-full flex-row justify-center">
                  <Button
                    onClick={() => navigate(ROUTES.HISTORY)}
                    variant="text"
                    size="sm"
                    className="text-xs w-auto max-w-max  rounded-2xl text-white py-1 px-5">
                    <span className="text-kiiraBlue ">View all</span>
                  </Button>
                </ContentContainer>
              ) : null}
            </>
          ) : null}

          {!isLoading && isEmpty(appointments) ? <Empty /> : null}

          {isLoading ? (
            <ContentContainer className="flex h-full w-full min-h-[150px] items-center justify-center">
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
        </Card>
      </ContentContainer>
    </MainLayout>
  );
};

export default Home;
