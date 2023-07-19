import { Card, Dialog, DialogBody, Radio } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AppTypography, ContentContainer } from '../shared/styledComponents';
import { RadioCheckedIcon, VisaIcon } from '../shared/AppIcons/AppIcons';
import { AddButton, PaymentCard } from '..';
import { func, object } from 'prop-types';
import { useLocalStore } from 'src/store';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';

const SavedCards = () => {
  const selectedPlan = useLocalStore((state) => state.storedData);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
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
      <Card className="flex flex-col gap-2 bg-kiiraBg2 shadow-none p-4 rounded-lg">
        <ContentContainer className="rounded-2xl bg-kiiraBlue p-1 md:p-5 flex flex-row items-center justify-between gap-1 flex-wrap hover:opacity-90 hover:cursor-pointer">
          <ContentContainer className="flex flex-row flex-nowrap gap-5 items-center">
            <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 bg-kiiraBlue p-1 md:h-8 md:w-8 rounded-full">
              <i className="fa-solid fa-credit-card text-white text-2xl"></i>
            </ContentContainer>
            <AppTypography variant="small" className="text-sm md:text-base text-white font-medium text-right">
              **** 4321 
            </AppTypography>
          </ContentContainer>
          <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
            <ContentContainer className="flex flex-row items-center justify-center p-0.5 h-4 w-4  md:h-8 md:w-8 rounded-full">
              {false ? <RadioCheckedIcon /> : <Radio id="white" name="color" color="amber" />}
            </ContentContainer>
          </ContentContainer>
        </ContentContainer>

        <AddButton
          label="Add a new card"
          onAddClick={() => {
            isEmpty(selectedPlan)
              ? Toast.fire({
                  icon: 'warning',
                  title: 'Please select a subscription plan to proceed...'
                })
              : handleOpen();
          }}
        />
      </Card>
      <Dialog
        open={open}
        // handler={handleOpen}
        // dismiss={() => setOpen(true)}
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
          <PaymentCard dismissHandler={handleOpen} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SavedCards;
