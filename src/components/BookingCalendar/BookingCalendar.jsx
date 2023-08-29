import React, { useEffect, useState } from 'react';
import { AppTypography, CalendarWrapper, ContentContainer } from '../shared/styledComponents';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import { element, func, object, string } from 'prop-types';
import { useAvailableDates, useAvailableTimes } from 'src/queries/queryHooks';
import moment from 'moment-timezone';
import isEmpty from 'src/utils/isEmpty';
import { ThreeDots } from 'react-loader-spinner';
import { Toast } from 'src/utils';
import { getDisabledDate } from 'src/utils/dateUtil';
import { Empty } from '..';
import { useLocalStore } from 'src/store';
import { Alert } from '@material-tailwind/react';

const BookingCalendar = ({ dateLabel, onTimeSelect, appointmentType, doctor, selectedDate }) => {
  const defaultDate = {
    year: Number(moment(new Date()).format('YYYY')),
    month: Number(moment(new Date()).format('MM')),
    day: Number(moment(new Date()).add(1, 'day').format('DD'))
  };
  const [selectedDay, setSelectedDay] = useState(defaultDate);
  const [disabledDate, setDisabledDate] = useState([]);
  const [monthDate, setMonthDate] = useState(moment(new Date()).format('YYYY-MM'));
  const [timeDate, setTimeDate] = useState(moment(new Date()).add(1, 'day').format('YYYY-MM-DD'));
  const setBookingData = useLocalStore((state) => state.setStoredBookingCheckout);

  const minimumDate = {
    year: Number(moment(new Date()).format('YYYY')),
    month: Number(moment(new Date()).format('MM')),
    day: Number(moment(new Date()).add(1, 'day').format('DD'))
  };

  // const handleNextMounth = () => {
  //   if (selectedDay) {
  //     const nextMounth = selectedDay.month;
  //     if (nextMounth + 1 <= 12) {
  //       const nextDate = { ...selectedDay, month: nextMounth + 1 };
  //       setSelectedDay({ ...nextDate });
  //     } else {
  //       const nextDate = { ...selectedDay, month: 1, year: selectedDay.year + 1 };
  //       setSelectedDay({ ...nextDate });
  //     }
  //   }
  // };

  // const handlePrevMounth = () => {
  //   if (selectedDay) {
  //     const nextMounth = selectedDay.month;
  //     if (nextMounth - 1 > 0) {
  //       const nextDate = { ...selectedDay, month: nextMounth - 1 };
  //       setSelectedDay({ ...nextDate });
  //     } else {
  //       const nextDate = { ...selectedDay, month: 12, year: selectedDay.year - 1 };
  //       setSelectedDay({ ...nextDate });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   setSelectedDay(utils('en').getToday());
  // }, []);

  const datePayload = {
    month: monthDate === 'Invalid date' ? moment(new Date()).format('YYYY-MM') : monthDate,
    appointmentTypeID: appointmentType?.appointment_type_id || appointmentType?.id,
    timezone: moment.tz.guess(true),
    ...(!isEmpty(doctor) && { calendarID: doctor.id })
  };

  const {
    data: dateData,
    isLoading: availableDatesLoading,
    error,
    refetch
  } = useAvailableDates(datePayload);
  const availableDates = dateData?.data?.dates;

  const timePayload = {
    date: timeDate === 'Invalid date' ? moment(new Date()).add(1, 'day').format('YYYY-MM-DD') : timeDate,
    appointmentTypeID: appointmentType?.appointment_type_id || appointmentType?.id,
    timezone: moment.tz.guess(true),
    ...(!isEmpty(doctor) && { calendarID: doctor.id })
  };

  const {
    data: timeData,
    isLoading: timesDatesLoading,
    error: timeError,
    refetch: refetchTimeData,
    isFetching
  } = useAvailableTimes(timePayload);

  const timesDates = timeData?.data?.times;

  useEffect(() => {
    const availDate = isEmpty(availableDates)
      ? [moment(new Date()).format('YYYY-MM-DD')]
      : availableDates;

    const disabledDates = getDisabledDate(monthDate, availDate);

    setDisabledDate(disabledDates);
  }, [monthDate, availableDates]);

  useEffect(() => {
    if (isEmpty(selectedDay)) {
      setMonthDate(moment().format('YYYY-MM'));
      setTimeDate(moment().format('YYYY-MM-DD'));
      return;
    }
    const newMonth = `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.day}`;
    setMonthDate(moment(newMonth).format('YYYY-MM'));
    setTimeDate(moment(newMonth).format('YYYY-MM-DD'));
  }, [selectedDay]);

  useEffect(() => {
    refetch();
  }, [monthDate, doctor]);

  useEffect(() => {
    refetchTimeData();
  }, [timeDate, doctor]);

  const errorMsg =
    error?.response?.data?.message ||
    timeError?.response?.data?.message ||
    timeError?.message ||
    error?.message;

  useEffect(() => {
    if (!errorMsg) return;
    Toast.fire({
      icon: 'error',
      title: errorMsg
    });
  }, [errorMsg]);

  useEffect(() => {}, [disabledDate]);

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
        {availableDatesLoading ? (
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
        ) : (
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            minimumDate={minimumDate}
            calendarClassName="w-full lg:w-1/2 p-2 min-w-min shadow-none lg:rounded-r-none "
            calendarSelectedDayClassName="m-0"
            colorPrimary="#3F84FF"
            shouldHighlightWeekends
            disabledDays={disabledDate}
            locale={'en'}
          />
        )}
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

          <ContentContainer className="w-full h-[350px] overflow-hidden overflow-y-auto">
            {timesDatesLoading || isFetching ? (
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

            {!timesDatesLoading && isEmpty(timesDates) && !availableDatesLoading && !isFetching ? (
              <Empty
                label={
                  <Alert color="pink" className="text-white bg-opacity-85">
                    {errorMsg || ' No time slot available for selected date:'}
                    <br />{' '}
                    <b>
                      {' '}
                      {
                        moment(
                          `${selectedDay?.day}-${selectedDay?.month}-${selectedDay?.year}`,
                          'D-MM-YYY'
                        ).format('dddd')
                        // moment(
                        //   `${selectedDay?.day}-${selectedDay?.month}-${selectedDay?.year}`,
                        //   'D-MM-YYY'
                        // ).format('MMMM DD,')
                      }{' '}
                      {moment(
                        `${selectedDay?.day}-${selectedDay?.month}-${selectedDay?.year}`,
                        'D-MM-YYY'
                      ).format('MMMM DD,')}
                    </b>
                  </Alert>
                }
              />
            ) : null}

            {!timesDatesLoading && !isFetching ? (
              <div className="grid grid-flow-row md:grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {timesDates?.map((time, index) => {
                  const timeSlots = moment(time?.time).format();
                  return (
                    <ContentContainer
                      onClick={() => {
                        setTimeout(() => {
                          setBookingData({ appointmentType, doctor, bookingCheckout: time });

                          onTimeSelect({ appointmentType, doctor, bookingCheckout: time });
                        }, 250);
                      }}
                      className={[
                        moment(timeSlots).format('hh:mm') == moment(selectedDate).format('hh:mm')
                          ? 'col bg-kiiraBg3 rounded-2xl flex items-center justify-center h-20 shadow-md cursor-pointer p-2 border-kiiraBlue'
                          : 'col bg-kiiraBg2 rounded-2xl flex items-center justify-center h-20 hover:shadow-md cursor-pointer p-2'
                      ]}
                      key={index.toString()}>
                      <AppTypography variant="small" className="font-medium text-sm text-center">
                        {moment(timeSlots).format('LT')}
                      </AppTypography>
                    </ContentContainer>
                  );
                })}
              </div>
            ) : null}
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
  appointmentType: object,
  selectedDate: string
};
BookingCalendar.defaultProps = {
  onTimeSelect: () => {},
  doctor: {},
  appointmentType: {},
  selectedDate: ''
};

export default BookingCalendar;
