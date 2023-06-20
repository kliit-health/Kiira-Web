import React, { useEffect, useState } from 'react';
import { AppTypography, CalendarWrapper, ContentContainer } from '../shared/styledComponents';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import { element, func, object } from 'prop-types';
import { useAvailableDates } from 'src/queries/queryHooks';
import moment from 'moment-timezone';
import isEmpty from 'src/utils/isEmpty';

const BookingCalendar = ({ dateLabel, onTimeSelect, appointmentType, doctor }) => {
  // console.log(' \n 🚀 ~ file: BookingCalendar.jsx:7 ~ BookingCalendar ~ doctor:', doctor);
  // console.log(
  //   ' \n 🚀 ~ file: BookingCalendar.jsx:7 ~ BookingCalendar ~ appointmentType:',
  //   appointmentType
  // );
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  console.log(
    ' \n 🚀 ~ file: BookingCalendar.jsx:15 ~ BookingCalendar ~ selectedDay:',
    selectedDay
  );

  const payload = {
    month: selectedDay || moment(new Date()).format('YYYY-MM-DD'),
    appointmentTypeID: appointmentType.id
  };
  const { data, isLoading, error, refetch } = useAvailableDates(payload);
  console.log(' \n 🚀 ~ file: BookingCalendar.jsx:27 ~ BookingCalendar ~ isLoading:', isLoading);
  console.log(' \n 🚀 ~ file: BookingCalendar.jsx:26 ~ BookingCalendar ~ error:', error);
  console.log(' \n 🚀 ~ file: BookingCalendar.jsx:26 ~ BookingCalendar ~ data:', data);

  useEffect(() => {
    refetch();
  }, [selectedDay, appointmentType, doctor]);

  return (
    <>
      {dateLabel ? (
        dateLabel
      ) : (
        <AppTypography
          variant="h6"
          className="text-[#112211] font-semibold text-xs lg:text-base w-full text-center">
          Choose a date
        </AppTypography>
      )}

      <CalendarWrapper className="col w-full flex-row flex-wrap lg:flex-nowrap gap-0.5 ">
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          minimumDate={utils().getToday()}
          calendarClassName="w-full lg:w-1/2 p-2 min-w-min shadow-none lg:rounded-r-none "
          calendarSelectedDayClassName="h-4 w-8 md:h-10 md:w-10 rounded-full"
          colorPrimary="#3F84FF"
          shouldHighlightWeekends
          disabledDays={[
            {
              year: 2023,
              month: 6,
              day: 27
            },
            {
              year: 2023,
              month: 6,
              day: 30
            },
            {
              year: 2023,
              month: 6,
              day: 20
            }
          ]}
        />
        <ContentContainer className="w-full lg:w-1/2 px-6 py-3 rounded-2xl lg:rounded-l-none bg-white flex col gap-4">
          <ContentContainer>
            {!isEmpty(selectedDay) ? (
              <AppTypography variant="lead" className="font-medium text-xs">
                {moment(
                  `${selectedDay?.day}-${selectedDay?.month}-${selectedDay?.year}`,
                  'D-MM-YYY'
                ).format('dddd')}
                ,{' '}
                {moment(
                  `${selectedDay?.day}-${selectedDay?.month}-${selectedDay?.year}`,
                  'D-MM-YYY'
                ).format('MMMM DD,')}
              </AppTypography>
            ) : (
              <AppTypography variant="lead" className="font-medium text-xs">
                {moment().format('dddd')}, {moment().format('MMMM DD,')}
              </AppTypography>
            )}
            <AppTypography variant="lead" className="font-medium text-xs">
              TIME ZONE:{' '}
              <b className="uppercase">
                {moment.tz.guess(true).split('/')[1]} (
                {moment.tz(moment.tz.guess(true)).format('zZ')})
              </b>
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
                    onClick={onTimeSelect}
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

BookingCalendar.propTypes = {
  dateLabel: element,
  onTimeSelect: func,
  doctor: object,
  appointmentType: object
};
BookingCalendar.defaultProps = {
  onTimeSelect: () => {},
  doctor: {},
  appointmentType: {}
};

export default BookingCalendar;
