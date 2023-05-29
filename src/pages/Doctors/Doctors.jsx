import { Button, ButtonGroup, Select, Option } from '@material-tailwind/react';
import { DoctorsCard, SearchInput, ServiceCard } from 'src/components';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { kiiraDoctors, kiiraServices } from 'src/data';
import { css } from 'twin.macro';
import { MainLayout } from 'src/layouts';

const Doctors = () => {
  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto ">
        <ContentContainer className="flex flex-row w-full items-center justify-between flex-wrap xl:flex-nowrap gap-2">
          <ContentContainer className="w-full flex flex-row items-center gap-2 flex-wrap md:flex-nowrap">
            <AppTypography
              variant="small"
              className="text-kiiraText text-[0.6rem] uppercase font-medium">
              STATUS
            </AppTypography>
            <div className="relative h-8 min-w-[60px]">
              <select className="peer h-full w-full rounded-[7px] border border-[#E4E7F3] bg-kiiraBg2 px-2 py-2 font-sans text-[0.65rem] font-medium text-kiiraText outline outline-0 transition-all  placeholder-shown:border-kiiraText empty:!bg-red-500 focus:border focus:border-kiiraBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                <option value="brazil" className="text-kiiraText text-xs">
                  Online
                </option>
                <option value="bucharest">Away</option>
                <option value="bucharest">Busy</option>
                <option value="bucharest">Unavailable</option>
                <option value="bucharest">11:00 - 17:00</option>
              </select>
            </div>
            <ContentContainer className="w-full lg:w-3/5">
              <SearchInput label="Find doctors by name or title" />
            </ContentContainer>
          </ContentContainer>
          <ContentContainer className="flex flex-row items-center w-full md:w-1/4">
            <ButtonGroup ripple={true} size="sm" className="shadow-none bg-kiiraBg3 rounded-lg">
              <Button className="bg-kiiraBlue text-white">ALL</Button>
              <Button className="bg-transparent text-kiiraText">MALE</Button>
              <Button className="bg-transparent text-kiiraText">FEMALE</Button>
            </ButtonGroup>
          </ContentContainer>
        </ContentContainer>
        <ContentContainer>
          <div className="grid grid-flow-row md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 grid-col-1 gap-4">
            {kiiraDoctors?.map((doctor, index) => {
              return <DoctorsCard doctor={doctor} key={index.toString()} />;
            })}
          </div>
        </ContentContainer>
      </ContentContainer>
    </MainLayout>
  );
};

Doctors.propTypes = {};

export default Doctors;
