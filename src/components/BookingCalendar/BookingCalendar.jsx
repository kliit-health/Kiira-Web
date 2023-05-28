import React, { useState } from 'react';
import { AppTypography, CalendarWrapper, ContentContainer } from '../shared/styledComponents';
import { Calendar, utils } from 'react-modern-calendar-datepicker';

const BookingCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <>
      <AppTypography
        variant="h6"
        className="text-[#112211] font-semibold text-xs lg:text-base w-full">
        Edit your date
      </AppTypography>

      <CalendarWrapper className="col w-full flex-row flex-wrap lg:flex-nowrap gap-0.5 ">
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          minimumDate={utils().getToday()}
          calendarClassName="w-full lg:w-1/2 p-2 min-w-min shadow-none lg:rounded-r-none "
          calendarSelectedDayClassName="h-4 w-8 md:h-10 md:w-10 rounded-full"
          colorPrimary="#3F84FF"
        />
        <ContentContainer className="w-full lg:w-1/2 px-6 py-3 rounded-2xl lg:rounded-l-none bg-white flex col gap-4">
          <ContentContainer>
            <AppTypography variant="lead" className="font-medium text-xs">
              Thursday, April 16
            </AppTypography>
            <AppTypography variant="lead" className="font-medium text-xs">
              TIME ZONE: <b>LAGOS (GMT+01:00)</b>
            </AppTypography>
          </ContentContainer>

          <ContentContainer>
            <div className="grid grid-flow-row md:grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                '12:00 AM',
                '12:30 AM',
                '1:00 AM',
                '12:00 AM',
                '12:30 AM',
                '1:00 AM',
                '12:00 AM',
                '12:30 AM',
                '1:00 AM'
              ].map((time, index) => {
                return (
                  <ContentContainer
                    // onClick={() => navigate(ROUTES.REVIEW_APPOINTMENT)}
                    className="col bg-kiiraBg2 rounded-2xl flex items-center justify-center h-20 hover:shadow-md cursor-pointer "
                    key={index.toString()}>
                    <AppTypography variant="small" className="font-medium text-sm">
                      {time}
                    </AppTypography>
                  </ContentContainer>
                );
              })}
            </div>
          </ContentContainer>
        </ContentContainer>
      </CalendarWrapper>
    </>
  );
};

export default BookingCalendar;
