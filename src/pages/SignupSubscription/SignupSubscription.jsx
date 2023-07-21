import React, { useState } from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { PaymentCard, SubscriptionPlans } from 'src/components';
import { useProducts } from 'src/queries/queryHooks';
import { ThreeDots } from 'react-loader-spinner';
import { useLocalStore } from 'src/store';

const SignupSubscription = () => {
  const setSelectedPlan = useLocalStore((state) => state.setStoredData);
  const { data, isLoading } = useProducts();
  const products = data?.data?.products;
  const [selected, setSelected] = useState({});

  return (
    <AuthLayout hideScroll>
      <ContentContainer
        className="flex flex-row w-full h-full gap-6 2xl:gap-2 mb-2 flex-wrap lg:flex-nowrap"
        hideScroll>
        {/* Payment Plan  */}
        <ContentContainer
          className="flex flex-row w-full h-full gap-4 overflow-hidden overflow-x-auto"
          hideScroll>
          <Card className="w-full h-auto 2xl:h-full shadow-none bg-transparent">
            <CardBody className="flex flex-col h-full gap-4 p-0">
              <AppTypography
                variant="h2"
                className="text-[#252539] font-medium text-2xl lg:text-3xl ">
                Select a plan
              </AppTypography>

              <ContentContainer className="flex flex-row w-full h-full overflow-hidden overflow-x-auto flex-nowrap gap-5">
                {isLoading ? (
                  <ContentContainer className="flex h-full w-full min-h-[240px] items-center justify-center">
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

                {!isLoading &&
                  products?.map((plan, index) => {
                    return (
                      <SubscriptionPlans
                        currentSubscription={selected}
                        subscription={plan}
                        key={index?.toString()}
                        selected={selected}
                        setSelected={(d) => {
                          setSelected(d);
                          setSelectedPlan(d);
                        }}
                      />
                    );
                  })}
              </ContentContainer>
            </CardBody>
          </Card>
        </ContentContainer>

        {/* Payment Form */}
        {!isLoading ? (
          <>
            <Card className="w-full h-auto 2xl:h-full shadow-none px-4">
              <PaymentCard showCloseButton={false} />
            </Card>
          </>
        ) : null}
      </ContentContainer>
    </AuthLayout>
  );
};

export default SignupSubscription;
