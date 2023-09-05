import React, { useEffect, useRef, useState } from 'react';
import { AppAvatar, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES, profileState } from 'src/data';
import { Badge, Button, Rating } from '@material-tailwind/react';
import { bool, func, object, string } from 'prop-types';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { truncate } from 'src/utils/truncate';
import isEmpty from 'src/utils/isEmpty';
import { Toast } from 'src/utils';
import { useAppointmentTypes } from 'src/queries/queryHooks';

const ServiceContainer = styled(ContentContainer)(({ disabled, whiteBackground, selected }) => [
  tw`col-auto flex-col w-full max-w-[-webkit-fill-available] rounded-3xl h-full gap-2`,
  disabled && tw`opacity-60`,
  selected && tw`opacity-100`,
  whiteBackground ? tw`bg-white` : tw`bg-kiiraBg2`
]);

const Dot = styled.span`
  ${tw`h-4 w-4 rounded-full items-center justify-center`}
  background: ${({ color }) => color || 'rgb(63 132 255)'};
`;

const DoctorsCard = ({
  doctor,
  style,
  disabled,
  whiteBackground,
  loading,
  hideBookingButton,
  setSelected,
  selected
}) => {
  const docRef = useRef();
  const navigate = useNavigate();

  return (
    <ServiceContainer
      className={[
        loading
          ? 'relative items-center gap-4 justify-center p-4 pt-3.5 animate-pulse'
          : 'relative items-center gap-4 justify-center p-4 pt-3.5 hover:opacity-90'
      ]}
      disabled={disabled || !selected}
      whiteBackground={whiteBackground}
      style={style}>

      {/* <ContentContainer className="absolute right-3 top-3 flex flex-row flex-nowrap items-center gap-1 justify-end">
        <AppTypography variant="small" className="text-[10px] capitalize">
          {doctor?.status || 'available'}
        </AppTypography>{' '}
        {doctor?.status === profileState.busy ||
        doctor?.status === profileState.unavailable ||
        true ? (
          <IMAGES.TimeIconFilled />
        ) : (
          <IMAGES.TimeIcon />
        )}
      </ContentContainer> */}

      <Badge
        containerRef={docRef}
        overlap="circular"
        placement="top-end"
        className="h-4 w-4 bg-white p-[1px] mt-6"
        content={
          <Dot
            color={
              doctor?.status === profileState.online
                ? '#009EAF'
                : doctor?.status === profileState.offline
                ? '#DFDFDF'
                : '#F58634'
            }
          />
        }>
        <AppAvatar
          size="xxl"
          src={doctor?.image && !isEmpty(doctor?.image) ? doctor?.image : IMAGES.Penguin}
          alt="avatar"
          status={doctor?.status}
          withBorder={true}
          loading="lazy"
          className={[
            doctor?.status === profileState.online || true
              ? `p-[4px] object-cover rounded-full mt-6 border border-[#6467CE]`
              : `p-[4px] object-cover rounded-full mt-6 border border-[#DFDFDF]`
          ]}
        />
      </Badge>
      <ContentContainer className="flex flex-col justify-between items-center flex-nowrap gap-2">
        <AppTypography
          variant="lead"
          color="blue"
          className="capitalise text-kiiraDark text-base font-bold font-poppins text-center">
          {doctor?.name || ''}
        </AppTypography>
        {!isEmpty(doctor?.description) ? (
          <AppTypography variant="small" className="text-kiiraText text-[0.875rem] text-center">
            {truncate(doctor?.description, 80)}
          </AppTypography>
        ) : null}
      </ContentContainer>
      <Rating value={doctor?.rating || 5} readonly className="mb-auto" />
      <ContentContainer className="">
        {!isEmpty(doctor?.location) ? (
          <AppTypography
            variant="small"
            className="text-sm text-kiiraText font-normal font-montserrat flex flex-row flex-nowrap gap-2 items-center">
            <IMAGES.LocationIcon className="opacity-50" />{' '}
            <span className="text-center text-xs w-auto">{truncate(doctor?.location, 60)}</span>
          </AppTypography>
        ) : null}
      </ContentContainer>
      <hr className="bg-kiiraText w-full " />
      <ContentContainer className="flex flex-row items-center gap-2 justify-center flex-wrap xl:flex-nowrap">
        {/* <Button
          disabled={disabled || loading}
          size="sm"
          className="max-w-[120px] rounded-full text-[8px] text-kiiraText bg-transparent shadow-none border border-kiiraText/20">
          Profile
        </Button> */}
        {hideBookingButton ? (
          <Button
            disabled={disabled || loading}
            onClick={() => {
              setSelected(doctor);
              Toast.fire({
                icon: 'info',
                title: `${doctor?.name} selected`,
                position: 'top-right'
              });
            }}
            size="sm"
            className="max-w-[120px] rounded-full text-[8px] bg-kiiraBlue shadow-none">
            {selected ? 'Selected' : 'Select'}
          </Button>
        ) : (
          <Button
            disabled={disabled || loading}
            onClick={() => {
              setSelected(doctor);
              // navigate(`${ROUTES.CHOOSE_APPOINTMENT}/doctor`, { state: { doctor } });
            }}
            size="sm"
            className="max-w-[120px] rounded-full text-[8px] bg-kiiraBlue shadow-none">
            Book now
          </Button>
        )}
      </ContentContainer>
    </ServiceContainer>
  );
};

export default DoctorsCard;

DoctorsCard.propTypes = {
  doctor: object,
  string: string,
  disabled: bool,
  whiteBackground: bool,
  loading: bool,
  setSelected: func,
  hideBookingButton: bool,
  selected: bool
};

DoctorsCard.defaultProps = {
  disabled: false,
  whiteBackground: false,
  loading: false,
  hideBookingButton: false,
  setSelected: () => {},
  selected: false
};
