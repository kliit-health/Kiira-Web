import { Outlet } from 'react-router-dom';
import { SearchInput, ServiceCard } from 'src/components';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { kiiraServices } from 'src/data';
import { MainLayout } from 'src/layouts';

const BookAppointment = () => {
  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto">
        <SearchInput label="Search health keyword" />
        <ContentContainer>
          <div className="grid grid-flow-row md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 grid-col-1 gap-4">
            {kiiraServices.map((service, index) => {
              return <ServiceCard service={service} key={index.toString()} />;
            })}
          </div>
        </ContentContainer>

        <Outlet />
      </ContentContainer>
    </MainLayout>
  );
};

BookAppointment.propTypes = {};

export default BookAppointment;
