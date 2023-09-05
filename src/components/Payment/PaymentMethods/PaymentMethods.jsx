import React, { useEffect, useState } from 'react';
import { AppTypography, ContentContainer } from '../../shared/styledComponents';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import isEmpty from 'src/utils/isEmpty';
import { bool, string } from 'prop-types';
import { usePaymentMethods } from 'src/queries/queryHooks';
import { PaymentCardDetails } from '../..';
import { useLocalStore } from 'src/store';
import { Bars } from 'react-loader-spinner';

const PaymentMethods = ({ manageCards, isReserved, addNewCardLabel }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const { data: paymentMethodData, isLoading: intentsloading } = usePaymentMethods();
  const paymentMethods = paymentMethodData?.data?.payment_methods;

  const selectedPaymentMethod = useLocalStore((state) => state.selectedPaymentMethod);

  const setSelectedPaymentMethod = useLocalStore((state) => state.setSelectedPaymentMethod);

  useEffect(() => {
    if (isEmpty(paymentMethods)) return;
    setSelectedPaymentMethod(paymentMethods[0]);
  }, [paymentMethods]);

  return (
    <ContentContainer className="w-full my-2 max-w-sm">
      <Menu
        allowHover={false}
        open={open}
        handler={toggleOpen}
        dismiss={{
          itemPress: false
        }}>
        <MenuHandler className="flex flex-row items-center justify-between bg-teal-500 w-full max-w-sm">
          <Button
            size="lg"
            variant="filled"
            className=" flex flex-row items-center justify-between border-2 opacity-100 relative">
            <i className="fa-solid fa-hand-holding-dollar font-bold pr-1"></i>{' '}
            <span className="text-xs">Choose a different payment method</span>
            <i
              className={`fa-solid fa-angle-down transition-transform ${
                open ? 'rotate-180' : ''
              }`}></i>
          </Button>
        </MenuHandler>

        <MenuList className="max-h-[45vh]">
          {intentsloading ? (
            <ContentContainer row className="w-full items-center justify-center min-w-[40vw]">
              <Bars
                height="20"
                width="40"
                color="#3F84FF"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </ContentContainer>
          ) : null}
          {paymentMethods?.map((data, i) => {
            return (
              <MenuItem key={i}>
                <PaymentCardDetails
                  cardDetails={data}
                  key={i}
                  radioName="payment-intent"
                  isLoading={intentsloading}
                  manageCards={manageCards}
                  defaultChecked={selectedPaymentMethod === data}
                />
              </MenuItem>
            );
          })}
          {!intentsloading ? (
            <MenuItem>
              <PaymentCardDetails
                disabled={isReserved}
                cardDetails={{}}
                defaultChecked={isEmpty(selectedPaymentMethod) && isEmpty(paymentMethods)}
                label={!isEmpty(addNewCardLabel) ? addNewCardLabel : 'Use new payment card'}
                isLoading={intentsloading}
                manageCards={manageCards}
                radioName="payment-intent"
              />
            </MenuItem>
          ) : null}
        </MenuList>
      </Menu>

      {!intentsloading ? (
        <>
          {!isEmpty(selectedPaymentMethod) ? (
            <>
              <AppTypography
                variant="small"
                className="text-sm text-center mt-6 font-medium text-amber-900 font-montserrat">
                <i className="fa-solid fa-shield pr-4"></i> Your payment will be completed using{' '}
              </AppTypography>

              <Button variant="text" size="sm" onClick={toggleOpen}>
                <PaymentCardDetails
                  cardDetails={selectedPaymentMethod}
                  defaultChecked={true}
                  radioName="default"
                />
              </Button>
            </>
          ) : (
            <AppTypography
              variant="small"
              className="text-sm mt-6 font-medium text-amber-900 font-montserrat">
              <i className="fa-solid fa-circle-exclamation pr-4"></i>{' '}
              {isReserved && isEmpty(selectedPaymentMethod)
                ? 'Kindly select an existing payment card to reserve your appointment booking'
                : 'Make one-time payment using new card'}
            </AppTypography>
          )}
        </>
      ) : null}
    </ContentContainer>
  );
};

export default PaymentMethods;

PaymentMethods.propTypes = {
  manageCards: bool,
  isReserved: bool,
  addNewCardLabel: string
};
PaymentMethods.defaultProps = {
  manageCards: false,
  isReserved: false,
  addNewCardLabel: ''
};
