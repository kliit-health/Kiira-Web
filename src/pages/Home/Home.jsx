import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BookingCard } from 'src/components';
import {
  AddCircleIcon,
  AppButton,
  BorderedContainer,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES, kiiraUpdates } from 'src/data';
import { MainLayout } from 'src/layouts';

const Home = () => {
  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh]  p-4 lg:px-10 lg:py-4 gap-4">
        <Typography variant="h6" className="text-kiiraDark font-bold text-base lg:text-lg">
          Kick it with Kiira
        </Typography>

        <ContentContainer
          hideScroll
          width="100%"
          className="overflow-hidden overflow-x-auto flex flex-row items-center gap-4 space-x-2">
          {kiiraUpdates?.map((item, index) => {
            return (
              <ContentContainer className="p-0 md:p-2 bg-kiiraBg2 rounded-2xl">
                <Card className="w-[235px] md:w-[256px] h-[376px] overflow-hidden shadow-none">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-2xl rounded-b-none min-h-[169px]">
                    <img src={item?.imageSrc} alt={item.title} />
                  </CardHeader>
                  <CardBody className="bg-kiiraBg2 p-2 h-full flex flex-col gap-2 justify-between">
                    <ContentContainer className="gap-2">
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="text-[#252539] text-xl font-semibold">
                        {item?.title}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal text-[#93939A] text-[0.75rem] font-manrope leading-tight">
                        {item?.content}
                      </Typography>
                    </ContentContainer>
                    <ContentContainer className="flex flex-col gap-2 bg-kiiraBg2">
                      <div className="flex flex-row items-center space-x-3">
                        <Avatar
                          size="md"
                          variant="rounded"
                          alt="natali craig"
                          src={IMAGES?.girlAvatarBg}
                          className="rounded-full"
                        />

                        <Typography className="font-normal text-kiiraDark text-sm">
                          {item?.author}
                        </Typography>
                      </div>
                    </ContentContainer>
                    <ContentContainer className="flex flex-col gap-2 bg-kiiraBg2">
                      <Link to="#" className="flex flex-row items-center space-x-3">
                        <Typography variant="small" className="font-normal text-kiiraBlue text-xs">
                          Read more <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </Typography>
                      </Link>
                    </ContentContainer>
                  </CardBody>
                </Card>
              </ContentContainer>
            );
          })}
        </ContentContainer>

        <Card className="w-full h-full bg-kiiraBg2 p-4 lg:px-5 lg:py-4 gap-4 shadow-none">
          <Typography variant="h6" className="text-kiiraDark font-bold text-base lg:text-lg">
            Book a new appointment
          </Typography>
         

          <ContentContainer row className="flex-row flex-nowrap items-center justify-between mt-4">
            <Typography variant="h6" className="text-[#112211] font-semibold text-xs lg:text-base">
              Booking History
            </Typography>
            <Button
              variant="text"
              size="sm"
              className="text-xs rounded-2xl bg-kiiraBlue text-white py-1 px-5">
              <span className="text-[0.5rem]">View all</span>
            </Button>
          </ContentContainer>

          {[1, 2].map((d, index) => {
            return <BookingCard disabled={index !== 0} />;
          })}
        </Card>
      </ContentContainer>
    </MainLayout>
  );
};

export default Home;
