import React, { useEffect, useState } from 'react';
import { ContentContainer, SelectWrapper } from '../../shared/styledComponents';
import {
  Button,
  Card,
  Collapse,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select
} from '@material-tailwind/react';
import isEmpty from 'src/utils/isEmpty';
import { bool, func } from 'prop-types';
import { usePaymentMethods } from 'src/queries/queryHooks';
import { PaymentCardDetails } from '../..';
import { useLocalStore } from 'src/store';
import { ThreeDots } from 'react-loader-spinner';

const PaymentMethods = ({ manageCards, isReserved }) => {
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
      {/* <Collapse open={open} className="my-2">
        <Card className="mx-auto w-full p-0">
          <ContentContainer
            className="overflow-y-auto min-h-[8vh] max-h-[50vh] p-2 rounded-md max-w-sm"
            hideScroll>
            {intentsloading ? (
              <ContentContainer className="w-full justify-center items-center">
                <ThreeDots
                  height="60"
                  width="60"
                  radius="9"
                  color="#005eff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </ContentContainer>
            ) : null} */}

      <Menu
        allowHover={false}
        open={open}
        handler={toggleOpen}
        dismiss={{
          itemPress: false
        }}>
        <MenuHandler>
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
        <MenuList>
          {paymentMethods?.map((data, i) => {
            return (
              <MenuItem key={i}>
                <PaymentCardDetails
                  cardDetails={data}
                  key={i}
                  isLoading={intentsloading}
                  manageCards={manageCards}
                  defaultChecked={i === 0}
                />
              </MenuItem>
            );
          })}
          <MenuItem>
            <PaymentCardDetails
              disabled={isReserved}
              cardDetails={{}}
              defaultChecked={isEmpty(selectedPaymentMethod) && isEmpty(paymentMethods)}
              label="Add new payment card"
              isLoading={intentsloading}
              manageCards={manageCards}
            />
          </MenuItem>
        </MenuList>
      </Menu>

      {/* </ContentContainer>
        </Card>
      </Collapse> */}
    </ContentContainer>
  );
};

export default PaymentMethods;

PaymentMethods.propTypes = {
  manageCards: bool,
  isReserved: bool
};
PaymentMethods.defaultProps = {
  manageCards: false,
  isReserved: false
};
