import {
  Alert,
  Avatar,
  Breadcrumbs,
  Button,
  Dialog,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler
} from '@material-tailwind/react';
import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';
import { DividerIcon, ShareIcon } from 'src/components/shared/AppIcons/AppIcons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment-timezone';
import { truncate } from 'src/utils/truncate';
import { ScrollToTop, Toast } from 'src/utils';
import { useAppointmentHistoryByID, useCancelAppointment } from 'src/queries/queryHooks';
import QRCode from 'react-qr-code';
import { ThreeDots } from 'react-loader-spinner';
import { Empty } from 'src/components';
import { ConfirmBooking } from '..';
import { useQueryClient } from '@tanstack/react-query';
import KEYS from 'src/queries/queryKeys';

const ViewBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const downloadRef = useRef(null);
  const [hiddenElement, setHiddenElement] = useState(false);
  const { id } = useParams();
  const { data, isLoading, refetch } = useAppointmentHistoryByID(id);
  const booking = data?.data?.booking;

  const { mutate, isLoading: cancelLoading } = useCancelAppointment();
  // const booking = location?.state;

  const downloadPdfDocument = async () => {
    if (isEmpty(downloadRef?.current)) return;
    const element = downloadRef?.current;

    const pdf = new jsPDF({
      orientation: 'portrait',
      format: 'a4',
      unit: 'px'
    });
    const data = await html2canvas(element, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    });
    const img = data.toDataURL('image/png');
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Kiira Appointment - ${moment(booking?.datetime).format('MMM D, YYYY')}.pdf`);
    console.log('i got here');
    setHiddenElement(false);
  };

  const handleCancelAppointment = () => {
    if (!booking?.appointment?.canClientReschedule) {
      Toast.fire({
        icon: 'error',
        title: 'Appointment cannot be canceled'
      });
      return;
    }

    mutate(id, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: [KEYS.HISTORY] });
        refetch();
        Toast.fire({
          icon: 'success',
          title: response?.data?.message
        });
      },
      onError: (error) => {
        Toast.fire({
          icon: 'error',
          title: error.response?.data?.message
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
        <ScrollToTop />
        <Breadcrumbs
          separator={<i className="fa fa-angle-right text-kiiraText " aria-hidden="true"></i>}
          fullWidth
          className="w-auto bg-transparent">
          <AppNavLink
            to={ROUTES.HISTORY}
            className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
            History
          </AppNavLink>
          <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
            {booking?.appointment_type?.name}
          </AppNavLink>
        </Breadcrumbs>
      </ContentContainer>
      {isLoading && id !== 'undefined' ? (
        <ContentContainer className="flex flex-col h-full w-full min-h-[300px] items-center justify-center">
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
          <AppTypography
            variant="lead"
            color="blue"
            className="capitalise text-kiiraDark text-base font-poppins lg:text-2xl font-medium  w-full xl:w-3/4 text-center">
            Fetching Appointment
          </AppTypography>
        </ContentContainer>
      ) : null}

      {!isLoading && id !== 'undefined' ? (
        <ContentContainer
          ref={downloadRef}
          className="w-full h-full flex flex-col gap-6 p-2 xl:p-8 rounded-lg">
          <ContentContainer className="flex flex-row items-center justify-between flex-wrap md:flex-nowrap gap-4 w-full">
            <AppTypography
              variant="h6"
              color="blue"
              className="capitalise text-kiiraBlackishGreen text-lg lg:text-xl font-semibold">
              {booking?.appointment_type?.name}
            </AppTypography>
            <ContentContainer className="gap-2">
              <AppTypography
                variant="h4"
                className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
                ${booking?.checkout_session?.amount_total || 0}
              </AppTypography>

              {booking?.appointment?.canceled ? (
                <Button
                  size="sm"
                  variant="text"
                  className="text-sm text-red-500 font-poppins font-medium bg-transparent hover:shadow-none shadow-none ring-transparent capitalize p-0.5 ">
                  Appointment Cancelled
                </Button>
              ) : booking?.status === 'payment_ticketed' &&
                !hiddenElement &&
                !booking?.appointment?.canceled ? (
                <ContentContainer row className={'gap-2 items-center flex-wrap md:justify-end'}>
                  <Button
                    disabled={!booking?.appointment?.canClientReschedule}
                    onClick={() =>
                      navigate(
                        `${ROUTES.HISTORY}/${booking?.appointment?.id}${ROUTES.RESCHEDULE_APPOINTMENT}`,
                        {
                          state: { service: booking }
                        }
                      )
                    }
                    size="sm"
                    variant="text"
                    className="text-sm text-kiiraBlue font-poppins font-medium bg-transparent hover:bg-transparent hover:opacity-80 hover:shadow-none shadow-none ring-transparent capitalize p-0.5 ">
                    {!booking?.appointment?.canClientReschedule
                      ? 'Reschedule Unavailable'
                      : 'Reschedule Appointment'}
                  </Button>
                  <Popover
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 }
                    }}>
                    <PopoverHandler>
                      <Button
                        disabled={!booking?.appointment?.canClientCancel}
                        size="sm"
                        variant="text"
                        className="text-sm text-red-500 font-poppins font-medium bg-transparent hover:bg-transparent shadow-none ring-transparent capitalize p-0.5 px-2 ">
                        Cancel
                      </Button>
                    </PopoverHandler>
                    <PopoverContent className="max-w-[90vw] sm:max-w-[60vw]">
                      <ContentContainer className="items-center gap-1 ">
                        <ContentContainer className=" flex flex-col gap-1 text-[0.8rem]">
                          <p className="font-bold uppercase text-kiiraBlackishGreen">
                            Cancellation / No-Show Policy:
                          </p>
                          <p>
                            We require 48 hours of notice to cancel or reschedule an appointment,
                            otherwise, a 50% fee will apply.
                          </p>{' '}
                          <p>
                            If your appointment was canceled within 48 hours of your appointment
                            start time, you will be charged 50% of your appointment fee.
                          </p>
                          <p>
                            If your appointment was canceled prior to 48 hours then no worries, you
                            will not be charged!
                          </p>
                          <p>Thank you for your understanding!</p>
                          <p>
                            We are excited to serve you and we look forward to your appointment.
                          </p>
                          <b> Best, Kiira Team</b>
                        </ContentContainer>
                        <AppTypography
                          variant="small"
                          className="text-kiiraBlackishGreen  font-medium">
                          Proceed to cancel this appointment?
                        </AppTypography>{' '}
                        <Button
                          onClick={handleCancelAppointment}
                          size="sm"
                          variant="outlined"
                          className="text-sm text-red-500 font-poppins border border-red-500 font-medium bg-transparent hover:shadow-none hover:bg-transparent shadow-none ring-transparent capitalize p-0.5 px-2">
                          Continue
                        </Button>
                      </ContentContainer>
                    </PopoverContent>
                  </Popover>
                  <ContentContainer row className="gap-2 items-center flex-wrap">
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://kiira-hmp.netlify.app/history/view-booking/${id}`
                        );
                        Toast.fire({
                          icon: 'success',
                          html: `<span className="text-[10px]">Link copied to clipboard</span>`,
                          position: 'top-right'
                        });
                      }}
                      variant="text"
                      size="sm"
                      className="border border-kiiraBlue flex items-center justify-center">
                      <ShareIcon />
                    </IconButton>

                    <Button
                      className="capitalize bg-kiiraBlue shadow-none hover:shadow-none flex items-center justify-center"
                      size="md"
                      onClick={async () => {
                        setHiddenElement(true);
                        setTimeout(() => {
                          downloadPdfDocument();
                        }, 50);
                      }}>
                      Download
                    </Button>
                  </ContentContainer>
                </ContentContainer>
              ) : null}
            </ContentContainer>
          </ContentContainer>

          <ContentContainer className="gap-5 w-full h-full">
            <ContentContainer className="flex-row w-full shadow-none rounded-2xl gap-0 flex-wrap md:flex-nowrap">
              <ContentContainer className="w-full md:w-2/6 m-0 rounded-r-none p-4 justify-between bg-[#E8F0FF] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex-row md:flex-col  gap-2 flex-wrap xs:flex-nowrap">
                <ContentContainer className="w-full xs:w-auto items-center xs:items-start">
                  <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                    {moment(booking?.appointment_datetime).format('ddd MMM D,')}
                  </AppTypography>
                  <AppTypography color="gray" className="text-xs text-kiiraText/80 font-normal">
                    Date
                  </AppTypography>
                </ContentContainer>
                <DividerIcon className="rotate-0 sm:rotate-90 md:rotate-0 w-full xs:w-auto md:max-w-min " />
                <ContentContainer className="w-full xs:w-auto items-center xs:items-start">
                  <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                    {moment(booking?.appointment_datetime).format('HH:mm A')}
                  </AppTypography>
                  <AppTypography color="gray" className="text-xs text-kiiraText/80 font-normal">
                    Time
                  </AppTypography>
                </ContentContainer>
              </ContentContainer>

              <ContentContainer col className="w-full md:-ml-0.5 rounded-r-2xl">
                <ContentContainer className="flex-row items-center justify-between w-full h-24 bg-kiiraBlue p-2 gap-2 flex-wrap rounded-tr-none md:rounded-tr-2xl">
                  <ContentContainer
                    className="flex flex-row 1tems-center gap-1"
                    alignItems="center">
                    <Avatar
                      src={IMAGES?.dummyProfilePhoto}
                      alt=""
                      loading="lazy"
                      variant="circular"
                      size="md"
                      className="rounded-full bg-kiiraText/50"
                    />
                    <AppTypography
                      variant="h6"
                      color="blue"
                      className="text-white text-xs font-semibold font-poppins">
                      {booking?.appointment?.firstName} {booking?.appointment?.lastName}
                    </AppTypography>
                  </ContentContainer>
                  <AppTypography
                    variant="h6"
                    color="blue"
                    className="text-white text-xs text-right font-normal font-poppins">
                    {booking?.appointment_type?.name}
                  </AppTypography>
                </ContentContainer>

                <ContentContainer className="bg-kiiraBg2 gap-1 h-full justify-between p-3 flex-wrap lg:flex-nowrap rounded-br-2xl rounded-bl-2xl md:rounded-bl-none overflow-hidden">
                  <ContentContainer className="gap-2">
                    <p className="text-sm md:text-base overflow-auto break-words ">
                      <b className="font-bold">Booking ID: </b>{' '}
                      <span className="">{booking?.id}</span>
                    </p>

                    {!isEmpty(booking?.reference) ? (
                      <p className="text-sm md:text-base overflow-auto break-words">
                        <b className="font-bold">Payment Ref:</b>{' '}
                        <span className="">{booking?.reference}</span>
                      </p>
                    ) : null}
                  </ContentContainer>
                  <ContentContainer className="w-full flex-row gap-1 flex-wrap sm:flex-nowrap justify-between">
                    <ContentContainer>
                      {!isEmpty(booking?.calendar?.name) ? (
                        <AppTypography
                          variant="h4"
                          color="blue-gray"
                          className="text-base md:text-2xl my-2">
                          {booking?.calendar?.name}
                        </AppTypography>
                      ) : (
                        <AppTypography variant="h6" color="blue-gray" className="text-base my-2">
                          Any available doctor
                        </AppTypography>
                      )}
                      {!isEmpty(booking?.calendar?.description) ? (
                        <AppTypography
                          color="gray"
                          className="text-xs text-kiiraText/60 font-normal break-words">
                          {truncate(booking?.calendar?.description, 100)}
                        </AppTypography>
                      ) : null}
                    </ContentContainer>
                    <ContentContainer className="h-12 w-12 md:h-24 md:w-24 min-w-[50px] min-h-[50px] ml-auto mt-auto">
                      <QRCode
                        value={`https://kiira-hmp.netlify.app/history/view-booking/${booking?.id}`}
                        size={256}
                        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                        viewBox={`0 0 256 256`}
                      />
                    </ContentContainer>
                  </ContentContainer>
                </ContentContainer>
              </ContentContainer>
            </ContentContainer>

            {!isEmpty(booking) ? (
              <ContentContainer className="flex flex-col gap-4 w-full flex-wrap lg:flex-nowrap whitespace-pre-wrap">
                {booking?.status === 'payment_failed' ? (
                  <Alert
                    variant="gradient"
                    color="red"
                    open={true}
                    className="uppercase whitespace-pre-wrap font-bold"
                    icon={
                      <IconButton variant="text" className="">
                        <i className="fa fa-bullhorn text-white text-2xl" aria-hidden="true"></i>
                      </IconButton>
                    }>
                    <span className="flex flex-row flex-wrap h-full w-full items-center text-center text-white">
                      Payment Booking Failed
                    </span>
                  </Alert>
                ) : booking?.status !== 'payment_ticketed' ? (
                  <Alert
                    variant="gradient"
                    color="amber"
                    open={true}
                    className="uppercase whitespace-pre-wrap font-bold"
                    icon={
                      <IconButton variant="text" className="">
                        <i className="fa fa-bullhorn text-white text-2xl" aria-hidden="true"></i>
                      </IconButton>
                    }>
                    <span className="flex flex-row flex-wrap h-full w-full items-center text-center text-white">
                      Booking process has not been completed...
                    </span>
                  </Alert>
                ) : (
                  booking?.appointment?.formsText
                )}
                <ContentContainer className=" bg-kiiraBg2 rounded p-4 flex flex-col gap-1 text-[0.8rem]">
                  <p className="font-bold uppercase text-kiiraBlackishGreen">
                    Cancellation / No-Show Policy:
                  </p>
                  <p>
                    We require 48 hours of notice to cancel or reschedule an appointment, otherwise,
                    a 50% fee will apply.
                  </p>
                  <p>
                    If your appointment was canceled within 48 hours of your appointment start time,
                    you will be charged 50% of your appointment fee.
                  </p>
                  <p>
                    If your appointment was canceled prior to 48 hours then no worries, you will not
                    be charged!
                  </p>
                  <p>Thank you for your understanding!</p>
                  <p>We are excited to serve you and we look forward to your appointment.</p>
                  <b> Best, Kiira Team</b>
                </ContentContainer>
              </ContentContainer>
            ) : null}
          </ContentContainer>
        </ContentContainer>
      ) : null}

      {!isLoading && isEmpty(booking) ? (
        <ContentContainer className="flex flex-col h-full w-full min-h-[300px] items-center justify-center">
          <Empty />
        </ContentContainer>
      ) : null}

      {id === 'undefined' ? (
        <ContentContainer className="flex flex-col h-full w-full min-h-[300px] items-center justify-center">
          <Empty label={<ConfirmBooking />} />
        </ContentContainer>
      ) : null}

      <Dialog open={cancelLoading} size="sm" className="bg-transparent">
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
    </ContentContainer>
  );
};

ViewBooking.propTypes = {};

export default ViewBooking;
