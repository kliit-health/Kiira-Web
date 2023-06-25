import React from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES } from 'src/data';
import { Avatar } from '@material-tailwind/react';
import { bool, func, object } from 'prop-types';
import tw, { styled } from 'twin.macro';
import moment from 'moment-timezone';
import isEmpty from 'src/utils/isEmpty';
import { useAppointmentTypes, useDoctorsCalendars } from 'src/queries/queryHooks';

const BookingContainer = styled(ContentContainer)(({ disabled }) => [
  disabled && tw`cursor-not-allowed opacity-50`
]);

const BookingCard = ({ disabled, review, bookingAction, bookingData }) => {
  const { data } = useDoctorsCalendars();
  const { data: appointmenData } = useAppointmentTypes();

  const doctors = data?.data?.calendars;
  const appointment_types = appointmenData?.data?.appointment_types;

  const doctor = doctors?.filter((doc) => doc?.id === bookingData?.calendarID)[0];
  const appointment = appointment_types?.filter(
    (appmnt) => appmnt?.id === bookingData?.appointmentTypeID
  )[0];

  return (
    <BookingContainer
      className={
        !review
          ? 'flex-col md:flex-row w-full  rounded-l-2xl lg:max-h-[360px]'
          : 'flex-col sm:flex-row w-full rounded-l-2xl lg:max-h-[360px] gap-4'
      }
      disabled={disabled}>
      <ContentContainer
        className={
          !review
            ? 'w-full sm:w-1/4  shrink-0 m-0 rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none bg-[#E2EDFF] bg-blend-darken'
            : 'h-full w-28 shrink-0 m-0 rounded-xl bg-[#E2EDFF] bg-blend-darken'
        }>
        <img
          src={
            !review && appointment?.image
              ? appointment?.image
              : bookingData?.appointmentType?.image
              ? bookingData?.appointmentType?.image
              : IMAGES.Penguin
          }
          alt="image"
          className={
            !review
              ? 'w-full h-[150px] sm:h-full object-cover rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none'
              : 'w-full h-full object-cover rounded-xl'
          }
          loading="lazy"
        />
      </ContentContainer>

      <ContentContainer className={!review ? 'p-2 md:p-4 w-full gap-4' : 'w-full gap-1.5 md:gap-2'}>
        <ContentContainer
          row
          className={
            !review
              ? 'flex justify-between flex-wrap sm:flex-nowrap gap-4'
              : 'flex justify-between flex-nowrap'
          }>
          <AppTypography
            variant="h6"
            color="blue"
            className={
              !review
                ? 'capitalise text-kiiraBlackishGreen text-lg lg:text-2xl font-semibold text-justify'
                : 'capitalise text-kiiraBlackishGreen text-sm font-semibold'
            }>
            {!review ? bookingData?.type : bookingData?.appointmentType?.name}
          </AppTypography>
          {!review ? (
            <ContentContainer col className="-mt-1">
              <AppTypography
                variant="h4"
                className="text-right font-montserrat text-kiiraBlue font-bold">
                ${!review ? bookingData?.price : bookingData?.appointmentType?.price}
              </AppTypography>
              <AppTypography
                variant="small"
                className="text-[0.65rem] text-left sm:text-right text-kiiraBlackishGreen/75 -mt-1">
                excl. discount
              </AppTypography>
            </ContentContainer>
          ) : null}
        </ContentContainer>

        <ContentContainer className={!review ? 'flex-col' : 'flex-row items-center gap-1'}>
          <AppTypography
            variant="h6"
            className={
              !review
                ? 'text-kiiraBlackishGreen/75 font-semibold'
                : 'font-medium text-xs md:text-base'
            }>
            {moment(!review ? bookingData?.datetime : bookingData?.bookingCheckout?.time).format(
              'MMM D, YYYY'
            )}{' '}
            at
          </AppTypography>
          <AppTypography
            variant={!review ? 'h6' : 'small'}
            className={
              !review
                ? 'font-semibold text-kiiraBlackishGreen/75 -mt-1'
                : 'mt-0 font-medium text-xs md:text-base'
            }>
            {moment(!review ? bookingData?.datetime : bookingData?.bookingCheckout?.time).format(
              'H:mma'
            )}
          </AppTypography>
        </ContentContainer>

        {review && (!isEmpty(bookingData?.doctor) || !isEmpty(bookingData?.calendar)) ? (
          <ContentContainer
            className={
              !review
                ? 'flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-2 items-center'
                : 'flex flex-row flex-nowrap md:flex-nowrap gap-4 lg:gap-2 items-center'
            }>
            <Avatar
              src={
                !review
                  ? doctor?.thumbnail
                  : bookingData?.doctor?.thumbnail
                  ? bookingData?.doctor?.thumbnail
                  : IMAGES.Penguin
              }
              alt="pic"
              size="sm"
              className="rounded-full"
            />

            <ContentContainer
              row
              className={
                !review ? 'gap-1.5 items-center' : 'gap-0.5 md:gap-1.5 flex-wrap items-center'
              }>
              <AppTypography
                variant="small"
                className={
                  !review
                    ? 'text-sm md:text-sm text-kiiraText font-semibold'
                    : 'text-xs md:text-sm text-kiiraText font-semibold'
                }>
                With
              </AppTypography>
              <AppTypography
                variant="lead"
                className={
                  !review
                    ? 'text-sm md:text-base text-kiiraBlackishGreen/75 font-semibold'
                    : 'text-xs md:text-base text-kiiraBlackishGreen/75 font-semibold'
                }>
                {!isEmpty(bookingData?.calendar)
                  ? bookingData?.calendar
                  : !isEmpty(bookingData?.doctor?.name)
                  ? bookingData?.doctor?.name
                  : 'Any available doctor'}
              </AppTypography>
            </ContentContainer>
          </ContentContainer>
        ) : (
          <ContentContainer
            className={
              !review
                ? 'flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-2 items-center'
                : 'flex flex-row flex-nowrap md:flex-nowrap gap-4 lg:gap-2 items-center'
            }>
            <Avatar
              src={
                !review
                  ? doctor?.thumbnail
                  : bookingData?.doctor?.thumbnail
                  ? bookingData?.doctor?.thumbnail
                  : IMAGES.Penguin
              }
              alt=""
              size="sm"
              className="rounded-full bg-kiiraBg2 "
            />

            <ContentContainer
              row
              className={
                !review ? 'gap-1.5 items-center' : 'gap-0.5 md:gap-1.5 flex-wrap items-center'
              }>
              <AppTypography
                variant="small"
                className={
                  !review
                    ? 'text-sm md:text-sm text-kiiraText font-semibold'
                    : 'text-xs md:text-sm text-kiiraText font-semibold'
                }>
                With
              </AppTypography>
              <AppTypography
                variant="lead"
                className={
                  !review
                    ? 'text-sm md:text-base text-kiiraBlackishGreen/75 font-semibold'
                    : 'text-xs md:text-base text-kiiraBlackishGreen/75 font-semibold'
                }>
                {!isEmpty(bookingData?.calendar)
                  ? bookingData?.calendar
                  : !isEmpty(bookingData?.doctor?.name)
                  ? bookingData?.doctor?.name
                  : 'Any available doctor'}
              </AppTypography>
            </ContentContainer>
          </ContentContainer>
        )}

        {!review ? (
          <>
            <AppTypography
              variant="small"
              className="text-sm md:text-sm text-kiiraText font-normal font-montserrat flex flex-row flex-nowrap gap-2 items-center mt-auto">
              <IMAGES.LocationIcon /> <span>{!review ? bookingData?.category : 'Virtual'}</span>
            </AppTypography>

            <hr className="bg-kiiraText" />

            <AppButton
              size="md"
              fullWidth
              disabled={disabled}
              onClick={() => bookingAction({ bookingData, doctor, appointment })}>
              View Booking
            </AppButton>
          </>
        ) : null}
      </ContentContainer>
    </BookingContainer>
  );
};

BookingCard.propTypes = {
  disabled: bool,
  review: bool,
  bookingAction: func,
  bookingData: object
};

BookingCard.defaultProps = {
  disabled: false,
  review: false,
  bookingAction: () => {},
  bookingData: {}
};

export default BookingCard;
