import { Card, CardBody, Dialog, DialogBody, DialogHeader, Radio } from '@material-tailwind/react';
import React, { useState } from 'react';
import { AddButton, SavedCards, SubscriptionPlans } from 'src/components';
import {
  AppTypography,
  BorderedContainer,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { kiiraSubscriptions } from 'src/data';
import { MainLayout } from 'src/layouts';
import { ReactComponent as PdfIcon } from 'src/assets/icons/pdfIcon.svg';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/Download.svg';
import { ReactComponent as VisaIcon } from 'src/assets/icons/visaWhite.svg';
import { ReactComponent as RadioChecked } from 'src/assets/icons/radioChecked.svg';
import { ReactComponent as AddCircle } from 'src/assets/icons/Add_circle.svg';

const Subscription = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <MainLayout>
      <ContentContainer className="flex p-4 md:p-0 mb-10">
        <AppTypography variant="h6" className="text-kiiraDark">
          You are currently on a <span className="text-kiiraBlue">monthly plan</span>
        </AppTypography>
        <AppTypography variant="small" className="text-kiiraText text-sm">
          Next payment on <span className="text-kiiraDark">Apr 30th, 2023</span>
        </AppTypography>
      </ContentContainer>
      <ContentContainer className="h-full min-h-[40vh] w-full flex flex-row gap-4 flex-wrap md:flex-nowrap">
        <ContentContainer className="flex flex-row w-full h-full overflow-hidden overflow-x-auto flex-nowrap gap-5">
          {kiiraSubscriptions?.map((plan, index) => {
            return <SubscriptionPlans plan={plan} key={index?.toString()} />;
          })}
        </ContentContainer>
        <ContentContainer col className="w-full lg:w-auto min-w-[30vw] gap-3">
          <Card className="flex flex-col gap-2 bg-kiiraBg2 shadow-none px-4 py-4 rounded-lg">
            <AppTypography variant="h5" className="text-lg font-semibold text-kiiraDark">
              Subscription history
            </AppTypography>
            {[1, 2].map((history, index) => {
              return (
                <ContentContainer
                  onClick={handleOpen}
                  className="rounded-2xl bg-white p-2 flex flex-row items-center justify-between gap-1 flex-wrap hover:opacity-75 hover:cursor-pointer">
                  <ContentContainer className="flex flex-row flex-nowrap gap-1.5 items-center">
                    <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 bg-[#AFB6C0] p-1 md:h-8 md:w-8 rounded-full">
                      <PdfIcon className="h-4 w-4" />
                    </ContentContainer>
                    <AppTypography
                      variant="small"
                      className="text-xs md:text-sm text-kiiraText font-medium">
                      Invoice_2023_3.pdf
                    </AppTypography>
                  </ContentContainer>

                  <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
                    <AppTypography
                      variant="small"
                      className="text-xs md:text-sm text-kiiraText font-medium">
                      Nov 02,2022
                    </AppTypography>
                    <ContentContainer className="flex flex-row items-center justify-center p-0.5 h-8 w-8 rounded-full">
                      <DownloadIcon />
                    </ContentContainer>
                  </ContentContainer>
                </ContentContainer>
              );
            })}
          </Card>

          <SavedCards />
        </ContentContainer>
      </ContentContainer>

      {/* Modal  */}
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
              className="min-h-[65vh]"
              aria-label="Talent CV"></object>
          </ContentContainer>
        </DialogBody>
      </Dialog>
    </MainLayout>
  );
};

export default Subscription;
