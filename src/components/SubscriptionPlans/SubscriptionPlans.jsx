import React, { useEffect } from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { ReactComponent as Badge } from 'src/assets/icons/check-badge.svg';
import propTypes from 'prop-types';
import Auth from 'src/middleware/storage';
import { IMAGES } from 'src/data';
import { truncate } from 'src/utils/truncate';
import isEmpty from 'src/utils/isEmpty';

const SubscriptionPlans = ({ subscription, selected, setSelected, currentSubscription }) => {
  const isAuthenticated = Auth.isAuthenticated();
  const Icon = subscription?.planIcon || IMAGES.subscriptionOval1;

  return (
    <ContentContainer className="flex flex-col w-full h-auto min-h-[459px] max-w-max min-w-[285px] max-h-max overflow-hidden">
      <ContentContainer
        background={subscription?.colorCode || '#E2EDFF'}
        className="h-[178px] relative rounded-t-full shadow-md flex flex-col items-center justify-between gap-4 px-2 py-10 overflow-hidden">
        <ContentContainer
          color={subscription?.colorCodeBold || '#3F84FF'}
          className={`flex rounded-lg bg-white py-2 w-40 h-auto items-center text-xs justify-center font-semibold my-auto text-center`}>
          {subscription?.name}
        </ContentContainer>
        <div className="text-[#AFB6C0] font-bold text-4xl flex flex-row items-center justify-center text-center my-auto">
          {subscription?.currencyCode || '$'}
          <span className="text-kiiraDark">{Math.ceil(subscription?.price)}</span>
          <span className="text-[#AFB6C0] text-sm">{subscription?.currency || 'USD'}</span>
        </div>

        <span className="absolute -bottom-6">
          <Icon className="h-12 w-20" />
        </span>
      </ContentContainer>
      <ContentContainer
        className={[
          (selected?.id || currentSubscription.id) === subscription?.id
            ? 'bg-white gap-3 h-auto min-h-[375px] p-4 rounded rounded-b-2xl border border-kiiraBlue/20'
            : 'bg-white gap-3 h-auto min-h-[375px] p-4 rounded rounded-b-2xl'
        ]}>
        {/* <AppTypography className="text-kiiraText text-xs min-h-[36px]" variant="small">
          {subscription?.description}
        </AppTypography> */}

        <AppTypography className="p-2 w-full bg-[#E2EDFF] text-kiiraBlue text-xs text-center font-semibold rounded-md">
          {subscription?.name} Features:
        </AppTypography>

        <ContentContainer className="flex flex-col gap-y-2 overflow-x-hidden">
          {/* {subscription?.package?.map((item, index) => {
            return (
              <ContentContainer className="flex flex-row flex-nowrap gap-4" key={index?.toString()}>
                <span className="w-1">
                  <Badge className="h-3.5 w-3.5 mt-0.5" />
                </span>
                <AppTypography
                  variant="lead"
                  className="flex flex-row flex-nowrap gap-4 text-kiiraText text-xs text-left font-medium ml-1"
                  key={index?.toString()}>
                  {item}
                </AppTypography>
              </ContentContainer>
            );
          })} */}
          <AppTypography
            className="text-kiiraText text-xs min-h-[36px] whitespace-pre-wrap"
            variant="small">
            {truncate(subscription?.description || '', 575)}
          </AppTypography>
        </ContentContainer>

        <AppButton
          size="sm"
          fullWidth
          onClick={() => {
            isEmpty(currentSubscription)
              ? setSelected(currentSubscription)
              : setSelected(subscription);
          }}
          className={
            (['px-4 py-2 text-white capitalize text-[10px] shadow-transparent mt-auto'],
            subscription?.cycle === 'Monthly' ? 'bg-kiiraBlue' : 'bg-kiiraText')
          }>
          Choose Plan
        </AppButton>

        {/* {isAuthenticated && subscription?.cycle === 'Monthly' ? (
          <AppTypography variant="small" className="text-[0.675rem] text-center text-kiiraText">
            Expires Apr 30th, 2023
          </AppTypography>
        ) : null} */}
      </ContentContainer>
    </ContentContainer>
  );
};

SubscriptionPlans.propTypes = {
  subscription: propTypes.shape({}),
  selected: propTypes.shape({}),
  setSelected: propTypes.func,
  currentSubscription: propTypes.shape({})
};

SubscriptionPlans.defaultProps = {
  currentSubscription: {},
  setSelected: () => {},
  selected: {},
  subscription: {}
};

export default SubscriptionPlans;
