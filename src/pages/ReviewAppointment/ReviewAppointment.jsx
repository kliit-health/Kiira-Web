import { Breadcrumbs, Checkbox } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BookingCard,
  Discount,
  DynamicForms,
  Loader,
  PaymentCard,
  PaymentMethods,
  SavedCards
} from 'src/components';
import {
  AppButton,
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';
import {
  useBookingForms,
  useInitialisePayment,
  usePaymentMethods,
  useProfile
} from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import { useLocalStore } from 'src/store';
import { ScrollToTop, Toast } from 'src/utils';
import { APP_URL } from 'src/utils/constants';
import isEmpty from 'src/utils/isEmpty';
import { Mixpanel } from 'src/utils/mixpanelUtil';
import { truncate } from 'src/utils/truncate';

const ReviewAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: paymentMethodData } = usePaymentMethods();
  const paymentMethods = paymentMethodData?.data?.payment_methods;

  const { data: fData, isLoading: loadingForms, error: bookingFormError } = useBookingForms();
  const formsData = fData?.data.forms;

  const { data: profileData } = useProfile();
  const profile = profileData?.data?.user;

  const [reserveBooking, setReserveBooking] = useState(false);

  const selectedPaymentMethod = useLocalStore((state) => state.selectedPaymentMethod);
  const setSelectedPaymentMethod = useLocalStore((state) => state.setSelectedPaymentMethod);

  const [formResult, setFormResult] = useState({});
  const [showPaymentCard, togglePaymentCard] = useState(false);

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
        width: '70vw',
        ...(isEmpty(selectedPaymentMethod) && {
          target: document.getElementById('use-payment-card')
        })
      });
      return;
    }

    if (reserveBooking && (isEmpty(selectedPaymentMethod) || isEmpty(paymentMethods))) {
      Toast.fire({
        icon: 'error',
        title: `An existing payment card is required to reserve your appointment booking`,
        ...(isEmpty(selectedPaymentMethod) && {
          target: document.getElementById('use-payment-card')
        })
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
      success_url: `${APP_URL}${ROUTES.CONFIRM_BOOKING}`,
      cancel_url: `${APP_URL}${ROUTES.CONFIRM_BOOKING}`,
      book_on_hold: reserveBooking,
      fields: field,
      ...(!isEmpty(bookingData?.doctor) && { calendarID: bookingData?.doctor.id }),
      ...(!isEmpty(selectedPaymentMethod) &&
        !isEmpty(paymentMethods) && {
          payment_method_id: selectedPaymentMethod?.id
        })
    };
    console.log(
      '\n 🚀 ~ file: ReviewAppointment.jsx:152 ~ handleInitialisePayment ~ payload:',
      payload
    );

    mutate(payload, {
      onSuccess: (response) => {
        function viewBookingRedirect() {
          const booking = {
            ...response?.data?.availability_time,
            appointment: response?.data?.appointment
          };
          setSelectedPaymentMethod({});
          Mixpanel.track('Success - Appointment Booking ($0.00)');
          navigate(`${ROUTES.VIEW_BOOKING}/${response?.data?.booking_id}`, {
            state: booking
          });
        }

        function initiateCheckoutRedirect() {
          setSelectedPaymentMethod({});
          setTimeout(() => {
            Mixpanel.track(`Success - Appointment Booking ($${appointmentType?.price})`);
          }, 500);

          window.open(response?.data?.checkout_session?.url, '_self');
        }

        Toast.fire({
          icon: 'success',
          title: isEmpty(response?.data?.checkout_session)
            ? `<div className='text-xs capitalize'>${response?.data?.message}</div>`
            : `<div className='text-xs'>You are now been redirected to payment checkout</div>`
        });

        isEmpty(response?.data?.checkout_session)
          ? viewBookingRedirect()
          : initiateCheckoutRedirect();

        return;
      },
      onError: (error) => {
        Mixpanel.track('Failed - Appointment Booking Failed!', {
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error.response?.data?.message
              : error?.message,
            email: profile?.email,
            url: error?.response?.config?.url
          }
        });

        Toast.fire({
          icon: 'error',
          title: !isEmpty(error.response?.data?.message)
            ? error.response?.data?.message
            : error?.message
        });

        if (error?.response?.status === 423) {
          setTimeout(() => {
            Toast.fire({
              icon: 'error',
              title: 'Your current subscription has expired. Please renew your subscription'
            });
            navigate(ROUTES.SUBSCRIPTION);
          }, 1500);

          return;
        }
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

      <ContentContainer className="w-full h-full flex md:grid grid-flow-col  md:grid-flow-row-dense grid-cols-1 xl:grid-cols-5 gap-4 flex-wrap-reverse">
        <ContentContainer className="relative w-full gap-4 col-span-2 bg-kiiraBg2 rounded-lg p-4 visible xl:hidden">
          <BookingCard review bookingData={bookingData} />

          <AppTypography
            variant="lead"
            className="py-4 border-t border-b border-[#E7E7E7] text-xs md:text-sm font-montserrat w-full text-center flex flex-row flex-nowrap items-center justify-center">
            Secure payment by {/*<b>Stripe</b>*/}
            <img loading="lazy" src={IMAGES.Stripe} alt="Stripe" className="h-7 w-16" />
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

        <ContentContainer className="w-full gap-4 col-span-3 bg-kiiraBg2 rounded-lg  p-4">
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

          {/* <Discount /> */}

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
                  onChange={() => {
                    setReserveBooking(!reserveBooking);
                  }}
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
                  <>
                    {/* Card Options */}
                    <SavedCards
                      manageCards={false}
                      isReserved={reserveBooking}
                      isStrictlyPaymentSubscription={false}
                      isStrictlyOtherPayment={true}
                      addNewCardLabel="Use a new payment card"
                      showActionButton={false}
                    />

                    <AppButton className="text-xs mt-4" onClick={handleInitialisePayment}>
                      {reserveBooking ? 'Reserve' : ' Confirm Booking'}
                    </AppButton>
                  </>
                )}
              </ContentContainer>
            </>
          ) : null}
        </ContentContainer>

        {/* Booking Cart review */}
        <ContentContainer className="relative w-full gap-4 col-span-2 bg-kiiraBg2 rounded-lg  p-4 hidden xl:flex xl:max-h-[65vh]">
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
