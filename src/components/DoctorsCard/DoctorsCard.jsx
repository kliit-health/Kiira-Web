import React from 'react';
import { AppAvatar, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES, profileState } from 'src/data';
import { Badge, Button, Rating } from '@material-tailwind/react';
import { bool, object, string } from 'prop-types';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { truncate } from 'src/utils/truncate';
import isEmpty from 'src/utils/isEmpty';

const ServiceContainer = styled(ContentContainer)(({ disabled, whiteBackground }) => [
  tw`col-auto flex-col w-full max-w-[-webkit-fill-available] rounded-3xl h-full gap-2`,
  disabled && tw`cursor-not-allowed opacity-50`,
  whiteBackground ? tw`bg-white` : tw`bg-kiiraBg2`
]);

const Dot = styled.span`
  ${tw`h-4 w-4 rounded-full items-center justify-center`}
  background: ${({ color }) => color || 'rgb(63 132 255)'};
`;

const DoctorsCard = ({ doctor, style, disabled, whiteBackground, loading }) => {
  const navigate = useNavigate();

  return (
    <ServiceContainer
      className={[
        loading
          ? 'relative items-center gap-4 justify-center p-4 pt-3.5 animate-pulse'
          : 'relative items-center gap-4 justify-center p-4 pt-3.5'
      ]}
      disabled={disabled}
      whiteBackground={whiteBackground}
      style={style}>
      <ContentContainer className="absolute right-3 top-3 flex flex-row flex-nowrap items-center gap-1 justify-end">
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
      </ContentContainer>
      <Badge
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
          src={doctor?.image ? doctor?.image : IMAGES.dummyProfilePhoto}
          alt="avatar"
          status={doctor?.status}
          withBorder={true}
          loading='lazy'
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
          {doctor?.name}
        </AppTypography>
        {!isEmpty(doctor?.description) ? (
          <AppTypography variant="small" className="text-kiiraText text-[0.875rem] text-center">
            {truncate(doctor?.description, 80)}
          </AppTypography>
        ) : null}
      </ContentContainer>
      <Rating value={doctor?.rating || 5} readonly />
      <hr className="bg-kiiraText mt-auto w-full " />
      <ContentContainer className="flex flex-row items-center gap-2 justify-center flex-wrap lg:flex-nowrap">
        <Button
          disabled={disabled || loading}
          size="sm"
          className="max-w-[120px] rounded-full text-[8px] text-kiiraText bg-transparent shadow-none border border-kiiraText/20">
          Profile
        </Button>
        <Button
          disabled={disabled || loading}
          onClick={() =>
            navigate(`${ROUTES.CHOOSE_APPOINTMENT}/${doctor?.id}`, { state: { doctor } })
          }
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
  whiteBackground: bool,
  loading: bool
};

DoctorsCard.defaultProps = {
  disabled: false,
  whiteBackground: false,
  loading: false
};
