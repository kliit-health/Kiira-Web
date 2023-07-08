import { Breadcrumbs, Button, Dialog, IconButton } from '@material-tailwind/react';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BookingCalendar, DoctorsCard, Loader } from 'src/components';
import {
  AppButton,
  AppLinkExternal,
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES, kiiraDoctors, kiiraServices } from 'src/data';
import { useDoctorsCalendars, useRescheduleAppointment } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import Swal from 'sweetalert2';

const RescheduleAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, error } = useDoctorsCalendars();
  const { mutate, isLoading } = useRescheduleAppointment();

  const errorMsg = error?.response?.data?.message || error?.message;
  useEffect(() => {
    if (!error) return;
    Toast.fire({
      icon: 'error',
      title: errorMsg
    });
  }, [error]);

  const doctors = data?.data?.calendars;
  const [doctorsData, setDoctorsData] = useState(doctors);
  const [rescheduleData, setRescheduleData] = useState({});

  const { id } = useParams();
  const service = location.state?.service || {};

  const doc = doctorsData?.filter((elem) => elem?.id === service?.appointment?.calendarID);

  const doctorState = location.state?.doctor || !isEmpty(doc) ? doc[0] : {};

  useEffect(() => {
    if (isEmpty(doctors)) return;
    if (isEmpty(service)) return;
    const r = doctors?.filter((elem) =>
      service?.appointment_type?.calendarIDs?.find((id) => elem?.id === id)
    );
    setDoctorsData(r);
  }, [id, doctors, service]);

  const handleReschedule = () => {
    const payload = {
      id: service?.appointment?.id,
      datetime: rescheduleData?.bookingCheckout?.time,
      timezone: moment.tz.guess(true),
      ...(!isEmpty(doctorState) && { calendarID: doctorState?.id })
    };

    mutate(payload, {
      onSuccess: (response) => {
        console.log(
          '\n 🚀 ~ file: RescheduleAppointment.jsx:66 ~ handleReschedule ~ response:',
          response
        );
        Swal.fire({
          icon: 'success',
          title: 'Success',
          html: `<div className='text-xs'>${response?.message}</div>`,
          confirmButtonColor: 'blue',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(ROUTES.INDEX, { replace: true });
          }
        });
        return;
      },
      onError: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `<div className='text-xs'>${error.response?.data?.message}</div>`,
          confirmButtonColor: 'red',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      }
    });
  };

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
          {id === 'doctor' ? (
            <AppNavLink
              to={ROUTES.DOCTORS}
              className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
              Doctor
            </AppNavLink>
          ) : (
            <AppNavLink
              to={ROUTES.BOOK_APPOINTMENT}
              className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
              Book Appointment
            </AppNavLink>
          )}
          <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
            Reschedule Appointment
          </AppNavLink>
        </Breadcrumbs>
      </ContentContainer>

      <ContentContainer className="w-full h-full flex flex-col gap-4  p-4 bg-kiiraBg2 rounded-lg">
        <ContentContainer className="w-full gap-4">
          {!isEmpty(service) ? (
            <ContentContainer row className="flex justify-between flex-wrap md:flex-nowrap gap-4">
              <ContentContainer className="flex flex-col gap-3">
                <AppTypography
                  variant="h6"
                  color="blue"
                  className="capitalise text-kiiraBlackishGreen text-xl lg:text-2xl font-semibold">
                  {service?.appointment?.type}
                </AppTypography>
                <AppTypography
                  variant="lead"
                  className="text-sm text-kiiraText w-full xl:w-10/12 whitespace-pre-wrap">
                  {service?.description}
                </AppTypography>
              </ContentContainer>

              <ContentContainer col className="-mt-1 min-w-[120px]">
                <AppTypography
                  variant="h4"
                  className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
                  ${service?.appointment?.price}
                </AppTypography>
                <AppTypography
                  variant="lead"
                  className="text-sm md:text-right text-kiiraBlackishGreen font-montserrat leading-5">
                  {service?.appointment?.duration}mins session
                </AppTypography>
              </ContentContainer>
            </ContentContainer>
          ) : null}

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
                All Kiira members have a unique membership code that can be applied at checkout for
                a discount. If you do not have your "unique code", you may email us at{' '}
                <AppLinkExternal href="mailto:appointments@kiira.io" className="underline">
                  appointments@kiira.io
                </AppLinkExternal>{' '}
                for retrieval.
              </AppTypography>
              <ContentContainer className="w-full lg:w-auto mt-2 lg:mt-0">
                <AppTypography
                  variant="small"
                  className="font-medium text-kiiraBlue text-center text-sm cursor-pointer hover:opacity-75">
                  + Add Promo Code
                </AppTypography>
              </ContentContainer>
            </ContentContainer>
          </ContentContainer>

          <ContentContainer row className="flex-row flex-nowrap items-center justify-between mt-4">
            <AppTypography
              variant="h6"
              className="text-[#112211] font-semibold text-xs lg:text-base">
              Book your appointment with
            </AppTypography>
          </ContentContainer>

          <ContentContainer
            className="flex flex-row flex-nowrap gap-4 lg:gap-2 items-center overflow-hidden overflow-x-auto"
            hideScroll={true}>
            <div className="col">
              <DoctorsCard
                whiteBackground
                doctor={doctorState}
                selected={true}
                style={{ minWidth: '245px', maxWidth: '400px' }}
                hideBookingButton={true}
              />
            </div>
          </ContentContainer>

          <BookingCalendar
            onTimeSelect={(bookingParams) => setRescheduleData(bookingParams)}
            appointmentType={service}
            doctor={doctorState}
            selectedDate={rescheduleData?.bookingCheckout?.time}
          />

          {!isEmpty(rescheduleData) ? (
            isLoading ? (
              <Dialog open={true} size="sm" className="bg-transparent">
                <ContentContainer className="flex h-full w-full bg-white rounded-md  items-center justify-center">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#005eff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </ContentContainer>
              </Dialog>
            ) : (
              <AppButton
                size="md"
                background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
                className="text-sm font-bold text-white uppercase shadow-transparent mt-4"
                fullWidth
                onClick={handleReschedule}>
                Reschedule
              </AppButton>
            )
          ) : null}
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

RescheduleAppointment.propTypes = {};

export default RescheduleAppointment;
