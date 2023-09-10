import React from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import propTypes from 'prop-types';
import { IMAGES } from 'src/data';
import { truncate } from 'src/utils/truncate';
import { useProfile } from 'src/queries/queryHooks';
import moment from 'moment-timezone';
import isEmpty from 'src/utils/isEmpty';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { ApplyPromoCode } from '..';
import { useLocalStore } from 'src/store';

const SubscriptionPlans = ({ subscription, selected, setSelected }) => {
  const location = useLocation();
  const { pathname } = location;
  const Icon = subscription?.planIcon || IMAGES.subscriptionOval1;
  const { data: userProfile } = useProfile();
  const profile = userProfile?.data?.user;
  const setCoupon = useLocalStore((state) => state.setCoupon);

  const handleSelectPlan = (data) => {
    setSelected(data);
    setCoupon({ coupon: '' });
  };

  const handleRemoveSelectPlan = () => {
    setSelected({});
    setCoupon({ coupon: '' });
  };

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
          profile?.subscription_id === subscription?.id
            ? 'bg-kiiraBg/30 gap-3 h-auto min-h-[375px] p-4 rounded rounded-b-2xl border  border-kiiraBg3 border-t-0'
            : selected?.id === subscription?.id
            ? 'bg-kiiraBg2/70 gap-3 h-auto min-h-[375px] p-4 rounded rounded-b-2xl border  border-kiiraBlue/20'
            : 'bg-white gap-3 h-auto min-h-[375px] p-4 rounded rounded-b-2xl'
        ]}>
        <AppTypography className="p-2 w-full bg-[#E2EDFF] text-kiiraBlue text-xs text-center font-semibold rounded-md">
          {subscription?.name} Features:
        </AppTypography>

        <ContentContainer className="flex flex-col gap-y-2 overflow-x-hidden">
          <AppTypography
            className="text-kiiraText text-xs min-h-[36px] whitespace-pre-wrap"
            variant="small">
            {truncate(subscription?.description || '', 575)}
          </AppTypography>
        </ContentContainer>

        <ContentContainer className="mt-auto">
          <AppButton
            size="sm"
            fullWidth
            onClick={() => {
              isEmpty(selected) || selected !== subscription
                ? handleSelectPlan(subscription)
                : handleRemoveSelectPlan();
            }}
            className={
              ('px-4 py-2 text-white capitalize text-[10px] shadow-transparent',
              (selected?.id || profile?.subscription_id) === subscription?.id
                ? 'bg-kiiraBlue'
                : 'bg-kiiraText')
            }>
            {selected?.id === subscription?.id ? 'Selected' : 'Choose'}
          </AppButton>
        </ContentContainer>

        {!isEmpty(selected) && selected?.id === subscription?.id ? (
          <ContentContainer column>
            <ApplyPromoCode />
          </ContentContainer>
        ) : null}

        {!isEmpty(profile?.subscription_expiry_date) &&
        profile?.subscription_id === subscription?.id &&
        pathname !== ROUTES.SIGINUP_SUBSCRIPTION ? (
          <AppTypography variant="small" className="text-[0.675rem] text-center text-kiiraText">
            {moment().isSameOrBefore(profile?.subscription_expiry_date, 'day')
              ? 'Expires'
              : 'Expired'}{' '}
            {moment(profile?.subscription_expiry_date).format('MMM DD, YYYY')}
          </AppTypography>
        ) : null}
      </ContentContainer>
    </ContentContainer>
  );
};

SubscriptionPlans.propTypes = {
  subscription: propTypes.shape({}),
  selected: propTypes.shape({}),
  setSelected: propTypes.func
};

SubscriptionPlans.defaultProps = {
  currentSubscription: {},
  setSelected: () => {},
  selected: {}
};

export default SubscriptionPlans;
