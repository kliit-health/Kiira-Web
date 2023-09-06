import React, { useEffect, useState } from 'react';
import {
  AppTypography,
  ContentContainer,
  CustomSelectInput,
  SelectWrapper
} from '../../shared/styledComponents';
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select
} from '@material-tailwind/react';
import isEmpty from 'src/utils/isEmpty';
import { bool, string } from 'prop-types';
import { usePaymentMethods } from 'src/queries/queryHooks';
import { PaymentCardDetails } from '../..';
import { useLocalStore } from 'src/store';
import { Bars } from 'react-loader-spinner';

const PaymentMethods = ({ manageCards, isReserved, addNewCardLabel }) => {
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState('');
  const toggleOpen = () => setOpen(!open);
  const selectedPaymentMethod = useLocalStore((state) => state.selectedPaymentMethod);

  const { data: paymentMethodData, isLoading: intentsloading } = usePaymentMethods();
  const paymentMethods = paymentMethodData?.data?.payment_methods;

  const setSelectedPaymentMethod = useLocalStore((state) => state.setSelectedPaymentMethod);

  useEffect(() => {
    if (isEmpty(paymentMethods)) return;
    setSelectedPaymentMethod(paymentMethods[0]);
    // setSelectedID(paymentMethods[0]?.id);
  }, [paymentMethods]);

  const handleChange = (selectedID) => {
    if (selectedID === 'new' || isEmpty(paymentMethods)) {
      setSelectedPaymentMethod({});
      return;
    }
    paymentMethods?.filter((intent) => {
      if (intent?.id === selectedID) {
        setSelectedPaymentMethod(intent);
        return true;
      }
      return false;
    });
  };

  return (
    <ContentContainer className="w-full my-2 max-w-sm gap-2">
      {/* 
      Dropdown  Disabled / hidden payment card details */}
      <ContentContainer className="hidden">
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
              className="flex flex-row items-center justify-between border-2 opacity-100 relative">
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
              <ContentContainer row className="w-full items-center justify-center min-w-min">
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
      </ContentContainer>

      <Button
        disabled
        variant="filled"
        className=" flex flex-row items-center justify-between border-2 opacity-100 relative">
        <span className="text-xs w-full text-center">Select a payment method</span>
      </Button>

      {intentsloading ? (
        <ContentContainer row className="w-full items-center justify-center min-w-min">
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

      {!isEmpty(paymentMethods) && !intentsloading ? (
        <SelectWrapper>
          <CustomSelectInput
            placeholder={`Select payment method`}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            className="font-montserrat bg-transparent overflow-x-hidden font-semibold uppercase">
            {paymentMethods?.map((data, i) => {
              return (
                <option key={i} name="intent" value={data?.id}>
                  <span className="bg-inherit mr-5">💳</span> {data?.brand} **** **** ****{' '}
                  {data?.last4}
                </option>
              );
            })}
            <option
              disabled={isReserved}
              name="intent"
              value="new"
              className="w-full my-2 flex flex-row font-semibold">
              <span className="bg-inherit mr-5">💳</span> Use new payment card
            </option>
          </CustomSelectInput>
        </SelectWrapper>
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
