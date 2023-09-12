import { Avatar, Button, Dialog, DialogBody } from '@material-tailwind/react';
import { useRef, useState } from 'react';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import isEmpty from 'src/utils/isEmpty';
import { DividerIcon } from 'src/components/shared/AppIcons/AppIcons';
import { ReactComponent as KiiraLogoSvg } from 'src/assets/images/KiiraLogo.svg';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment-timezone';
import { truncate } from 'src/utils/truncate';
import QRCode from 'react-qr-code';
import { object } from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { APP_URL } from 'src/utils/constants';
import useAuth from 'src/hooks/useAuth';

const SaveBooking = ({ booking }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const downloadRef = useRef(null);

  const downloadPdfDocument = async () => {
    if (isEmpty(downloadRef?.current)) return;
    try {
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
    } catch (error) {
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        className="capitalize bg-kiiraBlue shadow-none hover:shadow-none flex items-center justify-center"
        size="md"
        onClick={async () => {
          handleOpen();
          setTimeout(() => {
            downloadPdfDocument();
          }, 10);
        }}>
        Download
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xxl"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}>
        <DialogBody className="max-h-screen h-auto w-full min-w-[1440px] overflow-hidden overflow-y-auto relative">
          <ContentContainer className="h-full w-full absolute z-50 bg-kiiraBlackishGreen/60 items-center justify-center">
            {' '}
            <ThreeDots
              height="180"
              width="180"
              radius="9"
              color="#005eff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </ContentContainer>

          <ContentContainer
            ref={downloadRef}
            className={
              'w-full min-w-[1440px] max-w-max h-full flex flex-col gap-6 px-8 py-12 rounded-lg bg-white whitespace-normal'
            }>
            <ContentContainer className="-mb-6">
              <KiiraLogoSvg />
            </ContentContainer>
            <ContentContainer className="flex flex-row items-center justify-between flex-nowrap gap-4 w-full">
              <AppTypography
                variant="h6"
                color="blue"
                className="capitalise text-kiiraBlackishGreen text-xl font-semibold tracking-wide">
                {booking?.appointment_type?.name}
              </AppTypography>
              <ContentContainer className="gap-2">
                <AppTypography
                  variant="h4"
                  className="text-right font-montserrat text-kiiraBlue/70 font-bold tracking-wide">
                  ${booking?.checkout_session?.amount_total || 0}
                </AppTypography>
              </ContentContainer>
            </ContentContainer>

            <ContentContainer className="gap-5 w-full h-full">
              <ContentContainer className="flex-row w-full shadow-none rounded-2xl gap-0 flex-nowrap">
                <ContentContainer className="w-2/6 m-0 rounded-r-none p-4 justify-between bg-[#E8F0FF] rounded-l-2xl rounded-tr-none flex-col  gap-2 flex-nowrap">
                  <ContentContainer className="w-auto items-start">
                    <AppTypography
                      variant="h4"
                      color="blue-gray"
                      className="text-2xl tracking-wide">
                      {moment(booking?.appointment_datetime).format('ddd MMM D,')}
                    </AppTypography>
                    <AppTypography
                      color="gray"
                      className="text-xs text-kiiraText/80 font-normal tracking-wide">
                      Date
                    </AppTypography>
                  </ContentContainer>
                  <DividerIcon className="rotate-0 w-auto max-w-min " />
                  <ContentContainer className="w-auto items-start">
                    <AppTypography
                      variant="h4"
                      color="blue-gray"
                      className="text-2xl tracking-wide">
                      {moment(booking?.appointment_datetime).format('HH:mm A')}
                    </AppTypography>
                    <AppTypography
                      color="gray"
                      className="text-xs text-kiiraText/80 font-normal tracking-wide">
                      Time
                    </AppTypography>
                  </ContentContainer>
                </ContentContainer>

                <ContentContainer col className="w-full -ml-0.5 rounded-r-2xl">
                  <ContentContainer className="flex-row items-center justify-between w-full h-24 bg-kiiraBlue p-2 gap-2 flex-wrap rounded-tr-2xl">
                    <ContentContainer
                      className="flex flex-row 1tems-center gap-1"
                      alignItems="center">
                      <Avatar
                        src={user?.profile_pic_url || IMAGES.dummyProfilePhoto}
                        alt=""
                        loading="lazy"
                        variant="circular"
                        size="md"
                        className="rounded-full bg-kiiraText/50"
                      />
                      <AppTypography
                        variant="h6"
                        color="blue"
                        className="text-white text-xs font-semibold font-poppins tracking-wide">
                        {booking?.appointment?.firstName} {booking?.appointment?.lastName}
                      </AppTypography>
                    </ContentContainer>
                    <AppTypography
                      variant="h6"
                      color="blue"
                      className="text-white text-xs text-right font-normal font-poppins tracking-wide">
                      {booking?.appointment_type?.name}
                    </AppTypography>
                  </ContentContainer>

                  <ContentContainer className="bg-kiiraBg2 gap-1 h-full justify-between p-3 flex-nowrap rounded-br-2xl rounded-bl-2xl md:rounded-bl-none overflow-hidden">
                    <ContentContainer className="gap-2  min-h-max break-words ">
                      <AppTypography className="text-base overflow-auto break-words h-8 w-full">
                        <b className="font-bold tracking-wide">Booking ID: </b>{' '}
                        <span className="">{booking?.id}</span>
                      </AppTypography>

                      {!isEmpty(booking?.reference) ? (
                        <AppTypography className="text-base overflow-auto break-words h-8 w-full">
                          <b className="font-bold tracking-wide">Payment Ref:</b>{' '}
                          <span className="">{booking?.reference}</span>
                        </AppTypography>
                      ) : null}
                    </ContentContainer>
                    <ContentContainer className="w-full flex-row gap-1 flex-nowrap justify-between">
                      <ContentContainer>
                        {!isEmpty(booking?.calendar?.name) ? (
                          <AppTypography
                            variant="h4"
                            color="blue-gray"
                            className="text-2xl my-2 tracking-wider">
                            {booking?.calendar?.name}
                          </AppTypography>
                        ) : (
                          <AppTypography
                            variant="h6"
                            color="blue-gray"
                            className="text-base my-2 tracking-wide">
                            Any available doctor
                          </AppTypography>
                        )}
                        {!isEmpty(booking?.calendar?.description) ? (
                          <AppTypography
                            color="gray"
                            className="text-xs text-kiiraText/60 font-normal break-words tracking-wide">
                            {truncate(booking?.calendar?.description, 275)}
                          </AppTypography>
                        ) : null}
                      </ContentContainer>
                      <ContentContainer className="w-[200px] h-[100px] ml-auto mt-auto">
                        <QRCode
                          value={`${APP_URL}/history/view-booking/${booking?.id}`}
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
                <ContentContainer className="flex flex-col gap-4 w-full flex-nowrap whitespace-pre-wrap tracking-wide">
                  {booking?.appointment?.formsText}
                  <ContentContainer className=" bg-kiiraBg2 rounded p-4 flex flex-col gap-1 text-[0.8rem] mb-2">
                    <p className="font-bold uppercase text-kiiraBlackishGreen">
                      Cancellation / No-Show Policy:
                    </p>
                    <p>
                      We require 48 hours of notice to cancel or reschedule an appointment,
                      otherwise, a 50% fee will apply.
                    </p>
                    <p>
                      If your appointment was canceled within 48 hours of your appointment start
                      time, you will be charged 50% of your appointment fee.
                    </p>
                    <p>
                      If your appointment was canceled prior to 48 hours then no worries, you will
                      not be charged!
                    </p>
                    <p>Thank you for your understanding!</p>
                    <p>We are excited to serve you and we look forward to your appointment.</p>
                    <b>Best, Kiira Team</b>
                  </ContentContainer>
                </ContentContainer>
              ) : null}
            </ContentContainer>
          </ContentContainer>
        </DialogBody>
      </Dialog>
    </>
  );
};

SaveBooking.propTypes = {
  booking: object
};

SaveBooking.defaultPropTypes = {
  booking: {}
};

export default SaveBooking;
