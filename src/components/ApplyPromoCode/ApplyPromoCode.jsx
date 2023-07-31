import React, { useState } from 'react';
import { AppLinkExternal, AppTypography, ContentContainer } from '../shared/styledComponents';
import { Button, Dialog, DialogBody, Input } from '@material-tailwind/react';
import { useLocalStore } from 'src/store';
import isEmpty from 'src/utils/isEmpty';

const ApplyPromoCode = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
  const storedData = useLocalStore((state) => state.storedData);
  const setPromoCode = useLocalStore((state) => state.setStoredData);
  return (
    <ContentContainer className="w-full lg:w-auto mt-2 lg:mt-0">
      <Button
        variant="text"
        size="sm"
        fullWidth={false}
        onClick={() => {
          handleOpen();
        }}
        className="font-medium text-kiiraBlue text-center text-sm cursor-pointer hover:opacity-75 capitalize">
        +{' '}
        {!isEmpty(storedData?.promoCode) ? (
          <span className="uppercase font-bold">{storedData?.promoCode} applied</span>
        ) : (
          'Add Promo Code'
        )}
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xl"
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
                className="text-orange-900 rounded-full border h-8 w-8 p-0 border-orange-900 hover:bg-gray-100 capitalize gap-1 inline-flex items-center justify-center"
                onClick={() => {
                  handleOpen();
                }}>
                x
              </Button>
            </ContentContainer>
            <ContentContainer className="w-full h-full items-center justify-center">
              <AppTypography
                variant="h2"
                className="text-center font-bold text-kiiraText uppercase">
                {' '}
                APPLY PROMO CODE
              </AppTypography>

              <ContentContainer className="w-full items-center my-5">
                <ContentContainer className=" w-full sm:w-96 lg:max-w-screen-2xl">
                  <div className="relative flex w-full max-w-[24rem]">
                    <Input
                      required
                      size="lg"
                      label="Coupon Code"
                      value={storedData?.promoCode || ''}
                      onChange={(e) => {
                        setPromoCode({ promoCode: e.target.value });
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
