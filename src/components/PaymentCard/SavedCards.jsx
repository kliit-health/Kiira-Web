import { Card, Dialog, DialogBody, Radio } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AppTypography, ContentContainer } from '../shared/styledComponents';
import { RadioCheckedIcon, VisaIcon } from '../shared/AppIcons/AppIcons';
import { AddButton, PaymentCard } from '..';

const SavedCards = () => {
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
        {/* <ContentContainer className="rounded-2xl bg-kiiraBlue p-1 md:p-5 flex flex-row items-center justify-between gap-1 flex-wrap hover:opacity-90 hover:cursor-pointer">
          <ContentContainer className="flex flex-row flex-nowrap gap-5 items-center">
            <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 bg-kiiraBlue p-1 md:h-8 md:w-8 rounded-full">
              <VisaIcon className="h-10 w-10" />
            </ContentContainer>
            <AppTypography variant="small" className="text-sm md:text-base text-white font-medium">
              **** 4321 <span className="font-normal ml-3">02/27</span>
            </AppTypography>
          </ContentContainer>
          <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
            <ContentContainer className="flex flex-row items-center justify-center p-0.5 h-4 w-4  md:h-8 md:w-8 rounded-full">
              {true ? <RadioCheckedIcon /> : <Radio id="white" name="color" color="white" />}
            </ContentContainer>
          </ContentContainer>
        </ContentContainer> */}

        <AddButton label="Add a new card" onAddClick={handleOpen} />
      </Card>
      <Dialog
        open={open}
        handler={handleOpen}
        size={
          windowSize?.innerWidth < 346
            ? 'xxl'
            : windowSize?.innerWidth > 345 && windowSize?.innerWidth < 1024
            ? 'xl'
            : 'md'
        }
        className="w-full md-w-3/4"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}>
        <DialogBody className="overflow-hidden overflow-y-auto min-w-full ">
          <PaymentCard closeModal={handleOpen} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SavedCards;
