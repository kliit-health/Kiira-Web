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
            <span className="text-xs">Choose a payment method</span>
            <i
              className={`fa-solid fa-angle-down transition-transform ${
                open ? 'rotate-180' : ''
              }`}></i>
          </Button>
        </MenuHandler>

        {intentsloading ? (
          <Bars
            height="80"
            width="80"
            color="#3F84FF"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : null}
        <MenuList className="max-h-[45vh]">
          {paymentMethods?.map((data, i) => {
            return (
              <MenuItem key={i}>
                <PaymentCardDetails
                  cardDetails={data}
                  key={i}
                  isLoading={intentsloading}
                  manageCards={manageCards}
                  defaultChecked={selectedPaymentMethod === data}
                />
              </MenuItem>
            );
          })}
          <MenuItem>
            <PaymentCardDetails
              disabled={isReserved}
              cardDetails={{}}
              defaultChecked={isEmpty(selectedPaymentMethod) && isEmpty(paymentMethods)}
              label={!isEmpty(addNewCardLabel) ? addNewCardLabel : 'Add new payment card'}
              isLoading={intentsloading}
              manageCards={manageCards}
            />
          </MenuItem>
        </MenuList>
      </Menu>

      {!isEmpty(selectedPaymentMethod) ? (
        <>
          <AppTypography
            variant="small"
            className="text-sm text-center mt-6 font-medium text-amber-900 font-montserrat">
            <i className="fa-solid fa-shield pr-4"></i> Your payment transaction will be completed
            using{' '}
          </AppTypography>

          <Button variant="text" size="sm" onclick={toggleOpen}>
            <PaymentCardDetails
              cardDetails={selectedPaymentMethod}
              defaultChecked={true}
              radioName="default"
            />
          </Button>
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
