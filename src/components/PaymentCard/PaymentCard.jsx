import {
  Card,
  CardBody,
  Checkbox,
  Input,
  Select,
  Option,
  Alert,
  IconButton
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { ReactComponent as VisaIcon } from 'src/assets/icons/visa.svg';
import countryList from 'src/utils/countryList';
import { CloseIcon } from '../shared/AppIcons/AppIcons';
import { func } from 'prop-types';

const PaymentCard = ({ closeModal }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="w-full h-auto 2xl:h-full shadow-none relative">
        <CardBody className="flex flex-col h-full gap-6 px-2 py-4  lg:px-8 lg:py-8">
          <IconButton variant="text" className="absolute right-2 top-2">
            <CloseIcon onClick={closeModal} />
          </IconButton>

          <AppTypography
            variant="h6"
            className="text-[#252539] font-semibold text-base md:text-3xl ">
            Add a new Card
          </AppTypography>
          <div className="flex flex-col w-full gap-5">
            <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap">
              <Input label="Card Number" size="lg" className="w-full" icon={<VisaIcon />} />
            </ContentContainer>
            <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap xl:flex-nowrap">
              <Input label="Exp. Date" size="lg" className="w-full" />
              <Input label="CVC" size="lg" className="w-full" />
            </ContentContainer>
            <Input label="Name on Card" size="lg" className="w-full" />

            <Select label="Country or Region" size="lg">
              {countryList?.map((country, index) => {
                return <Option key={index?.toString()}>{country}</Option>;
              })}
            </Select>
          </div>
          <div className="flex flex-row flex-nowrap items-center -ml-2.5">
            <Checkbox
              color="blue-gray"
              iconProps={{ size: 'xs' }}
              label="Securely save my information for 1-click checkout"
              labelProps={{ className: 'p-1 font-medium text-xs lg:text-sm -ml-2' }}
            />
          </div>

          <AppButton
            size="md"
            background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
            className="text-sm font-semibold text-white capitalize shadow-transparent"
            fullWidth
            onClick={() => {
              setOpen(true);
            }}>
            Add Card
          </AppButton>
          <AppTypography
            variant="small"
            className="flex justify-center flex-wrap -mt-1 text-center text-xs text-kiiraText/75">
            By confirming your subscription, you allow Kiira health to charge your card for this
            payment and future payments in accordance with their terms. You can always cancel your
            subscription.
          </AppTypography>
        </CardBody>
      </Card>

      <Alert
        color="green"
        className=" flex flex-row w-full items-center justify-between flex-nowrap"
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 }
        }}>
        Card added successfully
      </Alert>
    </>
  );
};

PaymentCard.propTypes = {
  closeModal: func
};

PaymentCard.defaultProps = {
  closeModal: () => {}
};

export default PaymentCard;
