import React from 'react';
import { AppTypography, ContentContainer } from '../../shared/styledComponents';
import {
  Button,
  Dialog,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
  Radio
} from '@material-tailwind/react';
import { bool, func, object, string } from 'prop-types';
import { useLocalStore } from 'src/store';
import { useDeleteUserCard } from 'src/queries/queryHooks';
import { ThreeDots } from 'react-loader-spinner';
import isEmpty from 'src/utils/isEmpty';
import { useQueryClient } from '@tanstack/react-query';
import KEYS from 'src/queries/queryKeys';
import { Mixpanel } from 'src/utils/mixpanelUtil';
import { Toast } from 'src/utils';

const PaymentCardDetails = ({
  label,
  cardDetails,
  isLoading,
  manageCards,
  defaultChecked,
  disabled
}) => {
  const PaymentCardWrapperClass =
    'flex-nowrap rounded-xl bg-kiiraBlue p-1.5 flex flex-row items-center justify-between gap-1 hover:opacity-95 hover:cursor-pointer max-w-sm my-1';
  const queryClient = useQueryClient();
  const setSelectedPaymentMethod = useLocalStore((state) => state.setSelectedPaymentMethod);

  const handleChange = (data) => {
    isEmpty(cardDetails) ? setSelectedPaymentMethod({}) : setSelectedPaymentMethod(data);
  };

  const { mutate, isLoading: deleteCardLoading } = useDeleteUserCard();

  const handleDeleteSavedCards = (data) => {
    mutate(data?.id, {
      onSuccess: () => {
        setSelectedPaymentMethod({});
        queryClient.invalidateQueries({ queryKey: [KEYS.PAYMENT_METHODS] });
        Toast.fire({
          icon: 'success',
          title: `Payment Card removed successfully`
        });
      },
      onError: (error) => {
        console.log('\n 🚀 ~ file: Subscription.jsx:69 ~ handleCancelSubscription ~ error:', error);
        Mixpanel.track('Error: Delete Saved Cards: ->', {
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error?.response?.data?.message
              : error?.message,
            url: error?.response?.config?.url
          }
        });
        Toast.fire({
          icon: 'error',
          title: !isEmpty(error.response?.data?.message)
            ? error.response?.data?.message
            : error?.message
        });
      }
    });
  };

  return (
    <>
      <ContentContainer
        className={
          isLoading
            ? PaymentCardWrapperClass + ' animate-pulse'
            : disabled
            ? PaymentCardWrapperClass +
              ' opacity-80 cursor-not-allowed  hover:opacity-80 bg-gray-700'
            : PaymentCardWrapperClass
        }>
        <ContentContainer className="flex flex-row flex-wrap xs:flex-nowrap gap-2 md:gap-5 items-center w-full">
          <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 bg-inherit  p-1 md:h-8 md:w-8 rounded-full">
            {cardDetails?.brand === 'visa' ? (
              <i className="fa-brands fa-cc-visa text-white text-xl"></i>
            ) : cardDetails?.brand === 'mastercard' ? (
              <i className="fa-brands fa-cc-mastercard text-white text-xl"></i>
            ) : (
              <i className="fa-solid fa-credit-card text-white text-xl"></i>
            )}
          </ContentContainer>
          {label ? (
            <AppTypography
              variant="small"
              className="text-xs md:text-sm text-white font-semibold text-right flex flex-row items-center gap-1.5 w-full p-0">
              <span className=" font-montserrat font-bold">{label}</span>
            </AppTypography>
          ) : (
            <AppTypography
              variant="small"
              className="text-xs md:text-sm text-white font-semibold text-right flex flex-row items-center gap-1.5 w-full p-0">
              <span>****</span> <span>****</span> <span>****</span>{' '}
              <span className=" font-montserrat font-bold">{cardDetails?.last4}</span>
            </AppTypography>
          )}
        </ContentContainer>

        <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
          {manageCards && !isEmpty(cardDetails) ? (
            <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
              <Popover
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 }
                }}>
                <PopoverHandler>
                  <IconButton
                    variant="outlined"
                    className="font-bold text-white lowercase p-1 border-none font-montserrat ">
                    <i className="fa-solid fa-trash-can text-white text-base"></i>
                  </IconButton>
                </PopoverHandler>
                <PopoverContent className="max-w-[90vw]">
                  <ContentContainer className="items-center gap-1 ">
                    <AppTypography variant="small" className="text-kiiraBlackishGreen font-medium">
                      Do you wish to remove payment card <br />
                      <span className="text-red-500 font-bold font-manrope ">
                        **** **** **** {cardDetails?.last4}
                      </span>{' '}
                      from your profile?
                    </AppTypography>{' '}
                    <Button
                      onClick={() => handleDeleteSavedCards(cardDetails)}
                      size="sm"
                      variant="outlined"
                      className="text-sm text-red-500 font-poppins border border-red-500 font-medium bg-transparent hover:shadow-none hover:bg-transparent shadow-none ring-transparent capitalize p-0.5 px-2">
                      Continue
                    </Button>
                  </ContentContainer>
                </PopoverContent>
              </Popover>
            </ContentContainer>
          ) : (
            <Radio
              disabled={isLoading || disabled}
              name="payment_methods"
              onChange={() => handleChange(cardDetails)}
              color="amber"
              defaultChecked={defaultChecked}
              className="border-2 border-white "
            />
          )}
        </ContentContainer>
      </ContentContainer>

      <Dialog open={deleteCardLoading} size="sm" className="bg-transparent">
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
          <AppTypography
            variant="small"
            className="text-sm text-kiiraBlackishGreen font-poppins w-full text-center mb-2 font-semibold px-5">
            Removing payment card from profile...
          </AppTypography>
        </ContentContainer>
      </Dialog>
    </>
  );
};

export default PaymentCardDetails;

PaymentCardDetails.propTypes = {
  cardDetails: object,
  isLoading: bool,
  manageCards: bool,
  label: string,
  defaultChecked: bool,
  disabled: bool
};

PaymentCardDetails.defaultProps = {
  cardDetails: {},
  isLoading: false,
  manageCards: false,
  label: '',
  defaultChecked: false,
  disabled: false
};
