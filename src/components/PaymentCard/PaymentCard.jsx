import {
  Card,
  CardBody,
  Checkbox,
  Input,
  Select,
  Option,
  Alert,
  IconButton,
  Button
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { AppTypography, ContentContainer, SelectWrapper } from '../shared/styledComponents';
import { CloseIcon } from '../shared/AppIcons/AppIcons';
import { bool, func } from 'prop-types';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Toast } from 'src/utils';
import lookup from 'country-code-lookup';
import isEmpty from 'src/utils/isEmpty';
import countryList, { getCountryFlag } from 'src/utils/countryList';
import { useAddSubscriptionCard, usePlanSubscription, useProfile } from 'src/queries/queryHooks';
import { Loader } from '..';
import { useLocalStore } from 'src/store';
import { useQueryClient } from '@tanstack/react-query';
import KEYS from 'src/queries/queryKeys';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import Auth from 'src/middleware/storage';
import useAuth from 'src/hooks/useAuth';
import mixpanel from 'mixpanel-browser';
import { STRIPE_PK } from 'src/utils/constants';

const PaymentCard = (props) => {
  const [stripePromise] = useState(async () => {
    const initialiseStripe = await loadStripe(STRIPE_PK);
    return initialiseStripe;
  });

  return (
    <Elements stripe={stripePromise}>
      <PaymentCardElement {...props} />
    </Elements>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      iconColor: '#0c39ff',
      color: '#008814',
      fontWeight: 400,
      fontSize: '16px',
      fontFamily: 'Montserrat, Poppins, Open Sans, sans-serif',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883'
      },
      '::placeholder': {
        color: '#6F7888',
        fontWeight: '400',
        fontSize: '14px'
      }
    },
    invalid: {
      iconColor: '#ff0000',
      color: '#ff0000'
    }
  }
};

const PaymentCardElement = ({ dismissHandler, showCloseButton }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { data: userProfile, refetch: refetchProfileData } = useProfile();
  const profile = userProfile?.data?.user;
  const selectedPlan = useLocalStore((state) => state.storedData);
  const couponCode = useLocalStore((state) => state.coupon);
  const setCoupon = useLocalStore((state) => state.setCoupon);
  const queryClient = useQueryClient();
  const stripe = useStripe();
  const elements = useElements();
  const { mutate, isLoading } = usePlanSubscription();
  const { mutate: mutateAddCard, isLoading: addCardLoading } = useAddSubscriptionCard();

  const [err, setError] = useState({ e: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [field, setField] = useState({
    name: '',
    country: '',
    postalCode: ''
  });

  const handleCardTokenisation = async (event) => {
    setError({
      e: false,
      message: ''
    });
    event.preventDefault();

    if (isEmpty(selectedPlan) && pathname === ROUTES?.SIGINUP_SUBSCRIPTION) {
      setError({
        e: true,
        message: 'Please select a plan to proceed...'
      });
      return;
    }

    if (!stripe || !elements) {
      setError({
        e: true,
        message: `Please wait, payment gateway processing...`
      });

      setTimeout(() => {
        setError({
          e: false,
          message: ``
        });
      }, 3000);
      return;
    }

    if (isEmpty(field?.name) || !checked) {
      setError({
        e: true,
        message: isEmpty(field?.name)
          ? 'Name on Card is required'
          : 'Kindly confirm that all required fields have been fulfilled.'
      });
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    setLoading(true);

    try {
      //create token method
      const result = await stripe.createToken(cardElement, {
        name: field?.name,
        address_country: field.country,
        address_zip: field?.postalCode
      });

      if (result.error) {
        setLoading(false);
        setError({
          e: true,
          message: result?.error?.message
        });

        setTimeout(() => {
          setError({
            e: false,
            message: ''
          });
        }, 2500);
      } else {
        const payload = {
          card_token: result.token.id,
          ...(!isEmpty(selectedPlan?.id) && { product_id: selectedPlan?.id }),
          ...(!isEmpty(selectedPlan?.id) &&
            !isEmpty(couponCode?.coupon) && { coupon_code: couponCode?.coupon })
        };

        isEmpty(selectedPlan)
          ? mutateAddCard(
              {
                card_token: result.token.id
              },
              {
                onSuccess: (response) => {
                  elements.getElement(CardNumberElement).clear();
                  elements.getElement(CardExpiryElement).clear();
                  elements.getElement(CardCvcElement).clear();
                  setField({ name: '', country: '', postalCode: '' });
                  Auth.fetchUser();

                  mixpanel.track('Success - New Payment card Added', {
                    id: profile?.id,
                    data: {
                      first_name: profile?.first_name,
                      last_name: profile?.last_name,
                      email: profile?.email
                    }
                  });

                  Toast.fire({
                    icon: 'success',
                    title: `Payment Card added successfully`
                  });
                  refetchProfileData();
                  dismissHandler();
                },
                onError: (error) => {
                  mixpanel.track('Failed - Unable to add new payment card.', {
                    error: error,
                    data: {
                      id: profile?.id,
                      message: !isEmpty(error.response?.data?.message)
                        ? error.response?.data?.message
                        : error?.message,
                      first_name: profile?.first_name,
                      last_name: profile?.last_name,
                      email: profile?.email
                    }
                  });

                  setError({
                    e: true,
                    message: !isEmpty(error.response?.data?.message)
                      ? error.response?.data?.message
                      : error?.message
                  });
                }
              }
            )
          : mutate(payload, {
              onSuccess: (response) => {
                elements.getElement(CardNumberElement).clear();
                elements.getElement(CardExpiryElement).clear();
                elements.getElement(CardCvcElement).clear();
                setField({ name: '', country: '', postalCode: '' });
                Auth.fetchUser();

                mixpanel.track(
                  `Success - New subscription plan activated ${
                    !isEmpty(payload?.coupon_code) ? 'with Coupon' : null
                  } !`,
                  {
                    id: profile?.id,
                    data: {
                      first_name: profile?.first_name,
                      last_name: profile?.last_name,
                      email: profile?.email,
                      ...(!isEmpty(selectedPlan?.id) &&
                        !isEmpty(couponCode?.coupon) && { coupon_code: couponCode?.coupon })
                    }
                  }
                );

                queryClient.invalidateQueries({ queryKey: [KEYS.SUBSCRIPTION_HISTORY] });
                Toast.fire({
                  icon: 'success',
                  title: `Subscription successful`
                });
                setCoupon({ coupon: '' });
                refetchProfileData();
                if (pathname === ROUTES?.SIGINUP_SUBSCRIPTION) {
                  setTimeout(() => {
                    navigate(ROUTES.INDEX);
                  }, 1500);
                  return;
                }
                dismissHandler();
              },
              onError: (error) => {
                mixpanel.track('Failed - Subscription activation error', {
                  error: error,
                  data: {
                    id: profile?.id,
                    message: !isEmpty(error.response?.data?.message)
                      ? error.response?.data?.message
                      : error?.message,
                    first_name: profile?.first_name,
                    last_name: profile?.last_name,
                    email: profile?.email
                  }
                });

                setError({
                  e: true,
                  message: !isEmpty(error.response?.data?.message)
                    ? error.response?.data?.message
                    : error?.message
                });
              }
            });
      }
    } catch (error) {
      setError({
        e: true,
        message: error.response ? error.response?.data?.title : error?.toString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-auto 2xl:h-full shadow-none relative py-8">
      <CardBody className="flex flex-col h-full gap-6 px-2 py-4  xl:px-8 xl:py-8">
        {showCloseButton ? (
          <IconButton
            disabled={isLoading || loading || addCardLoading}
            variant="text"
            className="absolute right-2 top-2"
            onClick={dismissHandler}>
            <CloseIcon />
          </IconButton>
        ) : null}

        {pathname === ROUTES?.SUBSCRIPTION ? (
          <AppTypography
            variant="h6"
            className="text-black font-poppins font-normal text-xl md:text-3xl ">
            {!isEmpty(selectedPlan) ? (
              <span className="text-base md:text-2xl font-semibold">
                Subscribe to <br />
                <span className="text-kiiraBlue font-bold">{selectedPlan?.name}</span>
              </span>
            ) : (
              'Add a new Card'
            )}
          </AppTypography>
        ) : (
          <>
            <AppTypography variant="h2" className="text-[#252539] font-medium">
              Add payment
            </AppTypography>
            <AppTypography variant="small" className="text-base font-normal text-kiiraText -mt-2">
              Start enjoying amazing benefits as a member
            </AppTypography>
          </>
        )}
        <div className="flex flex-col w-full gap-5">
          <ContentContainer className="flex justify-center h-12 rounded-md  px-5 border border-[#B0BEC5]">
            <CardNumberElement
              options={{
                ...CARD_ELEMENT_OPTIONS,
                placeholder: 'Card Number',
                showIcon: true
              }}
            />
          </ContentContainer>

          <ContentContainer className="flex-row gap-4">
            <ContentContainer className="flex justify-center h-12 rounded-md  px-5 border border-[#B0BEC5] w-full">
              <CardExpiryElement options={{ ...CARD_ELEMENT_OPTIONS, placeholder: 'Exp. Date' }} />
            </ContentContainer>
            <ContentContainer className="flex justify-center h-12 rounded-md  px-5 border border-[#B0BEC5] w-full">
              <CardCvcElement options={{ ...CARD_ELEMENT_OPTIONS, placeholder: 'CVC' }} />
            </ContentContainer>
          </ContentContainer>

          <Input
            value={field?.name}
            onChange={(e) => {
              setError({ e: false, message: '' });
              setField({ ...field, name: e.target.value });
            }}
            label="Name on Card"
            size="lg"
            className="w-full font-montserrat"
            required
          />

          <SelectWrapper>
            <Select
              onChange={(country) => {
                setError({ e: false, message: '' });
                setField({ ...field, country: country });
              }}
              selected={(element) =>
                element &&
                React.cloneElement(element, {
                  className: 'flex items-center px-0 gap-2 pointer-events-none'
                })
              }
              lockScroll
              offset={5}
              className="font-montserrat"
              label="Country or Region"
              size="lg">
              {countryList
                ?.map((name) => {
                  const country = lookup.byCountry(name);
                  return (
                    <Option
                      key={name}
                      value={country?.iso2}
                      className="flex items-center gap-2 z-[999] font-montserrat">
                      <span className="text-2xl rounded-full">{getCountryFlag(country?.iso2)}</span>{' '}
                      {name}
                    </Option>
                  );
                })
                .sort(function (a, b) {
                  let x = a?.key.toLowerCase();
                  let y = b?.key.toLowerCase();
                  if (x > y) {
                    return 1;
                  }
                  if (x < y) {
                    return -1;
                  }
                  return 0;
                })}
            </Select>
          </SelectWrapper>
        </div>

        <div className="flex flex-row flex-nowrap items-center -ml-2.5">
          <Checkbox
            color="indigo"
            iconProps={{ size: 'xs' }}
            label="Securely save my information for 1-click checkout"
            labelProps={{ className: 'p-1 font-medium text-xs lg:text-sm -ml-2' }}
            checked={checked}
            onChange={() => {
              setError({ e: false, message: '' });
              setChecked(!checked);
            }}
          />
          <span className="text-red-500 text-xs">*</span>
        </div>

        {isLoading || loading || addCardLoading ? (
          <Loader className="mt-4" />
        ) : (
          <Button
            size="md"
            className="text-sm font-semibold text-white capitalize shadow-transparent bg-kiiraBlue"
            fullWidth
            onClick={handleCardTokenisation}>
            {isEmpty(selectedPlan) && pathname !== ROUTES?.SIGINUP_SUBSCRIPTION
              ? 'Add Card'
              : 'Subscribe'}
          </Button>
        )}
        {!isEmpty(couponCode?.coupon) && !isEmpty(selectedPlan) ? (
          <ContentContainer className="items-center">
            <span className="font-poppins font-medium -tracking-wide text-brown-600 text-sm text-center">
              Coupon code{' '}
              <span className="uppercase font-bold text-white text-sm bg-indigo-500 font-montserrat px-2 py-1 rounded">
                {couponCode?.coupon}
              </span>{' '}
              will be applied.
            </span>
          </ContentContainer>
        ) : null}

        <Alert
          open={err.e}
          className="text-white flex items-center font-medium text-sm"
          color="red"
          icon={<i className="fa-solid fa-triangle-exclamation h-6 w-6 text-white"></i>}
          action={
            <Button
              variant="text"
              color="white"
              size="sm"
              className="!absolute top-3 right-3 p-1"
              onClick={() => setError({ ...err, e: false })}>
              <i className="fa-regular fa-circle-xmark text-white text-xl"></i>
            </Button>
          }>
          {err.message}
        </Alert>
        <AppTypography
          variant="small"
          className="flex justify-center flex-wrap -mt-1 text-center text-xs text-kiiraText/75">
          By confirming your subscription, you allow Kiira health to charge your card for this
          payment and future payments in accordance with their terms. You can always cancel your
          subscription.
        </AppTypography>
      </CardBody>
    </Card>
  );
};

PaymentCard.propTypes = {
  dismissHandler: func,
  showCloseButton: bool
};

PaymentCard.defaultProps = {
  dismissHandler: () => {},
  showCloseButton: true
};

export default PaymentCard;
