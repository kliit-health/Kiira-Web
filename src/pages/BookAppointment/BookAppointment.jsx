import { Button, ButtonGroup } from '@material-tailwind/react';
import { array, object } from 'prop-types';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Empty, SearchInput, ServiceCard } from 'src/components';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { useAppointmentTypes } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { searchFilter } from 'src/utils/searchFilter';

const BookAppointment = ({ docAppointmentType, appointedDoctor }) => {
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

  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredAppointmentTypes, setFilteredAppointmentTypes] = useState(appointment_types);

  useEffect(() => {
    if (!isEmpty(docAppointmentType)) {
      setFilteredAppointmentTypes(docAppointmentType);
    } else {
      setFilteredAppointmentTypes(appointment_types);
    }
  }, [appointment_types, docAppointmentType]);

  const handleSearch = (text) => {
    setSearchText(searchText);
    searchFilter(text, 'name', setSearchText, appointment_types, setFilteredAppointmentTypes);
  };

  const handleSelectedFilter = (selected) => {
    setSelectedFilter(selected);
    searchFilter(
      selected,
      'category',
      setSelectedFilter,
      !isEmpty(docAppointmentType) ? docAppointmentType : appointment_types,
      setFilteredAppointmentTypes
    );
  };
  return (
    <ContentContainer
      width="100%"
      height="100%"
      className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto">
      <ContentContainer className="flex-col gap-2 items-center flex-wrap lg:flex-nowrap">
        <SearchInput
          label="Search health keyword"
          value={searchText}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />

        {!isLoading && !isEmpty(filteredAppointmentTypes) ? (
          <ContentContainer className="flex flex-row items-center w-full">
            <ButtonGroup ripple={true} size="sm" className="shadow-none bg-kiiraBg3 rounded-lg">
              <Button
                onClick={() => handleSelectedFilter('')}
                className={[
                  selectedFilter === ''
                    ? 'bg-kiiraBlue text-white text-[10px]'
                    : 'bg-transparent text-kiiraText  text-[10px]'
                ]}>
                ALL
              </Button>
              <Button
                onClick={() => handleSelectedFilter('Kiira Health Palooza')}
                className={[
                  selectedFilter === 'Kiira Health Palooza'
                    ? 'bg-kiiraBlue text-white text-[10px] min-w-max'
                    : 'bg-transparent text-kiiraText text-[10px] min-w-max'
                ]}>
                Kiira Health Palooza
              </Button>
              <Button
                onClick={() => handleSelectedFilter('Melrose - In person Visit')}
                className={[
                  selectedFilter === 'Melrose - In person Visit'
                    ? 'bg-kiiraBlue text-white text-[10px] min-w-max'
                    : 'bg-transparent text-kiiraText text-[10px] min-w-max'
                ]}>
                Melrose - In person Visit
              </Button>
              <Button
                onClick={() => handleSelectedFilter('Melrose IV Drip - In person Visit')}
                className={[
                  selectedFilter === 'Melrose IV Drip - In person Visit'
                    ? 'bg-kiiraBlue text-white text-[10px] min-w-max'
                    : 'bg-transparent text-kiiraText text-[10px] min-w-max'
                ]}>
                Melrose IV Drip - In person Visit
              </Button>
              <Button
                onClick={() => handleSelectedFilter('Virtual Only')}
                className={[
                  selectedFilter === 'Virtual Only'
                    ? 'bg-kiiraBlue text-white text-[10px]'
                    : 'bg-transparent text-kiiraText  text-[10px]'
                ]}>
                Virtual Only
              </Button>
            </ButtonGroup>
          </ContentContainer>
        ) : null}
      </ContentContainer>
      <ContentContainer>
        {!isLoading ? (
          <div className="grid grid-flow-row md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 grid-col-1 gap-4">
            {filteredAppointmentTypes?.map((service, index) => {
              return (
                <ServiceCard
                  service={service}
                  appointedDoctor={appointedDoctor}
                  key={index.toString()}
                />
              );
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

BookAppointment.propTypes = {
  docAppointmentType: array,
  appointedDoctor: object
};

export default BookAppointment;
