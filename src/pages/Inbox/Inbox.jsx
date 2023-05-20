import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import React from 'react';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';
import { MainLayout } from 'src/layouts';

const Inbox = () => {
  const CalenderIcon = IMAGES.calenderIcon;
  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] p-4 lg:px-10 lg:py-4 gap-4">
        <Typography variant="h6" className="text-kiiraDark font-bold text-lg">
          Inbox
        </Typography>
        {[1, 2].map((history, index) => {
          return (
            <ContentContainer className="rounded-lg bg-kiiraBg2 p-2 lg:px-5 lg:py-5 flex flex-row items-center justify-between gap-1 flex-wrap">
              <ContentContainer className="flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-6 items-center">
                <Avatar src={IMAGES.inboxImg} alt="pic" size="xl" />
                <ContentContainer column className="gap-2">
                  <Typography
                    variant="h5"
                    className="text-md md:text-lg text-kiiraDark font-semibold">
                    Health Offer
                  </Typography>
                  <Typography variant="lead" className="text-xs md:text-sm text-kiiraDark">
                    Dr. Candice Fraser
                  </Typography>
                  <Typography variant="small" className="text-xs md:text-sm text-kiiraText">
                    Dear Ayodeji, Please view your provisional health information...
                  </Typography>
                </ContentContainer>
              </ContentContainer>

              <ContentContainer className="flex flex-row w-full lg:w-auto flex-nowrap gap-2 items-center justify-between">
                <ContentContainer className="flex flex-row flex-nowrap gap-2 items-center">
                  <IconButton variant="outlined" className="border-none">
                    <CalenderIcon />
                  </IconButton>
                  <ContentContainer>
                    <Typography variant="small" className="text-[0.675rem] text-kiiraText">
                      Date
                    </Typography>
                    <Typography
                      variant="lead"
                      className="text-xs text-kiiraDark font-medium font-montserrat">
                      12-11-22
                    </Typography>
                  </ContentContainer>
                </ContentContainer>
                <ContentContainer className="flex flex-row items-center justify-center p-0.5 h-8 w-8  rounded-md border border-kiiraBlue ml-auto">
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </ContentContainer>
              </ContentContainer>
            </ContentContainer>
          );
        })}
      </ContentContainer>
    </MainLayout>
  );
};

export default Inbox;
