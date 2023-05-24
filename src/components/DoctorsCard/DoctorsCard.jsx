import React from 'react';
import { AppAvatar, AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES, profileState } from 'src/data';
import { Avatar, Badge, Button, Rating } from '@material-tailwind/react';
import { bool, object, shape, string } from 'prop-types';
import tw, { styled } from 'twin.macro';

const ServiceContainer = styled(ContentContainer)(({ disabled, whiteBackground }) => [
  tw`col-auto flex-col w-full max-w-[-webkit-fill-available] rounded-3xl h-full gap-2`,
  disabled && tw`cursor-not-allowed opacity-50`,
  whiteBackground ? tw`bg-white` : tw`bg-kiiraBg2`
]);

const Dot = styled.span`
  ${tw`h-4 w-4 rounded-full items-center justify-center`}
  background: ${({ color }) => color || 'rgb(63 132 255)'};
`;

const DoctorsCard = ({ doctor, style, disabled, whiteBackground }) => {
  return (
    <ServiceContainer
      className={['relative items-center gap-4 justify-center p-4 pt-3.5']}
      disabled={disabled}
      whiteBackground={whiteBackground}
      style={style}>
      <ContentContainer className="absolute right-3 top-3 flex flex-row flex-nowrap items-center gap-1 justify-end">
        <AppTypography variant="small" className="text-[10px] capitalize">
          {doctor?.status}
        </AppTypography>{' '}
        {doctor?.status === profileState.busy || doctor?.status === profileState.unavailable ? (
          <IMAGES.TimeIconFilled />
        ) : (
          <IMAGES.TimeIcon />
        )}
      </ContentContainer>
      <Badge
        overlap="circular"
        placement="top-end"
        // color="deep-purple"
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
          src={doctor?.image}
          alt="avatar"
          status={doctor?.status}
          withBorder={true}
          className={[
            doctor?.status === profileState.online
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
          {doctor?.name}
        </AppTypography>
        <AppTypography variant="small" className="text-kiiraText text-[0.875rem] text-center">
          {doctor?.specialization}
        </AppTypography>
      </ContentContainer>
      <Rating value={doctor?.rating} readonly />
      <hr className="bg-kiiraText mt-auto w-full " />
      <ContentContainer className="flex flex-row items-center gap-2 justify-center flex-wrap lg:flex-nowrap">
        <Button
          disabled={disabled}
          size="sm"
          className="max-w-[120px] rounded-full text-[8px] text-kiiraText bg-transparent shadow-none border border-kiiraText/20">
          Profile
        </Button>
        <Button
          disabled={disabled}
          size="sm"
          className="max-w-[120px] rounded-full text-[8px] bg-kiiraBlue shadow-none">
          Book now
        </Button>
      </ContentContainer>
    
    </ServiceContainer>
  );
};

export default DoctorsCard;

DoctorsCard.propTypes = {
  doctor: object,
  string: string,
  disabled: bool,
  whiteBackground: bool
};

DoctorsCard.defaultProps = {
  disabled: false,
  whiteBackground: false
};
