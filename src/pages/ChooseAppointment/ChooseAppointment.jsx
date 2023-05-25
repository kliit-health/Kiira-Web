import { Breadcrumbs, Button, IconButton } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DoctorsCard } from 'src/components';
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
import { Calendar, utils } from 'react-modern-calendar-datepicker';

const ChooseAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState(null);

  const [serviceSelected, setServiceSelected] = useState({});
  console.log(
    '🚀 ~ file: ChooseAppointment.jsx:20 ~ ChooseAppointment ~ serviceSelected:',
    serviceSelected
  );

  useEffect(() => {
    if (isEmpty(id)) return;

    let filteredService = {};

    kiiraServices.filter((service) => {
      if (service._id === id) {
        filteredService = service;
        return true;
      }
      setServiceSelected(filteredService);
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
            <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
              Choose Appointment
            </AppNavLink>
          </Breadcrumbs>
        </ContentContainer>

        <ContentContainer className="w-full h-full flex flex-col gap-4  p-4 bg-kiiraBg2 rounded-lg">
          <ContentContainer className="w-full gap-4">
            <ContentContainer row className="flex justify-between flex-wrap md:flex-nowrap gap-4">
              <ContentContainer className="flex flex-col gap-3">
                <AppTypography
                  variant="h6"
                  color="blue"
                  className="capitalise text-kiiraBlackishGreen text-xl lg:text-2xl font-semibold">
                  {serviceSelected?.title || 'General Health Assessment'}
                </AppTypography>
                <AppTypography variant="lead" className="text-sm text-kiiraText w-full xl:w-10/12">
                  {/* {serviceSelected?.description} */}
                  This is NOT a doctor's visit. The purpose is to get a general understanding of the
                  state of your health across all aspects and guide you through the next steps of
                  care. <br /> <br />A health assessment is a set of questions, answered by
                  patients, that asks about personal behaviors, risks, life-changing events, health
                  goals and priorities, and overall health to create a treatment plan best suitable
                  for you.
                </AppTypography>
              </ContentContainer>

              <ContentContainer col className="-mt-1 lg:gap-4">
                <AppTypography
                  variant="h4"
                  className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
                  {serviceSelected?.fee}
                </AppTypography>
                <AppTypography
                  variant="lead"
                  className="text-sm md:text-right text-kiiraBlackishGreen font-montserrat">
                  1 hr session
                </AppTypography>
              </ContentContainer>
            </ContentContainer>

            <ContentContainer className="flex flex-row gap-4 items-center w-full justify-between flex-wrap lg:flex-nowrap">
              <ContentContainer className="flex flex-row items-center justify-center rounded-2xl gap-4 bg-[#FFE9BA] p-4 w-full md:w-full lg:w-2/6 shadow-sm">
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

              <ContentContainer className="flex flex-row gap-1 w-full bg-white rounded-xl items-center justify-between p-4 flex-wrap">
                <AppTypography
                  variant="lead"
                  className="text-sm text-justify md:text-sm text-kiiraText w-full lg:w-3/4">
                  All Kiira members have a unique membership code that can be applied at checkout
                  for a discount. If you do not have your "unique code", you may email us at{' '}
                  <AppLinkExternal href="mailto:appointments@kiira.io" className="underline">
                    appointments@kiira.io
                  </AppLinkExternal>{' '}
                  for retrieval.
                </AppTypography>
                <AppLink to="#" className="w-full lg:w-auto mt-2 lg:mt-0">
                  <AppTypography
                    variant="small"
                    className="font-medium text-kiiraBlue text-center text-sm">
                    + Add Promo Code
                  </AppTypography>
                </AppLink>
              </ContentContainer>
            </ContentContainer>

            <ContentContainer
              row
              className="flex-row flex-nowrap items-center justify-between mt-4">
              <AppTypography
                variant="h6"
                className="text-[#112211] font-semibold text-xs lg:text-base">
                Book your appointment with
              </AppTypography>
              <Button
                variant="text"
                size="sm"
                className="text-xs rounded-2xl bg-kiiraBlue text-white py-1 px-5">
                <span className="text-[0.5rem]">Any Available</span>
              </Button>
            </ContentContainer>
            <ContentContainer
              className="flex flex-row flex-nowrap gap-4 lg:gap-2 items-center overflow-hidden overflow-x-auto"
              hideScroll={true}>
              {kiiraDoctors?.map((doctor, index) => {
                return (
                  <div className="col" key={index.toString()}>
                    <DoctorsCard
                      whiteBackground
                      doctor={doctor}
                      disabled={index !== 0}
                      style={{ minWidth: '245px' }}
                    />
                  </div>
                );
              })}
            </ContentContainer>

            <AppTypography
              variant="h6"
              className="text-[#112211] font-semibold text-xs lg:text-base w-full text-center">
              Choose a date
            </AppTypography>

            <CalendarWrapper className="col w-full flex-row flex-wrap lg:flex-nowrap gap-0.5 ">
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                minimumDate={utils().getToday()}
                calendarClassName="w-full lg:w-1/2 p-2 min-w-min shadow-none lg:rounded-r-none "
                calendarSelectedDayClassName="h-4 w-8 md:h-10 md:w-10 rounded-full"
                colorPrimary="#3F84FF"
              />
              <ContentContainer className="w-full lg:w-1/2 px-6 py-3 rounded-2xl lg:rounded-l-none bg-white flex col gap-4">
                <ContentContainer>
                  <AppTypography variant="lead" className="font-medium text-xs">
                    Thursday, April 16
                  </AppTypography>
                  <AppTypography variant="lead" className="font-medium text-xs">
                    TIME ZONE: <b>LAGOS (GMT+01:00)</b>
                  </AppTypography>
                </ContentContainer>

                <ContentContainer>
                  <div className="grid grid-flow-row md:grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      '12:00 AM',
                      '12:30 AM',
                      '1:00 AM',
                      '12:00 AM',
                      '12:30 AM',
                      '1:00 AM',
                      '12:00 AM',
                      '12:30 AM',
                      '1:00 AM'
                    ].map((time, index) => {
                      return (
                        <ContentContainer
                          onClick={() => navigate(ROUTES.REVIEW_APPOINTMENT)}
                          className="col bg-kiiraBg2 rounded-2xl flex items-center justify-center h-20 hover:shadow-md cursor-pointer "
                          key={index.toString()}>
                          <AppTypography variant="small" className="font-medium text-sm">
                            {time}
                          </AppTypography>
                        </ContentContainer>
                      );
                    })}
                  </div>
                </ContentContainer>
              </ContentContainer>
            </CalendarWrapper>
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    </MainLayout>
  );
};

ChooseAppointment.propTypes = {};

export default ChooseAppointment;
