import moment from 'moment-timezone';

const getDaysOfMonth = (year, month) => {
  const monthDate = moment(`${year}-${month}`, 'YYYY-MM');
  let daysInMonth = monthDate.daysInMonth();

  if (isNaN(daysInMonth)) return;

  let arrDays = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const dayofTheMonth = `${year}-${month}-${i.toString().padStart(2, '0')}`;
    const formattedDate = moment(dayofTheMonth).format('YYYY-MM-DD');
    arrDays.push(formattedDate);
  }

  return arrDays;
};

export const getDisabledDate = (selectedMonth, availableDate) => {
  const year = selectedMonth?.split('-')[0];
  const month = selectedMonth?.split('-')[1];

  const dateList = getDaysOfMonth(year, month);

  const enabledDates = availableDate?.map((date) => {
    return moment(date.date).format('YYYY-MM-DD');
  });

  const newArray = [];

  dateList
    ?.filter((date) => {
      return enabledDates?.find((id) => id === date) === undefined;
    })
    .map((date) => {
      newArray.push({
        year: Number(date?.split('-')[0]),
        month: Number(date?.split('-')[1]),
        day: Number(date?.split('-')[2])
      });
    });

  return newArray;
};
