import {
  Alert,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton
} from '@material-tailwind/react';
import moment from 'moment-timezone';
import React, { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AddButton } from 'src/components';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';
import { MainLayout } from 'src/layouts';
import { useConfirmPayment } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';
import Swal from 'sweetalert2';

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');

  const { data, isLoading, error, refetch } = useConfirmPayment(ref);

  useEffect(() => {
    refetch();
  }, [ref]);

  const booking_details = data?.data?.booking_details;

  useEffect(() => {
    if (!isEmpty(error)) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        html: `<div className='text-xs'>We could not confirm your transaction with \nPayment Ref: \n<b>${ref}</b></div>`,
        confirmButtonColor: 'red',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    }
  }, [error]);

  return (
    <ContentContainer
      width="100%"
      height="100%"
      className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto ">
      {isLoading ? (
        <ContentContainer className="flex flex-col h-full w-full min-h-[300px] items-center justify-center">
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
          <AppTypography
            variant="lead"
            color="blue"
            className="capitalise text-kiiraDark text-base font-poppins lg:text-2xl font-medium  w-full xl:w-3/4 text-center">
            Processing Payment Verification
          </AppTypography>
        </ContentContainer>
      ) : null}

      {isEmpty(error) && !isEmpty(booking_details) && !isLoading ? (
        <>
          <Alert
            variant="gradient"
            color="light-blue"
            open={true}
            className="uppercase whitespace-pre-wrap font-bold "
            icon={
              <IconButton variant="text">
                <i className="fa fa-bullhorn text-white text-2xl" aria-hidden="true"></i>
              </IconButton>
            }>
            {data?.data?.message}
          </Alert>
          <ContentContainer className="flex-col md:flex-row w-full max-w-max rounded-l-2xl lg:max-h-[450px] gap-1 md:gap-0">
            <ContentContainer className="w-full sm:w-1/4 lg:w-2/5 min-[540px]:w-full max-[768px]:h-[100px] shadow-md md:shadow-none  shrink-0 m-0 rounded-2xl  md:rounded-r-none md:rounded-l-xl bg-[#E2EDFF] bg-blend-darken">
              <img
                src={booking_details?.appointment_type?.image}
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
                Payment Successful!
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
                    {moment(booking_details?.datetime).format('MMM D, YYYY')} at{' '}
                    {moment(booking_details?.datetime).format('H:mma')}
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
                    {booking_details?.appointment_type?.name}
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
                    {booking_details?.calendar?.name}
                  </AppTypography>
                </ContentContainer>
              </ContentContainer>
              {/* 
              <AppButton
                onClick={() => navigate(ROUTES.HISTORY, { replace: true })}
                className="shadow-transparent mt-auto"
                size="lg"
                fullWidth>
                Add to your calender
              </AppButton> */}
            </ContentContainer>
          </ContentContainer>
          {isEmpty(error) ? (
            <AddButton
              label="New Booking"
              onAddClick={() => navigate(ROUTES.BOOK_APPOINTMENT, { replace: true })}
            />
          ) : null}
        </>
      ) : null}

      {!isEmpty(error) && isEmpty(booking_details) && !isLoading ? (
        <ContentContainer className="flex-col md:flex-row w-full h-full rounded-l-2xl lg:max-h-[450px] gap-1 md:gap-0 items-center justify-center">
          <ContentContainer className="p-4 md:p-8 md:pb-2 w-full h-full gap-4 bg-kiiraBg2 rounded-2xl  max-w-max">
            <AppTypography className="text-center">
              <i
                className="fa fa-exclamation-triangle text-red-500 text-8xl"
                aria-hidden="true"></i>
            </AppTypography>
            <AppTypography
              variant="lead"
              color="blue"
              className="capitalise text-kiiraDark text-xl font-poppins lg:text-2xl font-medium text-center my-4  w-full">
              ERROR
            </AppTypography>
            <Alert
              variant="gradient"
              color="red"
              open={true}
              className="uppercase whitespace-pre-wrap font-bold"
              icon={
                <IconButton variant="text" className="">
                  <i className="fa fa-bullhorn text-white text-2xl" aria-hidden="true"></i>
                </IconButton>
              }>
              <span className="flex flex-row flex-wrap h-full w-full items-center text-center">
                {error?.response?.data?.message}
              </span>
            </Alert>

            <AppTypography
              variant="small"
              className="text-kiiraTextfont-poppins font-medium text-center mt-10">
              Please try again later
            </AppTypography>

            <Button
              variant="outlined"
              onClick={() => navigate(ROUTES.BOOK_APPOINTMENT, { replace: true })}
              className="shadow-transparent mt-auto mb-4"
              size="sm">
              Return to Booking
            </Button>
          </ContentContainer>
        </ContentContainer>
      ) : null}
    </ContentContainer>
  );
};

export default ConfirmBooking;
