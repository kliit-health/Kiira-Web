import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton
} from '@material-tailwind/react';
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
import { DividerIcon, ShareIcon } from 'src/components/shared/AppIcons/AppIcons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ViewBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState(null);

  const [serviceSelected, setServiceSelected] = useState({});
  console.log('🚀 ~ file: ViewBooking.jsx:20 ~ ViewBooking ~ serviceSelected:', serviceSelected);

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

  const downloadPdfDocument = () => {
    const element = document.getElementById('pdfRefId');
    html2canvas(element, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    });
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'px'
      });
      pdf.setFont('Poppins', 'normal');
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save(`kiira-booking.pdf`);
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
          <AppNavLink
            to={ROUTES.HISTORY}
            className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
            History
          </AppNavLink>
          <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
            {serviceSelected?.title || 'General Health Assessment'}
          </AppNavLink>
        </Breadcrumbs>
      </ContentContainer>

      <ContentContainer className="w-full h-full flex flex-col gap-6  p-4 rounded-lg">
        <ContentContainer className="flex flex-row items-center justify-between flex-wrap md:flex-nowrap gap-4 w-full">
          <AppTypography
            variant="h6"
            color="blue"
            className="capitalise text-kiiraBlackishGreen text-lg lg:text-xl font-semibold">
            {serviceSelected?.title || 'General Health Assessment'}
          </AppTypography>
          <ContentContainer className="gap-2">
            <AppTypography
              variant="h4"
              className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
              {serviceSelected?.fee || '$150.00'}
            </AppTypography>
            <ContentContainer row className="gap-2 items-center flex-wrap md:justify-end">
              <Button
                to="#"
                onClick={() =>
                  navigate(`${ROUTES.HISTORY}/mentalHealth${ROUTES.RESCHEDULE_APPOINTMENT}`)
                }
                variant="small"
                className="text-sm text-kiiraBlue font-poppins font-medium bg-transparent hover:shadow-none shadow-none ring-transparent capitalize p-0.5 ">
                Reschedule Appointment
              </Button>
              <ContentContainer row className="gap-2 items-center flex-wrap">
                <IconButton variant="text" size="sm" className="border border-kiiraBlue">
                  <ShareIcon />
                </IconButton>

                <Button
                  className="capitalize bg-kiiraBlue shadow-none hover:shadow-none"
                  size="md"
                  onClick={downloadPdfDocument}>
                  Download
                </Button>
              </ContentContainer>
            </ContentContainer>
          </ContentContainer>
        </ContentContainer>

        <ContentContainer className="gap-5 w-full h-full" id="pdfRefId">
          <ContentContainer className="flex-row w-full shadow-none rounded-2xl gap-0 overflow-hidden flex-wrap md:flex-nowrap">
            <ContentContainer className="w-full md:w-2/6 m-0 rounded-r-none p-4 justify-between bg-[#E8F0FF] flex-row md:flex-col  gap-2 flex-wrap xs:flex-nowrap">
              <ContentContainer className="w-full xs:w-auto items-center xs:items-start">
                <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                  Thur, Dec 8
                </AppTypography>
                <AppTypography color="gray" className="text-xs text-kiiraText/80 font-normal">
                  Date
                </AppTypography>
              </ContentContainer>
              <DividerIcon className="rotate-0 sm:rotate-90 md:rotate-0 w-full xs:w-auto md:max-w-min " />
              <ContentContainer className="w-full xs:w-auto items-center xs:items-start">
                <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                  1:00 PM
                </AppTypography>
                <AppTypography color="gray" className="text-xs text-kiiraText/80 font-normal">
                  Time
                </AppTypography>
              </ContentContainer>
            </ContentContainer>

            <ContentContainer col className="w-full md:-ml-0.5">
              <ContentContainer className="flex-row items-center justify-between w-full h-24 bg-kiiraBlue p-2 flex-wrap">
                <ContentContainer className="flex flex-row 1tems-center gap-1" alignItems="center">
                  <Avatar
                    src={IMAGES?.inboxImg}
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
                    James Doe
                  </AppTypography>
                </ContentContainer>
                <AppTypography
                  variant="h6"
                  color="blue"
                  className="text-white text-xs text-right font-normal font-poppins">
                  General Health Assessment
                </AppTypography>
              </ContentContainer>

              <ContentContainer className="bg-kiiraBg2 flex-row h-full items-end justify-between p-3 flex-wrap md:flex-nowrap">
                <ContentContainer>
                  <AppTypography variant="h4" color="blue-gray" className="text-2xl">
                    Dr. Candice Fraser
                  </AppTypography>
                  <AppTypography color="gray" className="text-xs text-kiiraText/60 font-normal">
                    Obstetrician and Gynecologist
                  </AppTypography>
                </ContentContainer>

                <ContentContainer className="h-24 w-24">
                  <img
                    src={IMAGES.QR}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </ContentContainer>
              </ContentContainer>
            </ContentContainer>
          </ContentContainer>

          <ContentContainer className="flex flex-col gap-4 w-full flex-wrap lg:flex-nowrap">
            <AppTypography variant="h6" className="text-kiiraBlackishGreen font-semibold text-lg">
              Terms and Conditions
            </AppTypography>
            <AppTypography
              variant="lead"
              className="text-sm text-kiiraBlackishGreen  w-full font-montserrat font-semibold">
              {/* {serviceSelected?.description} */}
              Kiira Health Inc. (“Kiira”, “we,” “us,” or “our”) respects your privacy and understand
              the importance of privacy to our users. We developed this Privacy Policy to explain
              how we collect, use, share, and protect Personal Information (defined below), and your
              choices about the collection and use of Personal Information. ‍ This Privacy Policy
              applies to Personal Information collected or processed through our products and
              services (the “Services”), and https://kiira.io and any other Kiira-operated website,
              app, or social media page that links to this Privacy Policy (collectively, the “Site
              and Services”).
              <br />
              <br />
              This Privacy Policy does not govern your healthcare provider’s (“Provider”) use of
              Personal Information or Protected Health Information (“PHI”) (as that term is defined
              under HIPAA) that you share with the Provider, whether or not through the Site or
              Services, in the course of receiving health services. For more information on your
              Provider’s use and disclosure of your PHI, please refer to your Provider’s Notice of
              Health Information Privacy Practices.
            </AppTypography>

            <AppLink to="#" className="font-poppins text-kiiraBlue font-medium text-sm">
              Read more
            </AppLink>
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

ViewBooking.propTypes = {};

export default ViewBooking;
