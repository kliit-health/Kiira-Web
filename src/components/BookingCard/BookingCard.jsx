import React from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES } from 'src/data';
import { Avatar } from '@material-tailwind/react';
import { bool, func } from 'prop-types';
import tw, { styled } from 'twin.macro';

const BookingContainer = styled(ContentContainer)(({ disabled }) => [
  disabled && tw`cursor-not-allowed opacity-50`
]);

const BookingCard = ({ disabled, review, bookingAction }) => {
  return (
    <BookingContainer
      className={
        !review
          ? 'flex-col md:flex-row w-full max-w-max rounded-l-2xl lg:max-h-[360px]'
          : 'flex-col sm:flex-row w-full max-w-max rounded-l-2xl lg:max-h-[360px] gap-4'
      }
      disabled={disabled}>
      <ContentContainer
        className={
          !review
            ? 'w-full sm:w-1/4  shrink-0 m-0 rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none bg-[#E2EDFF] bg-blend-darken'
            : 'h-full w-28 shrink-0 m-0 rounded-xl bg-[#E2EDFF] bg-blend-darken'
        }>
        <img
          src={IMAGES?.medicalAid}
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
        <ContentContainer row className="flex justify-between flex-nowrap">
          <AppTypography
            variant="h6"
            color="blue"
            className={
              !review
                ? 'capitalise text-kiiraBlackishGreen text-lg lg:text-2xl font-semibold'
                : '"capitalise text-kiiraBlackishGreen text-sm font-semibold"'
            }>
            General Health Assessment
          </AppTypography>
          {!review ? (
            <ContentContainer col className="-mt-1">
              <AppTypography
                variant="h4"
                className="text-right font-montserrat text-kiiraBlue font-bold">
                $150.00
              </AppTypography>
              <AppTypography
                variant="small"
                className="text-[0.65rem] text-right text-kiiraBlackishGreen/75 -mt-1">
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
            April 21, 2023 at
          </AppTypography>
          <AppTypography
            variant={!review ? 'h6' : 'small'}
            className={
              !review
                ? 'font-semibold text-kiiraBlackishGreen/75 -mt-1'
                : 'mt-0 font-medium text-xs md:text-base'
            }>
            12:00am
          </AppTypography>
        </ContentContainer>

        <ContentContainer
          className={
            !review
              ? 'flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-2 items-center'
              : 'flex flex-row flex-nowrap md:flex-nowrap gap-4 lg:gap-2 items-center'
          }>
          <Avatar src={IMAGES.inboxImg} alt="pic" size="sm" className="rounded-full" />
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
              Dr. Candice Fraser
            </AppTypography>
          </ContentContainer>
        </ContentContainer>

        {!review ? (
          <>
            <AppTypography
              variant="small"
              className="text-sm md:text-sm text-kiiraText font-normal font-montserrat flex flex-row flex-nowrap gap-2 items-center">
              <IMAGES.LocationIcon /> <span>Virtual</span>
            </AppTypography>

            <hr className="bg-kiiraText" />

            <AppButton size="md" fullWidth disabled={disabled} onClick={bookingAction}>
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
  bookingAction: func
};

BookingCard.defaultProps = {
  disabled: false,
  review: false,
  bookingAction: () => {}
};

export default BookingCard;
