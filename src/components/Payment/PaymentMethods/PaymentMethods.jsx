import React, { useEffect, useState } from 'react';
import { ContentContainer } from '../../shared/styledComponents';
import { Button, Card, Collapse } from '@material-tailwind/react';
import isEmpty from 'src/utils/isEmpty';
import { bool, func } from 'prop-types';
import { usePaymentMethods } from 'src/queries/queryHooks';
import { PaymentCardDetails } from '../..';
import { useLocalStore } from 'src/store';

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
      <Button
        size="lg"
        variant="filled"
        onClick={toggleOpen}
        className=" border-2 opacity-100 relative">
        <i className="fa-solid fa-hand-holding-dollar font-bold pr-1"></i>{' '}
        <span className="text-xs">Choose a payment method</span>
      </Button>

      <Collapse open={open} className="my-2">
        <Card className="mx-auto w-full p-0">
          <ContentContainer
            className="overflow-y-auto min-h-[8vh] max-h-[50vh] p-2 rounded-md max-w-sm"
            hideScroll>
            {paymentMethods?.map((data, i) => {
              return (
                <PaymentCardDetails
                  cardDetails={data}
                  key={i}
                  isLoading={intentsloading}
                  manageCards={manageCards}
                  defaultChecked={i === 0}
                />
              );
            })}

            <PaymentCardDetails
              disabled={isReserved}
              cardDetails={{}}
              defaultChecked={isEmpty(selectedPaymentMethod) && isEmpty(paymentMethods)}
              label="Add new payment card"
              isLoading={intentsloading}
              manageCards={manageCards}
            />
          </ContentContainer>
        </Card>
      </Collapse>
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
