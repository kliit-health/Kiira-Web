import { Breadcrumbs, Button, Card, IconButton, Radio } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import { AddButton, BookingCard, DoctorsCard, RadioCheckedIcon, VisaIcon } from 'src/components';
import {
  AppButton,
  AppLink,
  AppLinkExternal,
  AppNavLink,
  AppTypography,
  CalendarWrapper,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES, kiiraDoctors, kiiraServices } from 'src/data';
import { MainLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';

const ReviewAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [serviceSelected, setServiceSelected] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  console.log(
    '🚀 ~ file: ReviewAppointment.jsx:20 ~ ReviewAppointment ~ serviceSelected:',
    serviceSelected
  );

  useEffect(() => {
    if (isEmpty(id)) return;

    let service;

    kiiraServices?.filter((service) => {
      if (service._id === id) {
        setServiceSelected(service);
        return true;
      }
      return false;
    });
  }, [id]);

  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto">
        <ContentContainer
          className="w-full -mt-4 bg-kiiraBg2 border border-[#E4E7F3] rounded-lg overflow-hidden overflow-x-auto"
          hideScroll={true}>
          <Breadcrumbs
            separator={<i className="fa fa-angle-right text-kiiraText " aria-hidden="true"></i>}
            fullWidth
            className="w-auto bg-transparent">
            <AppNavLink
              to={ROUTES.BOOK_APPOINTMENT}
              className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
              Book Appointment
            </AppNavLink>
            <AppNavLink
              to="#"
              className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue"
              onClick={() => navigate(-1)}>
              Choose Appointment
            </AppNavLink>
            <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
              Review Appointment
            </AppNavLink>
          </Breadcrumbs>
        </ContentContainer>

        <ContentContainer className="w-full h-full flex md:grid grid-flow-col md:grid-flow-row-dense grid-cols-1 xl:grid-cols-5 gap-4 flex-wrap">
          <ContentContainer className="w-full gap-4 col-span-3 bg-kiiraBg2 rounded-lg  p-4 ">
            <ContentContainer row className="flex justify-between flex-wrap md:flex-nowrap gap-4">
              <ContentContainer className="flex flex-col gap-3">
                <AppTypography
                  variant="h6"
                  color="blue"
                  className="capitalise text-kiiraBlackishGreen text-xl lg:text-2xl font-semibold">
                  {serviceSelected?.title || 'General Health Assessment'}
                </AppTypography>
              </ContentContainer>

              <ContentContainer col className="-mt-1 lg:gap-4">
                <AppTypography
                  variant="h4"
                  className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
                  {serviceSelected?.fee || '$150.00'}
                </AppTypography>
              </ContentContainer>
            </ContentContainer>

            <ContentContainer className="flex flex-row gap-4 items-center w-full justify-between flex-wrap lg:flex-nowrap">
              <ContentContainer className="flex flex-row items-center justify-center rounded-2xl gap-4 bg-[#FFE9BA] p-4 w-full md:w-1/2 lg:w-1/2 shadow-sm">
                <IconButton variant="text" ripple={false}>
                  <IMAGES.KiiraBirdieBlack />
                </IconButton>
                <ContentContainer col className="gap-1 justify-center">
                  <AppTypography
                    variant="h6"
                    className="text-kiiraBlackishGreen font-semibold text-2xl">
                    $0.00
                  </AppTypography>
                  <AppTypography
                    variant="small"
                    className="capitalise text-kiiraBlackishGreen/60 text-[11px] md:text-sm font-semibold font-montserrat">
                    Members Discount
                  </AppTypography>
                </ContentContainer>
              </ContentContainer>

              <ContentContainer className="flex flex-row gap-1 rounded-xl items-center w-full md:w-auto justify-center md:justify-end  p-4">
                <AppLink to="#" className="w-full lg:w-auto mt-2 lg:mt-0">
                  <AppTypography
                    variant="small"
                    className="font-medium text-kiiraBlue text-center text-sm">
                    + Add Promo Code
                  </AppTypography>
                </AppLink>
              </ContentContainer>
            </ContentContainer>

            <ContentContainer className="flex flex-row gap-1 w-full bg-white rounded-xl items-center justify-between p-4 flex-wrap">
              <AppTypography
                variant="lead"
                className="text-sm text-justify md:text-base text-kiiraText w-full ">
                All Kiira members have a unique membership code that can be applied at checkout for
                a discount. If you do not have your "unique code", you may email us at{' '}
                <AppLinkExternal
                  href="mailto:appointments@kiira.io"
                  className="underline text-sm md:text-base ">
                  appointments@kiira.io
                </AppLinkExternal>{' '}
                for retrieval.
              </AppTypography>
            </ContentContainer>

            <Card className="flex flex-col gap-2 bg-kiiraBg2 shadow-none p-4 rounded-lg">
              <ContentContainer className="rounded-2xl bg-kiiraBlue p-1 md:p-5 flex flex-row items-center justify-between gap-1 flex-wrap hover:opacity-90 hover:cursor-pointer">
                <ContentContainer className="flex flex-row flex-nowrap gap-5 items-center">
                  <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 bg-kiiraBlue p-1 md:h-8 md:w-8 rounded-full">
                    <VisaIcon className="h-10 w-10" />
                  </ContentContainer>
                  <AppTypography
                    variant="small"
                    className="text-sm md:text-base text-white font-medium">
                    **** 4321 <span className="font-normal ml-3">02/27</span>
                  </AppTypography>
                </ContentContainer>
                <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
                  <ContentContainer className="flex flex-row items-center justify-center p-0.5 h-8 w-8 rounded-full">
                    {true ? <RadioCheckedIcon /> : <Radio id="white" name="color" color="white" />}
                  </ContentContainer>
                </ContentContainer>
              </ContentContainer>

              <AddButton label="Add a new card" />
            </Card>
          </ContentContainer>

          {/* Booking Cart review */}
          <ContentContainer className="w-full gap-4 col-span-2 bg-kiiraBg2 rounded-lg  p-4 ">
            <BookingCard review />
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    </MainLayout>
  );
};

ReviewAppointment.propTypes = {};

export default ReviewAppointment;
