import { Card, Dialog, DialogBody } from '@material-tailwind/react';
import React, { useState } from 'react';
import { DownloadIcon, Empty, PdfIcon, SavedCards, SubscriptionPlans } from 'src/components';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';
import { useProducts, useProfile, useSubscriptionHistory } from 'src/queries/queryHooks';
import { ThreeDots } from 'react-loader-spinner';
import isEmpty from 'src/utils/isEmpty';
import { useEffect } from 'react';
import { useLocalStore } from 'src/store';
import moment from 'moment-timezone';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';

const Subscription = () => {
  const setSelectedPlan = useLocalStore((state) => state.setStoredData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { data: userProfile } = useProfile();
  const profile = userProfile?.data?.user;
  const { data, isLoading } = useProducts();
  const { data: subscriptionData, isLoading: subscriptionLoading } = useSubscriptionHistory();
  console.log(
    '\n 🚀 ~ file: Subscription.jsx:19 ~ Subscription ~ subscriptionData:',
    subscriptionData?.data?.subscription_history
  );
  const subscriptionHistory = subscriptionData?.data?.subscription_history;
  const products = data?.data?.products;
  const [selected, setSelected] = useState({});
  useEffect(() => {
    setSelectedPlan({ ...selected });
  }, [selected]);

  const currentSubscriptionDetails = products?.find(
    (product) => profile?.subscription_id == product?.id
  );
  console.log(
    '\n 🚀 ~ file: Subscription.jsx:36 ~ Subscription ~ currentSubscriptionDetails:',
    currentSubscriptionDetails
  );
  return (
    <MainLayout>
      <ContentContainer className="flex p-4 md:p-0 mb-6">
        {!isEmpty(subscriptionData) ? (
          <>
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
          </>
        ) : null}
      </ContentContainer>
      {isEmpty(selected) && !isLoading ? (
        <AppTypography
          variant="h4"
          className="text-[#252539] p-4 font-medium text-2xl lg:text-3xl ">
          Select a plan
        </AppTypography>
      ) : null}
      <ContentContainer className="h-full min-h-[40vh] w-full flex flex-row gap-4 flex-wrap md:flex-nowrap">
        <ContentContainer
          className="flex flex-row w-full h-full overflow-hidden overflow-x-auto flex-nowrap gap-5"
          hideScroll>
          {!isLoading
            ? products?.map((plan, index) => {
                return (
                  <SubscriptionPlans
                    currentSubscription={currentSubscriptionDetails}
                    subscription={plan}
                    key={index?.toString()}
                    selected={selected}
                    setSelected={(d) => setSelected(d)}
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
                        onClick={handleOpen}
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
    </MainLayout>
  );
};

export default Subscription;
