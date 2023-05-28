import { Breadcrumbs, Checkbox, IconButton } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingCard, SavedCards } from 'src/components';
import {
  AppButton,
  AppLink,
  AppLinkExternal,
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES, kiiraServices } from 'src/data';
import { MainLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';

const ReviewAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [serviceSelected, setServiceSelected] = useState({});

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
              All Kiira members have a unique membership code that can be applied at checkout for a
              discount. If you do not have your "unique code", you may email us at{' '}
              <AppLinkExternal
                href="mailto:appointments@kiira.io"
                className="underline text-sm md:text-base ">
                appointments@kiira.io
              </AppLinkExternal>{' '}
              for retrieval.
            </AppTypography>
          </ContentContainer>

          {/* Card Options */}
          <SavedCards />
        </ContentContainer>

        {/* Booking Cart review */}
        <ContentContainer className="w-full gap-4 col-span-2 bg-kiiraBg2 rounded-lg  p-4 ">
          <BookingCard review />
          <AppTypography
            variant="lead"
            className="py-4 border-t border-b border-[#E7E7E7] text-xs md:text-sm font-montserrat w-full text-center">
            Your booking is protected by <b>Acuity</b>
          </AppTypography>

          <ContentContainer className="flex-col gap-4">
            <AppTypography variant="lead" className="text-xs md:text-sm  w-full">
              Price Details
            </AppTypography>
            <ContentContainer className="flex-row items-center justify-between m-0 p-0">
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen font-medium">
                Base Fare
              </AppTypography>
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen text-right font-semibold">
                $150
              </AppTypography>
            </ContentContainer>
            <ContentContainer className="flex-row items-center justify-between m-0 p-0">
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen font-medium">
                Discount
              </AppTypography>
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen text-right font-semibold">
                $0
              </AppTypography>
            </ContentContainer>
            <ContentContainer className="flex-row items-center justify-between m-0 p-0">
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen font-medium">
                Taxes
              </AppTypography>
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen text-right font-semibold">
                $20
              </AppTypography>
            </ContentContainer>
            <ContentContainer className="flex-row items-center justify-between m-0 p-0">
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen font-medium">
                Service Fee
              </AppTypography>
              <AppTypography
                variant="h6"
                className="text-xs md:text-sm w-full text-kiiraBlackishGreen text-right font-semibold">
                $5
              </AppTypography>
            </ContentContainer>
          </ContentContainer>

          <hr />

          <ContentContainer className="flex-row items-center justify-between m-0 p-0">
            <AppTypography
              variant="h6"
              className="text-xs md:text-sm w-full text-kiiraBlackishGreen font-medium">
              Total
            </AppTypography>
            <AppTypography
              variant="h6"
              className="text-xs md:text-sm w-full text-kiiraBlackishGreen text-right font-semibold">
              $175
            </AppTypography>
          </ContentContainer>

          <ContentContainer className="flex flex-row flex-nowrap items-center -ml-2.5">
            <Checkbox iconProps={{ size: 'xs' }} labelProps={{ className: 'p-1 rounded' }} />
            <span className="text-xs text-kiiraText">
              I agree to all the <AppLink className="text-kiiraBlue text-xs">Terms</AppLink> and
              <AppLink className="text-kiiraBlue text-xs"> Privacy Policies</AppLink>
            </span>
          </ContentContainer>

          <AppButton className="text-xs" onClick={() => navigate(ROUTES.CONFIRM_BOOKING)}>
            Confirm Booking
          </AppButton>
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

ReviewAppointment.propTypes = {};

export default ReviewAppointment;
