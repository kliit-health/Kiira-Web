import { Button, Card, Dialog, DialogBody } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { ContentContainer } from '../../shared/styledComponents';
import { useLocalStore } from 'src/store';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { AddButton, Loader, PaymentCard, PaymentMethods } from 'src/components';
import { Mixpanel } from 'src/utils/mixpanelUtil';
import Auth from 'src/middleware/storage';
import { useQueryClient } from '@tanstack/react-query';
import { usePlanSubscription, useProfile } from 'src/queries/queryHooks';
import KEYS from 'src/queries/queryKeys';

const SavedCards = ({ manageCards }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [open, setOpen] = useState(false);


  const queryClient = useQueryClient();
  const { refetch: refetchProfileData } = useProfile();
  const { mutate, isLoading } = usePlanSubscription();

  const selectedPaymentMethod = useLocalStore((state) => state.selectedPaymentMethod);
  const setSelectedPaymentMethod = useLocalStore((state) => state.setSelectedPaymentMethod);
  const selectedPlan = useLocalStore((state) => state.storedData);
  const setSelectedPlan = useLocalStore((state) => state.setStoredData);
  const couponCode = useLocalStore((state) => state.coupon);
  const setCoupon = useLocalStore((state) => state.setCoupon);

  const payWithExistingCard = async () => {
if(isEmpty(selectedPaymentMethod)){
  return
}

    const payload = {
      product_id: selectedPlan?.id,
      ...(!isEmpty(selectedPaymentMethod?.id) && { payment_method_id: selectedPaymentMethod?.id }),
      ...(!isEmpty(selectedPlan?.id) &&
        !isEmpty(couponCode?.coupon) && { coupon_code: couponCode?.coupon })
    };

    mutate(payload, {
      onSuccess: () => {
        Auth.fetchUser();
        Mixpanel.track(
          `Success - New subscription plan activated ${
            !isEmpty(payload?.coupon_code) ? 'with Coupon' : null
          } !`
        );

        queryClient.invalidateQueries({ queryKey: [KEYS.SUBSCRIPTION_HISTORY] });
        Toast.fire({
          icon: 'success',
          title: `Subscription successful`
        });
        setCoupon({ coupon: '' });
        setSelectedPaymentMethod({});
        setSelectedPlan({});
        refetchProfileData();
        if (pathname === ROUTES?.SIGINUP_SUBSCRIPTION) {
          setTimeout(() => {
            navigate(ROUTES.INDEX);
          }, 1500);
          return;
        }
      },
      onError: (error) => {
        Mixpanel.track('Failed - Subscription activation error', {
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error.response?.data?.message
              : error?.message,
            url: error?.response?.config?.url
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
  };

  const handleOpen = () => {
    !isEmpty(selectedPaymentMethod) ? payWithExistingCard() : setOpen(!open);
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    setSelectedPlan({});
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <>
      <Card className="flex flex-col gap-2 bg-kiiraBg2 shadow-none px-4 py-2 rounded-lg w-full">
        {!isEmpty(selectedPlan) ? (
          <ContentContainer className="bg-white gap-2 rounded-md p-2" hideScroll>
            <PaymentMethods manageCards={manageCards} />
          </ContentContainer>
        ) : null}

        {isLoading ? (
          <Loader label="Processing" />
        ) : (
          <AddButton
            label={isEmpty(selectedPlan) ? 'Add a new card' : 'Subscribe to selected plan'}
            onAddClick={() => {
              isEmpty(selectedPlan) && pathname === ROUTES?.SIGINUP_SUBSCRIPTION
                ? Toast.fire({
                    icon: 'warning',
                    title: 'Please select a subscription plan to proceed...'
                  })
                : handleOpen();
            }}
          />
        )}
      </Card>

      <Dialog
        open={open}
        size={
          windowSize?.innerWidth < 346
            ? 'xxl'
            : windowSize?.innerWidth > 345 && windowSize?.innerWidth < 1024
            ? 'xl'
            : 'sm'
        }
        className="w-full md:w-3/4"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}>
        <DialogBody className="overflow-hidden overflow-y-auto min-w-full ">
          <PaymentCard
            dismissHandler={() => {
              handleOpen();
              setSelectedPlan({});
            }}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SavedCards;
