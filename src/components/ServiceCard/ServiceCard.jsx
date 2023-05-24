import React from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES } from 'src/data';
import { Avatar, Button } from '@material-tailwind/react';
import { object } from 'prop-types';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { truncate } from 'src/utils/truncate';

const ServiceContainer = styled(ContentContainer)`
  ${tw`col-auto flex-col w-full max-w-max rounded-3xl h-full bg-kiiraBg2 gap-2`}
`;

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const pushLink = (selection) => {
    navigate(`${ROUTES.CHOOSE_APPOINTMENT}/${selection}`);
  };
  return (
    <ServiceContainer className="">
      <ContentContainer className="w-full p-3 shrink-0 m-0 pb-0">
        <img
          src={service?.icon}
          alt="image"
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
        />
      </ContentContainer>
      <ContentContainer className="p-4 w-ful h-full gap-4 pt-0 ">
        <ContentContainer className="flex flex-col justify-between flex-nowrap gap-2">
          <AppTypography
            variant="lead"
            color="blue"
            className="capitalise text-kiiraDark text-lg font-bold font-poppins">
            {service?.title}
          </AppTypography>
          <AppTypography
            variant="small"
            className="text-kiiraText text-[0.85rem] h-full md:max-h-[160px]">
            {truncate(service?.description, 145)}
          </AppTypography>
        </ContentContainer>

        <ContentContainer className="gap-4 mt-auto">
          <hr className="bg-kiiraText mt-auto" />
          <AppTypography variant="h6" className="font-montserrat text-kiiraDark font-bold text-xs">
            {service?.fee}
          </AppTypography>
          <Button
            size="sm"
            className="w-32 rounded-full text-[8px] bg-kiiraBlue"
            onClick={() => pushLink(service?._id)}>
            Book now
          </Button>
        </ContentContainer>
      </ContentContainer>
    </ServiceContainer>
  );
};

export default ServiceCard;

ServiceCard.propTypes = {
  service: object
};
