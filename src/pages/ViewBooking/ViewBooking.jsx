import { Alert, Avatar, Breadcrumbs, Button, IconButton } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
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
import { Toast } from 'src/utils';
import { useAppointmentById } from 'src/queries/queryHooks';
import QRCode from 'react-qr-code';
import { ThreeDots } from 'react-loader-spinner';
import { Empty } from 'src/components';
import { ConfirmBooking } from '..';

const ViewBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const downloadRef = useRef(null);
  const [hiddenElement, setHiddenElement] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = useAppointmentById(id);
  const booking = location?.state;
  const appointment = data?.data?.appointment;

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
    pdf.save(`kiira-booking.pdf`);
    setHiddenElement(false);
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
          <AppNavLink
            to={ROUTES.HISTORY}
            className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
            History
          </AppNavLink>
          <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
            {booking?.appointment_type?.name || appointment?.type}
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
          className="w-full h-full flex flex-col gap-6 p-8 rounded-lg">
          <ContentContainer className="flex flex-row items-center justify-between flex-wrap md:flex-nowrap gap-4 w-full">
            <AppTypography
              variant="h6"
              color="blue"
              className="capitalise text-kiiraBlackishGreen text-lg lg:text-xl font-semibold">
              {booking?.appointment_type?.name || appointment?.type}
            </AppTypography>
            <ContentContainer className="gap-2">
              <AppTypography
                variant="h4"
                className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
                ${booking?.appointment_type?.price || appointment?.price}
              </AppTypography>
              {booking?.status === 'payment_ticketed' && !hiddenElement ? (
                <ContentContainer row className={'gap-2 items-center flex-wrap md:justify-end'}>
                  <Button
                    onClick={() =>
                      navigate(
                        `${ROUTES.HISTORY}/${
                          !isEmpty(booking?.appointment?.id)
                            ? booking?.appointment?.id
                            : appointment?.id
                        }${ROUTES.RESCHEDULE_APPOINTMENT}`,
                        {
                          state: { service: booking }
                        }
                      )
                    }
                    size="sm"
                    variant="text"
                    className="text-sm text-kiiraBlue font-poppins font-medium bg-transparent hover:shadow-none shadow-none ring-transparent capitalize p-0.5 ">
                    Reschedule Appointment
                  </Button>
                  <ContentContainer row className="gap-2 items-center flex-wrap">
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://kiira-hmp.netlify.app/history/view-booking/${
                            !isEmpty(booking?.appointment?.id)
                              ? booking?.appointment?.id
                              : appointment?.id
                          }`
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
            <ContentContainer className="flex-row w-full shadow-none rounded-2xl gap-0 overflow-hidden flex-wrap md:flex-nowrap">
              <ContentContainer className="w-full md:w-2/6 m-0 rounded-r-none p-4 justify-between bg-[#E8F0FF] flex-row md:flex-col  gap-2 flex-wrap xs:flex-nowrap">
                <ContentContainer className="w-full xs:w-auto items-center xs:items-start">
                  <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                    {moment(booking?.appointment_datetime || appointment?.datetime).format(
                      'ddd MMM D,'
                    )}
                  </AppTypography>
                  <AppTypography color="gray" className="text-xs text-kiiraText/80 font-normal">
                    Date
                  </AppTypography>
                </ContentContainer>
                <DividerIcon className="rotate-0 sm:rotate-90 md:rotate-0 w-full xs:w-auto md:max-w-min " />
                <ContentContainer className="w-full xs:w-auto items-center xs:items-start">
                  <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                    {moment(booking?.appointment_datetime || appointment?.datetime).format(
                      'HH:mm A'
                    )}
                  </AppTypography>
                  <AppTypography color="gray" className="text-xs text-kiiraText/80 font-normal">
                    Time
                  </AppTypography>
                </ContentContainer>
              </ContentContainer>

              <ContentContainer col className="w-full md:-ml-0.5">
                <ContentContainer className="flex-row items-center justify-between w-full h-24 bg-kiiraBlue p-2 gap-2 flex-wrap">
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
                      {booking?.appointment?.firstName || appointment?.firstName}{' '}
                      {booking?.appointment?.lastName || appointment?.lastName}
                    </AppTypography>
                  </ContentContainer>
                  <AppTypography
                    variant="h6"
                    color="blue"
                    className="text-white text-xs text-right font-normal font-poppins">
                    {booking?.appointment_type?.name || appointment?.type}
                  </AppTypography>
                </ContentContainer>

                <ContentContainer className="bg-kiiraBg2 flex-row h-full items-end justify-between p-3 flex-wrap md:flex-nowrap">
                  <ContentContainer>
                    {!isEmpty(booking?.calendar?.description || appointment?.calendar) ? (
                      <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                        {booking?.calendar?.name || appointment?.calendar}
                      </AppTypography>
                    ) : (
                      <AppTypography variant="h6" color="blue-gray" className="text-base">
                        Any available doctor
                      </AppTypography>
                    )}
                    {!isEmpty(booking?.calendar?.description) ? (
                      <AppTypography color="gray" className="text-xs text-kiiraText/60 font-normal">
                        {truncate(booking?.calendar?.description, 100)}
                      </AppTypography>
                    ) : null}
                  </ContentContainer>

                  <ContentContainer className="h-24 w-24 min-w-[100px] min-h-[100px]">
                    <QRCode
                      value={`https://kiira-hmp.netlify.app/history/view-booking/${appointment?.id}`}
                      size={256}
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      viewBox={`0 0 256 256`}
                    />
                  </ContentContainer>
                </ContentContainer>
              </ContentContainer>
            </ContentContainer>

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
                booking?.appointment?.formsText || appointment?.formsText
              )}
            </ContentContainer>
          </ContentContainer>
        </ContentContainer>
      ) : null}

      {!isLoading && isEmpty(booking) && isEmpty(appointment) ? (
        <ContentContainer className="flex flex-col h-full w-full min-h-[300px] items-center justify-center">
          <Empty />
        </ContentContainer>
      ) : null}

      {id === 'undefined' ? (
        <ContentContainer className="flex flex-col h-full w-full min-h-[300px] items-center justify-center">
          <Empty label={<ConfirmBooking />} />
        </ContentContainer>
      ) : null}
    </ContentContainer>
  );
};

ViewBooking.propTypes = {};

export default ViewBooking;
