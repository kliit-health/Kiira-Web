import React, { useEffect } from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { ReactComponent as Badge } from 'src/assets/icons/check-badge.svg';
import propTypes from 'prop-types';
import Auth from 'src/middleware/storage';

const SubscriptionPlans = ({ plan }) => {
  const isAuthenticated = Auth.isAuthenticated();
  const Icon = plan?.planIcon;

  return (
    <ContentContainer className="flex flex-col w-full h-auto min-h-[459px] max-w-max min-w-[285px] max-h-max overflow-hidden">
      <ContentContainer
        background={plan?.colorCode}
        className="h-[178px] relative rounded-t-full shadow-md flex flex-col items-center justify-between gap-4 px-2 py-10 overflow-hidden">
        <ContentContainer
          color={plan?.colorCodeBold}
          className={`flex rounded-lg bg-white w-24 h-8 items-center text-xs justify-center font-semibold my-auto`}>
          {plan?.cycle}
        </ContentContainer>
        <div className="text-[#AFB6C0] font-bold text-4xl flex flex-row items-center justify-center text-center my-auto">
          {plan?.currencyCode}
          <span className="text-kiiraDark">{plan?.amount}</span>
          <span className="text-[#AFB6C0] text-sm">{plan?.currency}</span>
        </div>

        <span className="absolute -bottom-6">
          <Icon className="h-12 w-20" />
        </span>
      </ContentContainer>
      <ContentContainer
        className={[
          plan?.cycle === 'Monthly'
            ? 'bg-white gap-3 h-auto min-h-[420px] p-4 rounded rounded-b-2xl border border-kiiraBlue/20'
            : 'bg-white gap-3 h-auto min-h-[420px] p-4 rounded rounded-b-2xl'
        ]}>
        <AppTypography className="text-kiiraText text-xs min-h-[36px]" variant="small">
          {plan?.description}
        </AppTypography>

        <AppTypography className="p-2 w-full bg-[#E2EDFF] text-kiiraBlue text-xs text-center font-semibold rounded-md">
          Kiira Membership Plan Features:
        </AppTypography>

        <ContentContainer className="flex flex-col gap-y-2">
          {plan?.package?.map((item, index) => {
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
          })}
        </ContentContainer>

        <AppButton
          size="sm"
          fullWidth
          className={
            (['px-4 py-2 text-white capitalize text-[10px] shadow-transparent mt-auto'],
            plan?.cycle === 'Monthly' ? 'bg-kiiraBlue' : 'bg-kiiraText')
          }>
          Choose Plan
        </AppButton>

        {isAuthenticated && plan?.cycle === 'Monthly' ? (
          <AppTypography variant="small" className="text-[0.675rem] text-center text-kiiraText">
            Expires Apr 30th, 2023
          </AppTypography>
        ) : null}
      </ContentContainer>
    </ContentContainer>
  );
};

SubscriptionPlans.propTypes = {
  plan: propTypes.shape({})
};

export default SubscriptionPlans;
