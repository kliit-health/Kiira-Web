import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Empty, SearchInput, ServiceCard } from 'src/components';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { useAppointmentTypes } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { searchFilter } from 'src/utils/searchFilter';

const BookAppointment = () => {
  const { data, isLoading, error } = useAppointmentTypes();
  const appointment_types = data?.data?.appointment_types;
  const errorMsg = error?.response?.data?.message || error?.message;

  useEffect(() => {
    if (!error) return;
    Toast.fire({
      icon: 'error',
      title: errorMsg
    });
  }, [error]);

  const [searchText, setSearchText] = useState('');
  const [filteredAppointmentTypes, setFilteredAppointmentTypes] = useState(appointment_types);

  useEffect(() => {
    setFilteredAppointmentTypes(appointment_types);
  }, [appointment_types]);

  const handleSearch = (text) => {
    setSearchText(searchText);
    searchFilter(text, 'name', setSearchText, appointment_types, setFilteredAppointmentTypes);
  };

  return (
    <ContentContainer
      width="100%"
      height="100%"
      className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto">
      <SearchInput
        label="Search health keyword"
        value={searchText}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <ContentContainer>
        {!isLoading ? (
          <div className="grid grid-flow-row md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 grid-col-1 gap-4">
            {filteredAppointmentTypes?.map((service, index) => {
              if (service.category !== 'Virtual Only') return;
              if (!service.active) return;
              return <ServiceCard service={service} key={index.toString()} />;
            })}
          </div>
        ) : null}

        {isLoading ? (
          <ContentContainer className="flex h-full w-full min-h-min items-center justify-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#005eff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </ContentContainer>
        ) : null}

        {isEmpty(filteredAppointmentTypes) && !isLoading ? (
          <ContentContainer className="flex h-full w-full min-h-min items-center justify-center">
            <Empty />
          </ContentContainer>
        ) : null}
      </ContentContainer>
    </ContentContainer>
  );
};

BookAppointment.propTypes = {};

export default BookAppointment;
