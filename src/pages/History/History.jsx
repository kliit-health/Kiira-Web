import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AddButton, BookingCard, Empty } from 'src/components';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { useAppointmentsHistory } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';
import { searchFilter } from 'src/utils/searchFilter';

const History = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useAppointmentsHistory();
  const appointments = data?.data?.booking_history;

  const [searchText, setSearchText] = useState(''); //'payment_ticketed'
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);

  useEffect(() => {
    if (isEmpty(appointments)) return;
    setFilteredAppointments(appointments);
  }, [appointments]);

  useEffect(() => {
    if (searchText === 'canceled') {
      const filteer = appointments?.filter((booking) => booking?.appointment?.canceled);
      setFilteredAppointments(filteer);
      return;
    }

    if (searchText === 'payment_ticketed') {
      const filteer = appointments?.filter(
        (booking) => !booking?.appointment?.canceled && booking?.status === 'payment_ticketed'
      );
      import.meta.env.DEV &&
        console.log('\n 🚀 ~ file: History.jsx:36 ~ useEffect ~ filteer:', filteer);
      setFilteredAppointments(filteer);
      return;
    }
    // searchFilter(searchText, 'status', setSearchText, appointments, setFilteredAppointments);
  }, [appointments, searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
    searchFilter(text, 'status', setSearchText, appointments, setFilteredAppointments);
  };

  return (
    <ContentContainer
      width="100%"
      height="100%"
      className="h-full min-h-[50vh] p-4 lg:px-10 lg:py-4 gap-4">
      {isLoading ? (
        <ContentContainer className="flex h-full w-full min-h-[300px] items-center justify-center">
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

      {!isLoading ? (
        <>
          <AddButton label="New Booking" onAddClick={() => navigate(ROUTES.BOOK_APPOINTMENT)} />
          <ContentContainer className="flex-row gap-2 items-center w-full mt-8">
            <AppTypography
              variant="small"
              className="text-kiiraText text-[0.875rem] uppercase font-medium">
              Filter:
            </AppTypography>

            <div className="relative h-8 min-w-[60px]">
              <select
                value={searchText}
                onChange={(e) => {
                  handleSearch(e.target.value);
                  return {};
                }}
                className="peer h-full w-full rounded-[7px] border border-[#E4E7F3] bg-kiiraBg2 px-2 py-2 font-sans text-[0.65rem] font-medium text-kiiraText outline outline-0 transition-all  placeholder-shown:border-kiiraText empty:!bg-red-500 focus:border focus:border-kiiraBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                <option value="" className="text-kiiraText text-xs">
                  All
                </option>
                <option value="payment_ticketed" className="text-kiiraText text-xs">
                  Upcoming Appointments
                </option>
                <option value="book_on_hold">Reserved Appointments</option>
                <option value="external_appointment">External Appointments</option>
                <option value="canceled">Canceled Appointments</option>
                <option value="payment_successful">Requires Attention</option>
                <option value="payment_failed">Failed Bookings</option>
              </select>
            </div>
          </ContentContainer>
          {filteredAppointments?.map((booking, index) => {
            // console.log('\n 🚀 ~ file: History.jsx:40 ~ {appointments?.map ~ booking:', booking);
            if (booking?.status === 'pending' || booking?.status === 'payment_successful') return;
            return (
              <BookingCard
                bookingData={booking}
                bookingAction={(data) =>
                  navigate(`${ROUTES.VIEW_BOOKING}/${booking?.id}`, { state: data })
                }
                key={index?.toString()}
              />
            );
          })}

          {isEmpty(filteredAppointments) && !isLoading ? <Empty /> : null}
        </>
      ) : null}
    </ContentContainer>
  );
};

export default History;
