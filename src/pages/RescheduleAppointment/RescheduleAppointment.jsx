import { Breadcrumbs } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingCalendar, DoctorsCard } from 'src/components';
import {
  AppButton,
  AppNavLink,
  AppTypography,
  CalendarWrapper,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { kiiraDoctors, kiiraServices } from 'src/data';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';
import { Calendar, utils } from 'react-modern-calendar-datepicker';

const RescheduleAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState(null);

  const [serviceSelected, setServiceSelected] = useState({});

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
                care. <br /> <br />A health assessment is a set of questions, answered by patients,
                that asks about personal behaviors, risks, life-changing events, health goals and
                priorities, and overall health to create a treatment plan best suitable for you.
              </AppTypography>
            </ContentContainer>

            <ContentContainer col className="-mt-1 lg:gap-4">
              <AppTypography
                variant="h4"
                className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
                {serviceSelected?.fee || '$150.00'}
              </AppTypography>
              <AppTypography
                variant="lead"
                className="text-sm md:text-right text-kiiraBlackishGreen font-montserrat">
                1 hr session
              </AppTypography>
            </ContentContainer>
          </ContentContainer>

          <ContentContainer row className="flex-row flex-nowrap items-center justify-between mt-4">
            <AppTypography
              variant="h6"
              className="text-[#112211] font-semibold text-xs lg:text-base">
              Your appointment with
            </AppTypography>
          </ContentContainer>
          <ContentContainer
            className="flex flex-row flex-nowrap gap-4 lg:gap-2 items-center overflow-hidden overflow-x-auto"
            hideScroll={true}>
            {kiiraDoctors
              ?.map((doctor, index) => {
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
              })
              .slice(0, 1)}
          </ContentContainer>

          <BookingCalendar
            dateLabel={
              <AppTypography
                variant="h6"
                className="text-[#112211] font-semibold text-xs lg:text-base w-full">
                Edit your date
              </AppTypography>
            }
          />

          <AppButton maxWidth onClick={() => navigate(ROUTES.HISTORY)}>
            Save
          </AppButton>
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

RescheduleAppointment.propTypes = {};

export default RescheduleAppointment;
