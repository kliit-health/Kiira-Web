import {
  Button,
  Card,
  Dialog,
  DialogBody,
  Popover,
  PopoverContent,
  PopoverHandler
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { DownloadIcon, Empty, PdfIcon, SavedCards, SubscriptionPlans } from 'src/components';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';
import {
  useCancelSubscription,
  useProducts,
  useProfile,
  useSubscriptionHistory
} from 'src/queries/queryHooks';
import { ThreeDots } from 'react-loader-spinner';
import isEmpty from 'src/utils/isEmpty';
import { useLocalStore } from 'src/store';
import moment from 'moment-timezone';
import KEYS from 'src/queries/queryKeys';
import { Toast } from 'src/utils';
import Auth from 'src/middleware/storage';
import { useQueryClient } from '@tanstack/react-query';

const Subscription = () => {
  const queryClient = useQueryClient();
  const selectedPlan = useLocalStore((state) => state.storedData);
  const setSelectedPlan = useLocalStore((state) => state.setStoredData);
  const { data, isLoading } = useProducts();
  const { data: userProfile, refetch: refetchProfile } = useProfile();
  const profile = userProfile?.data?.user;
  const { mutate, isLoading: cancelLoading } = useCancelSubscription();
  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    refetch: refetchHistory
  } = useSubscriptionHistory();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const subscriptionHistory = subscriptionData?.data?.subscription_history;
  const products = data?.data?.products;
  const currentSubscriptionDetails = products?.find(
    (product) => profile?.subscription_id == product?.id
  );

  const handleCancelSubscription = () => {
    mutate(
      {},
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: [KEYS.SUBSCRIPTION_HISTORY, KEYS.PROFILE] });
          Toast.fire({
            icon: 'success',
            title: `Subscription cancelled successfully`
          });
          refetchProfile();
          refetchHistory();
          Auth.setUser(profile);
        },
        onError: (error) => {
         
          Toast.fire({
            icon: 'error',
            title: error.response?.data?.message
          });
        }
      }
    );
  };
  return (
    <MainLayout>
      <ContentContainer className="flex p-4 md:p-0 mb-6">
        {!isEmpty(subscriptionData) && !isEmpty(profile?.subscription_expiry_date) ? (
          <ContentContainer row className="flex-wrap gap-4 items-center justify-between">
            <ContentContainer>
              <AppTypography variant="h6" className="text-kiiraDark">
                You are currently on{' '}
                <span className="text-kiiraBlue">{currentSubscriptionDetails?.name}</span>
              </AppTypography>
              <AppTypography variant="small" className="text-kiiraText text-sm">
                Next payment on{' '}
                <span className="text-kiiraDark">
                  {moment(profile?.subscription_expiry_date).format('MMM DD, YYYY')}
                </span>
              </AppTypography>
            </ContentContainer>
            {moment().isSameOrBefore(profile?.subscription_expiry_date, 'day') ? (
              <Popover
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 }
                }}>
                <PopoverHandler>
                  <Button
                    size="sm"
                    variant="outlined"
                    className="bg-kiiraBg3 border border-red-500 text-red-600 text-sm capitalize font-poppins flex flex-row gap-1 items-center">
                    Cancel Subscription{' '}
                    <i className="fa-regular fa-circle-xmark text-red-600 text-lg"></i>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="max-w-[90vw]">
                  <ContentContainer className="items-center gap-1 ">
                    <AppTypography variant="small" className="text-kiiraBlackishGreen font-medium">
                      Do you wish to cancel{' '}
                      <span className="text-kiiraBlue font-bold font-manrope ">
                        {currentSubscriptionDetails?.name}
                      </span>{' '}
                      subscription?
                    </AppTypography>{' '}
                    <Button
                      onClick={handleCancelSubscription}
                      size="sm"
                      variant="outlined"
                      className="text-sm text-red-500 font-poppins border border-red-500 font-medium bg-transparent hover:shadow-none hover:bg-transparent shadow-none ring-transparent capitalize p-0.5 px-2">
                      Continue
                    </Button>
                  </ContentContainer>
                </PopoverContent>
              </Popover>
            ) : null}
          </ContentContainer>
        ) : null}
        {isEmpty(profile?.subscription_expiry_date) &&
        isEmpty(profile?.subscription_id) &&
        !isEmpty(profile?.stripe_customer_id) ? (
          <ContentContainer>
            <AppTypography variant="h6" className="text-kiiraDark">
              Subscription Cancelled{' '}
            </AppTypography>
            <AppTypography variant="small" className="text-red-600 font-semibold text-sm">
              You do not have an active subscription plan{' '}
            </AppTypography>
          </ContentContainer>
        ) : null}
      </ContentContainer>
      {isEmpty(selectedPlan) && !isLoading ? (
        <AppTypography
          variant="h4"
          className="text-[#252539] p-4 font-medium text-2xl lg:text-3xl ">
          Select a plan
        </AppTypography>
      ) : null}
      <ContentContainer className="h-full min-h-[40vh] w-full flex flex-row gap-4 flex-wrap md:flex-nowrap">
        <ContentContainer
          className="flex flex-row w-full overflow-hidden overflow-x-auto flex-nowrap gap-5"
          hideScroll>
          {!isLoading
            ? products?.map((plan, index) => {
                return (
                  <SubscriptionPlans
                    currentSubscription={currentSubscriptionDetails}
                    subscription={plan}
                    key={index?.toString()}
                    selected={selectedPlan}
                    setSelected={(d) => {
                      setSelectedPlan(d);
                    }}
                  />
                );
              })
            : null}

          {isLoading ? (
            <ContentContainer className="flex h-full w-full min-h-min items-center justify-center">
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
            </ContentContainer>
          ) : null}

          {isEmpty(products) && !isLoading ? (
            <ContentContainer className="h-28 w-full flex items-center justify-center">
              <Empty />
            </ContentContainer>
          ) : null}
        </ContentContainer>

        <ContentContainer col className="w-full lg:w-auto min-w-[30vw] gap-3">
          <Card className="flex flex-col gap-2 bg-kiiraBg2 shadow-none px-4 py-4 rounded-lg">
            <AppTypography variant="h5" className="text-lg font-semibold text-kiiraDark">
              Subscription history
            </AppTypography>

            <ContentContainer
              className="max-h-[30vh] overflow-hidden overflow-y-auto gap-4"
              hideScroll>
              {isEmpty(subscriptionHistory) && !subscriptionLoading ? (
                <ContentContainer className="h-28 w-full flex items-center justify-center">
                  <Empty />
                </ContentContainer>
              ) : null}

              {subscriptionLoading ? (
                <ContentContainer className="flex h-full w-full min-h-min items-center justify-center">
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
              ) : null}

              {!isEmpty(subscriptionHistory) && !subscriptionLoading
                ? subscriptionHistory?.map((subHistory, index) => {
                    const subscription = products?.find(
                      (plan) => plan.id === subHistory.current_subscription_id
                    );

                    return (
                      <ContentContainer
                        key={index?.toString()}
                        // onClick={handleOpen}
                        className="rounded-2xl bg-white p-2 flex flex-row items-center justify-between gap-1 flex-wrap hover:opacity-75 hover:cursor-pointer">
                        <ContentContainer className="flex flex-row flex-nowrap gap-1.5 items-center">
                          <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 bg-[#AFB6C0] p-1 md:h-8 md:w-8 rounded-full">
                            <PdfIcon className="h-4 w-4" />
                          </ContentContainer>
                          <AppTypography
                            variant="small"
                            className="text-xs md:text-sm text-kiiraText font-medium">
                            {!isEmpty(subscription)
                              ? `Invoice_${subscription?.name}_$${
                                  Number(subscription?.price) || null
                                }
                            .pdf`
                              : 'Invoice...'}
                          </AppTypography>
                        </ContentContainer>

                        <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
                          <AppTypography
                            variant="small"
                            className="text-xs md:text-sm text-kiiraText font-medium">
                            {moment(subHistory?.subscribed_at).format('MMM DD, YYYY')}
                          </AppTypography>
                          <ContentContainer className="flex flex-row items-center justify-center p-0.5 h-8 w-8 rounded-full">
                            <DownloadIcon />
                          </ContentContainer>
                        </ContentContainer>
                      </ContentContainer>
                    );
                  })
                : null}
            </ContentContainer>
          </Card>

          <SavedCards />
        </ContentContainer>
      </ContentContainer>

      <Dialog
        open={open}
        handler={handleOpen}
        size="xl"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}>
        <DialogBody className="min-h-[65vh]">
          <ContentContainer column width="100%" height="100%" margin="auto" padding="10px">
            <object
              data="https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              className="min-h-[75vh]"
              aria-label="Talent CV"></object>
          </ContentContainer>
        </DialogBody>
      </Dialog>
      <Dialog open={cancelLoading} size="sm" className="bg-transparent">
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
            className="text-sm text-kiiraBlackishGreen font-poppins w-full text-center my-2 font-semibold">
            Processing cancel subscription
          </AppTypography>
        </ContentContainer>
      </Dialog>
    </MainLayout>
  );
};

export default Subscription;
