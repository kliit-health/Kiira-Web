import React from 'react';
import { AppLink, AppTypography, ContentContainer } from '../shared/styledComponents';
import { Button } from '@material-tailwind/react';
import { object } from 'prop-types';
import tw, { styled } from 'twin.macro';
import { ROUTES } from 'src/routes/Paths';
import { truncate } from 'src/utils/truncate';
import { useNavigate } from 'react-router-dom';
import isEmpty from 'src/utils/isEmpty';
import { IMAGES } from 'src/data';
import { Mixpanel } from 'src/utils/mixpanelUtil';

const ServiceContainer = styled(ContentContainer)`
  ${tw`col-auto flex-col w-full max-w-max rounded-3xl h-full bg-kiiraBg2 gap-2`};
  min-width: -webkit-fill-available;
`;

const ServiceCard = ({ service, appointedDoctor }) => {
  const navigate = useNavigate();

  return (
    <ServiceContainer className="">
      <ContentContainer className="w-full  p-3 shrink-0 m-0 pb-0 overflow-hidden">
        <img
          src={service?.image || IMAGES.Penguin}
          alt="image"
          className="w-full h-auto max-h-[180px] min-h-[180px] object-cover rounded-2xl"
          style={{ backgroundColor: service?.color }}
          loading="lazy"
        />
      </ContentContainer>
      <ContentContainer className="p-4 w-ful h-full gap-4 pt-0 ">
        <ContentContainer className="flex flex-col justify-between flex-nowrap gap-2">
          <AppTypography
            variant="lead"
            color="blue"
            className="capitalise text-kiiraDark text-lg font-bold font-poppins flex flex-row shrink">
            {service?.name}
          </AppTypography>
          {isEmpty(service?.description) ? (
            <AppTypography variant="small" className="text-kiiraText text-[0.85rem] min-h-[100px]">
              {' '}
            </AppTypography>
          ) : (
            <AppTypography
              variant="small"
              className="text-kiiraText text-[0.85rem] h-full md:max-h-[160px]">
              {truncate(service?.description, 150)}
            </AppTypography>
          )}
        </ContentContainer>

        <ContentContainer className="gap-4 mt-auto">
          <hr className="bg-kiiraText mt-auto" />
          <AppTypography variant="h6" className="font-montserrat text-kiiraDark font-bold text-xs">
            ${service?.price}
          </AppTypography>

          <Button
            size="sm"
            className="w-32 rounded-full text-[8px] bg-kiiraBlue"
            onClick={() => {
              Mixpanel.track(
                `${
                  !isEmpty(appointedDoctor)
                    ? "Appointment selected! -> via Doctor's List"
                    : 'Appointment selected! -> via appointment list'
                }`
              );
              navigate(`${ROUTES.CHOOSE_APPOINTMENT}/appointment-type`, {
                state: { service, ...(!isEmpty(appointedDoctor) && { doctor: appointedDoctor }) }
              });
            }}>
            Book now
          </Button>
        </ContentContainer>
      </ContentContainer>
    </ServiceContainer>
  );
};

export default ServiceCard;

ServiceCard.propTypes = {
  service: object,
  appointedDoctor: object
};
