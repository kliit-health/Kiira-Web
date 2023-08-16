import React, { useState } from 'react';
import { AppLinkExternal, AppTypography, ContentContainer } from '../shared/styledComponents';
import { Button, Dialog, DialogBody, Input } from '@material-tailwind/react';
import { useLocalStore } from 'src/store';
import isEmpty from 'src/utils/isEmpty';
import { bool, string } from 'prop-types';

const ApplyPromoCode = ({ label, placeholderText, disabled }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const coupon = useLocalStore((state) => state.coupon);
  const setCoupon = useLocalStore((state) => state.setCoupon);

  return (
    <ContentContainer className="w-full lg:w-auto mt-2 lg:mt-0">
      <Button
        disabled={disabled}
        variant="text"
        size="sm"
        fullWidth={false}
        onClick={() => {
          handleOpen();
        }}
        className="font-semibold text-kiiraBlue text-center text-sm cursor-pointer hover:opacity-75 hover:bg-transparent capitalize">
        {' '}
        {!isEmpty(coupon?.coupon) && !disabled ? (
          <span className="font-manrope font-semibold -tracking-wide">
            Applying coupon -{' '}
            <span className="uppercase font-bold text-white text-base bg-indigo-500 font-montserrat px-2 py-1 rounded">
              {coupon?.coupon}
            </span>
          </span>
        ) : (
          <>{placeholderText} </>
        )}{' '}
        <i className="fa-solid fa-gift"></i>
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size={'xl'}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}>
        <DialogBody className="min-h-[30vh] h-full p-0">
          <ContentContainer
            column
            width="100%"
            margin="auto"
            padding="0"
            className="xl:max-w-screen-2xl lg:relative h-full">
            <ContentContainer className="w-full h-full p-2 text-center font-poppins flex-row justify-end gap-2 flex-wrap">
              <Button
                size="md"
                variant="text"
                className="text-orange-900 font-bold font-montserrat rounded-full border h-8 w-8 p-0 border-orange-900 hover:border-yellow-600 hover:border hover:bg-orange-900 hover:text-white capitalize gap-1 inline-flex items-center justify-center"
                onClick={() => {
                  handleOpen();
                }}>
                x
              </Button>
            </ContentContainer>
            <ContentContainer className="w-full h-full items-center justify-center py-2 px-4 ">
              <AppTypography
                variant="h2"
                className="text-center font-bold text-kiiraText uppercase">
                {' '}
                {label}
              </AppTypography>

              <ContentContainer className="w-full items-center my-5">
                <ContentContainer className=" w-full sm:w-96 lg:max-w-screen-2xl">
                  <div className="relative flex w-full max-w-[24rem]">
                    <Input
                      required
                      size="lg"
                      label="Coupon Code"
                      value={coupon?.coupon || ''}
                      onChange={(e) => {
                        setCoupon({ coupon: e.target.value });
                      }}
                      className="pr-20"
                      containerProps={{
                        className: 'min-w-0'
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={handleOpen}
                      className="!absolute right-1 top-1.5 rounded">
                      Add
                    </Button>
                  </div>
                </ContentContainer>
              </ContentContainer>

              <AppTypography
                variant="lead"
                className="text-sm text-justify md:text-sm text-kiiraText w-full lg:w-3/4 mt-auto bg-kiiraBg2 p-4 rounded-2xl">
                All Kiira members have a unique membership code that can be applied at checkout for
                a discount. If you do not have your "unique code", you may email us at{' '}
                <AppLinkExternal
                  href="mailto:appointments@kiira.io"
                  className="underline text-kiiraBlue">
                  appointments@kiira.io
                </AppLinkExternal>{' '}
                for retrieval.
              </AppTypography>
            </ContentContainer>
          </ContentContainer>
        </DialogBody>
      </Dialog>
    </ContentContainer>
  );
};

export default ApplyPromoCode;

ApplyPromoCode.propTypes = {
  label: string,
  placeholderText: string,
  disabled: bool
};
ApplyPromoCode.defaultProps = {
  label: 'APPLY COUPON CODE',
  placeholderText: '+ Apply Coupon Code',
  disabled: false
};
