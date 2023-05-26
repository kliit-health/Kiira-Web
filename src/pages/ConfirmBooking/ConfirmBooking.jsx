import { Avatar, Card, CardBody, CardHeader } from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton } from 'src/components';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';
import { MainLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';

const ConfirmBooking = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto ">
        <ContentContainer className="flex-col md:flex-row w-full max-w-max rounded-l-2xl lg:max-h-[450px] gap-1 md:gap-0">
          <ContentContainer className="w-full sm:w-1/4 lg:w-2/5 min-[540px]:w-full max-[768px]:h-[100px] shadow-md md:shadow-none  shrink-0 m-0 rounded-2xl  md:rounded-r-none md:rounded-l-xl bg-[#E2EDFF] bg-blend-darken">
            <img
              src={IMAGES?.Penguin}
              alt="image"
              className="w-full h-[100px] sm:h-full object-cover rounded-2xl  md:rounded-r-none md:rounded-l-xl"
              loading="lazy"
            />
          </ContentContainer>

          <ContentContainer className="p-4 md:p-8 md:pb-2 w-full gap-4 bg-kiiraBg2 rounded-2xl  md:rounded-l-none  md:rounded-r-2xl  ">
            <AppTypography
              variant="lead"
              color="blue"
              className="capitalise text-kiiraDark text-2xl font-poppins lg:text-4xl font-medium  w-full xl:w-3/4">
              Appointment booked successfully!
            </AppTypography>

            <AppTypography variant="small" className=" text-kiiraTextfont-poppins font-medium ">
              Appointment information has been sent to your email
            </AppTypography>

            <ContentContainer className="flex flex-col gap-2.5 lg:gap-4 border border-[#C4CDD5] rounded-lg p-4">
              <ContentContainer className="gap-1">
                <AppTypography
                  variant="small"
                  className="text-sm md:text-sm text-kiiraText font-semibold">
                  Schedule
                </AppTypography>
                <AppTypography
                  variant="lead"
                  className="text-sm md:text-base text-kiiraBlackishGreen font-medium font-poppins">
                  April 21, 2023 at 12:00am
                </AppTypography>
              </ContentContainer>
              <ContentContainer className="gap-1">
                <AppTypography
                  variant="small"
                  className="text-sm md:text-sm text-kiiraText font-semibold">
                  Service
                </AppTypography>
                <AppTypography
                  variant="lead"
                  className="text-sm md:text-base text-kiiraBlackishGreen font-medium font-poppins">
                  General Health Accessment
                </AppTypography>
              </ContentContainer>
              <ContentContainer className="gap-1">
                <AppTypography
                  variant="small"
                  className="text-sm md:text-sm text-kiiraText font-semibold">
                  Doctor
                </AppTypography>
                <AppTypography
                  variant="lead"
                  className="text-sm md:text-base text-kiiraBlackishGreen font-medium font-poppins">
                  Dr. Candice Fraser
                </AppTypography>
              </ContentContainer>
            </ContentContainer>

            <AppButton
              onClick={() => navigate(ROUTES.HISTORY)}
              className="shadow-transparent mt-auto"
              size="lg"
              fullWidth>
              Add to your calender
            </AppButton>
          </ContentContainer>
        </ContentContainer>

        <AddButton label="New Booking" onAddClick={() => navigate(ROUTES.BOOK_APPOINTMENT)} />
      </ContentContainer>
    </MainLayout>
  );
};

export default ConfirmBooking;
