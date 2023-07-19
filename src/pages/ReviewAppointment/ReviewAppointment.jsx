import { Breadcrumbs, Checkbox, IconButton } from '@material-tailwind/react';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingCard, DynamicForms, Loader, SavedCards } from 'src/components';
import {
  AppButton,
  AppLink,
  AppLinkExternal,
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';
import { useBookingForms, useInitialisePayment, useProfile } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import { useLocalStore } from 'src/store';
import { ScrollToTop, Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { truncate } from 'src/utils/truncate';
import Swal from 'sweetalert2';

const ReviewAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: fData, isLoading: loadingForms, error: bookingFormError } = useBookingForms();
  const formsData = fData?.data.forms;

  const { data: profileData } = useProfile();
  const profile = profileData?.data?.user;

  const [reserveBooking, setReserveBooking] = useState(false);
  const [formResult, setFormResult] = useState({});

  const bookingParams = location.state?.data;
  const getStoredBookingCheckout = useLocalStore((state) => state.bookingData);

  const { mutate, isLoading } = useInitialisePayment();

  const bookingData = !isEmpty(getStoredBookingCheckout) ? getStoredBookingCheckout : bookingParams;

  const appointmentType =
    bookingData?.appointmentType?.appointment_type || bookingData?.appointmentType;
  const appointmentFormIDs = appointmentType?.formIDs;

  const filteredFormData = formsData?.filter((elem) =>
    appointmentFormIDs?.find((id) => elem.id === id)
  );

  let requiredValidator = filteredFormData?.reduce((acc, formdata) => {
    formdata.fields?.forEach((form) => {
      return (acc[form.id] = form);
    });

    return acc;
  }, {});

  useEffect(() => {
    if (isEmpty(bookingData)) {
      Toast.fire({
        icon: 'error',
        title: 'No booking data found'
      });

      setTimeout(() => {
        navigate(-1, { replace: true });
      }, 1000);
    }
  }, [bookingData]);

  const handleInitialisePayment = () => {
    if (moment().isAfter(profile?.subscription_expiry_date, 'day')) {
      Toast.fire({
        icon: 'error',
        title: 'Your current subscription has expired. Please renew your subscription'
      });
      return;
    }

    const keys = Object.keys(formResult);

    const isRequired = keys.filter((key) => {
      if (requiredValidator[key]?.required && isEmpty(formResult[key])) {
        return true;
      }
      return false;
    });

    if (!isEmpty(isRequired)) {
      const validateData = isRequired[0];
      Toast.fire({
        icon: 'error',
        title: `Kindly complete all required forms to proceed...\n"${truncate(
          requiredValidator[validateData]?.name,
          50
        )}" is required`,
        width: '70vw'
      });
      return;
    }

    let field = [];

    Object.entries(formResult).forEach(([key, value]) => {
      if (isEmpty(value)) return;
      field.push({ id: key, value: value?.toString() });
    });

    const payload = {
      datetime: bookingData?.bookingCheckout?.time,
      appointmentTypeID: appointmentType.id,
      success_url: `https://kiira-hmp.netlify.app${ROUTES.CONFIRM_BOOKING}`,
      cancel_url: `https://kiira-hmp.netlify.app${ROUTES.CONFIRM_BOOKING}`,
      book_on_hold: reserveBooking,
      fields: field,
      ...(!isEmpty(bookingData?.doctor) && { calendarID: bookingData?.doctor.id })
    };
    console.log(
      '\n 🚀 ~ file: ReviewAppointment.jsx:104 ~ handleInitialisePayment ~ payload:',
      payload
    );

    mutate(payload, {
      onSuccess: (response) => {
        console.log(
          '\n 🚀 ~ file: ReviewAppointment.jsx:125 ~ handleInitialisePayment ~ response:',
          response
        );
        Swal.fire({
          icon: 'success',
          title: isEmpty(response?.data?.checkout_session) ? 'Successful' : 'Payment Initialised',
          html: isEmpty(response?.data?.checkout_session)
            ? `<div className='text-xs capitalize'>${response?.data?.message}</div>`
            : `<div className='text-xs'>You are now been redirected to payment checkout</div>`,
          confirmButtonColor: 'blue',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          function viewBookingRedirect() {
            const booking = {
              ...response?.data?.availability_time,
              appointment: response?.data?.appointment
            };
            navigate(`${ROUTES.VIEW_BOOKING}/${response?.data?.booking_id}`, {
              state: booking
            });
          }

          if (result.isConfirmed) {
            isEmpty(response?.data?.checkout_session)
              ? viewBookingRedirect()
              : window.open(response?.data?.checkout_session?.url, '_self');
          }
        });
        return;
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

      <ContentContainer className="w-full h-full flex md:grid grid-flow-col  md:grid-flow-row-dense grid-cols-1 xl:grid-cols-5 gap-4 flex-wrap-reverse  ">
        <ContentContainer className="w-full gap-4 col-span-3 bg-kiiraBg2 rounded-lg  p-4 ">
          <ContentContainer row className="flex justify-between flex-wrap md:flex-nowrap gap-4">
            <ContentContainer className="flex flex-col gap-3">
              <AppTypography
                variant="h6"
                color="blue"
                className="capitalise text-kiiraBlackishGreen text-xl lg:text-2xl font-semibold">
                {appointmentType?.name}
              </AppTypography>
            </ContentContainer>

            <ContentContainer col className="-mt-1 lg:gap-4">
              <AppTypography
                variant="h4"
                className="text-left md:text-right font-montserrat text-kiiraBlue/70 font-bold">
                ${appointmentType?.price}
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
          {/* <SavedCards /> */}

          <DynamicForms
            formsData={formsData}
            loadingForms={loadingForms}
            bookingFormError={bookingFormError}
            appointmentFormIDs={appointmentFormIDs}
            setFormResult={setFormResult}
          />

          {!loadingForms && isEmpty(bookingFormError) ? (
            <>
              <ContentContainer className="flex flex-row flex-nowrap items-center -ml-2.5 -mt-2.5">
                <Checkbox
                  name="booking"
                  color="orange"
                  iconProps={{ size: 'xs' }}
                  labelProps={{ className: 'py-0.5 rounded' }}
                  checked={reserveBooking}
                  className="p-1"
                  onChange={() => setReserveBooking(!reserveBooking)}
                />
                <span
                  className={[
                    reserveBooking
                      ? 'text-xs text-orange-400  font-bold uppercase'
                      : 'text-xs font-bold uppercase text-kiiraBlue bg-[#E2EDFF]  px-4 py-2 rounded-lg'
                  ]}>
                  Reserve this Appointment booking
                </span>
              </ContentContainer>

              <ContentContainer className="sticky top-10">
                {isLoading ? (
                  <Loader className="" />
                ) : (
                  <AppButton className="text-xs" onClick={handleInitialisePayment}>
                    {reserveBooking ? 'Reserve' : ' Confirm Booking'}
                  </AppButton>
                )}
              </ContentContainer>
            </>
          ) : null}
        </ContentContainer>

        {/* Booking Cart review */}
        <ContentContainer className="relative w-full gap-4 col-span-2 bg-kiiraBg2 rounded-lg  p-4 ">
          <BookingCard review bookingData={bookingData} />

          <AppTypography
            variant="lead"
            className="py-4 border-t border-b border-[#E7E7E7] text-xs md:text-sm font-montserrat w-full text-center">
            Secure payment by <b>Stripe</b>
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
                ${appointmentType?.price}
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
                ${appointmentType?.discount || 0}
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
                ${appointmentType?.taxes || 0}
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
                ${appointmentType?.serviceFee || 0}
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
              ${appointmentType?.price}
            </AppTypography>
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

ReviewAppointment.propTypes = {};

export default ReviewAppointment;
