import React from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES } from 'src/data';
import { Avatar } from '@material-tailwind/react';
import { bool, func, object } from 'prop-types';
import tw, { styled } from 'twin.macro';
import moment from 'moment-timezone';
import isEmpty from 'src/utils/isEmpty';

const BookingContainer = styled(ContentContainer)(({ disabled }) => [
  disabled && tw`cursor-not-allowed opacity-50`
]);

const BookingCard = ({ disabled, review, bookingAction, bookingData }) => {
  const doctor = bookingData?.calendar;
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
            ? 'w-full sm:w-1/4 shadow-sm shrink-0 m-0 rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none bg-[#E2EDFF] bg-blend-darken'
            : 'h-full sm:w-1/4 shadow-sm shrink-0 m-0 rounded-xl bg-[#E2EDFF] bg-blend-darken'
        }>
        <img
          src={
            !isEmpty(bookingData?.appointment_type?.image) && bookingData?.appointment_type?.image
              ? bookingData?.appointment_type?.image
              : IMAGES.Penguin
          }
          alt="image"
          className={
            !review
              ? 'w-full h-[150px] sm:h-full object-cover rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none'
              : 'w-full max-h-[150px] sm:h-full object-cover rounded-xl'
          }
          loading="lazy"
        />
      </ContentContainer>

      <ContentContainer
        className={
          !review
            ? 'p-2 md:p-4 w-full gap-4 bg-kiiraBg/20 shadow-sm  rounded-b-xl rounded-tr-none md:rounded-r-xl md:rounded-bl-none'
            : 'w-full gap-1.5 md:gap-2 bg-kiiraBg/20 shadow-sm  rounded-b-xl rounded-tr-none md:rounded-r-xl md:rounded-bl-none'
        }>
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
            {!review ? bookingData?.appointment_type?.name : bookingData?.appointmentType?.name}
          </AppTypography>
          {!review ? (
            <ContentContainer col className="-mt-1">
              <AppTypography
                variant="h4"
                className="text-right font-montserrat text-kiiraBlue font-bold">
                $
                {!review
                  ? bookingData?.checkout_session?.amount_total ||
                    bookingData?.appointment_type?.price
                  : bookingData?.checkout_session?.amount_total ||
                    bookingData?.appointmentType?.price}
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
            {moment(
              !review ? bookingData?.appointment_datetime : bookingData?.bookingCheckout?.time
            ).format('MMM D, YYYY')}{' '}
            at
          </AppTypography>
          <AppTypography
            variant={!review ? 'h6' : 'small'}
            className={
              !review
                ? 'font-semibold text-kiiraBlackishGreen/75 -mt-1'
                : 'mt-0 font-medium text-xs md:text-base'
            }>
            {moment(
              !review ? bookingData?.appointment_datetime : bookingData?.bookingCheckout?.time
            ).format('H:mma')}
          </AppTypography>
        </ContentContainer>

        {review && (!isEmpty(bookingData?.doctor) || !isEmpty(bookingData?.calendar)) ? (
          <ContentContainer
            className={
              !review
                ? 'flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-2 items-center mt-auto'
                : 'flex flex-row flex-nowrap md:flex-nowrap gap-4 lg:gap-2 items-center mt-auto'
            }>
            <Avatar
              src={
                !review && !isEmpty(doctor?.thumbnail) && doctor?.thumbnail
                  ? doctor?.thumbnail
                  : !isEmpty(bookingData?.doctor?.thumbnail) && bookingData?.doctor?.thumbnail
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
                  ? bookingData?.calendar?.name
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
                ? 'flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-2 items-center mt-auto'
                : 'flex flex-row flex-nowrap md:flex-nowrap gap-4 lg:gap-2 items-center mt-auto'
            }>
            <Avatar
              src={
                !review && !isEmpty(doctor?.thumbnail) && doctor?.thumbnail
                  ? doctor?.thumbnail
                  : !isEmpty(bookingData?.doctor?.thumbnail) && bookingData?.doctor?.thumbnail
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
                  ? bookingData?.calendar?.name
                  : !isEmpty(bookingData?.doctor?.name)
                  ? bookingData?.doctor?.name
                  : 'Any available doctor'}
              </AppTypography>
            </ContentContainer>
          </ContentContainer>
        )}

        {!review ? (
          <>
            <ContentContainer row className="items-center justify-between gap-4 flex-wrap">
              <AppTypography
                variant="small"
                className="text-sm md:text-sm text-kiiraText font-normal font-montserrat flex flex-row flex-nowrap gap-2 items-center mt-auto">
                <IMAGES.LocationIcon />{' '}
                <span>{!review ? bookingData?.appointment_type?.category : 'Virtual'}</span>
              </AppTypography>

              <AppTypography
                variant="small"
                className="text-xs text-kiiraText font-normal font-montserrat flex flex-row flex-nowrap gap-2 items-center mt-auto">
                {bookingData?.status === 'payment_ticketed' ? (
                  <i className="fa-solid fa-calendar-check text-green-500 font-semibold"></i>
                ) : null}
                {bookingData?.status === 'payment_failed' ? (
                  <i className="fa-sharp fa-solid fa-triangle-exclamation text-red-500 font-semibold"></i>
                ) : null}
                {bookingData?.status === 'pending' ? (
                  <i className="fa-solid fa-clock text-amber-500 font-semibold"></i>
                ) : null}
                {bookingData?.status === 'payment_successful' ? (
                  <i className="fa-solid fa-circle-check text-kiiraBlue  font-semibold"></i>
                ) : null}
                <span>
                  Status:{' '}
                  {bookingData?.status === 'payment_failed'
                    ? 'Failed'
                    : bookingData?.status === 'pending'
                    ? 'Pending'
                    : bookingData?.status === 'payment_successful'
                    ? 'Success'
                    : bookingData?.status === 'payment_ticketed'
                    ? 'Ticket Booked'
                    : null}
                </span>
              </AppTypography>
            </ContentContainer>

            {bookingData?.status === 'payment_ticketed' ? (
              <>
                <hr className="bg-kiiraText" />

                <AppButton
                  size="md"
                  fullWidth
                  disabled={disabled || bookingData?.status !== 'payment_ticketed'}
                  onClick={() => bookingAction(bookingData)}>
                  View Booking
                </AppButton>
              </>
            ) : null}
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
