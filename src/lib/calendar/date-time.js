const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Is it leap year or not?
const isLeapYear = year => year % 4 === 0;

// Max # of days displayed in a month is 6 x 7 = 42
const getEmptyRows = () => {
  return Array.from({ length: 42 }).map(() => []);
};

// Determining # of days in Feb
const getMonthDays = (index, year) => {
  return index !== 1 ? monthDays[index] : isLeapYear(year) ? 29 : 28;
};

// Getting # of days in a month
const getMonthStats = (monthIndex, year) => {
  const today = new Date(year, monthIndex, 1);
  const index = today.getMonth();
  return {
    name: index[index],
    days: getMonthDays(index, year)
  };
};

export const getMonthName = index => monthNames[index];

// Getting days for selected month
export const getDateRows = (monthIndex, year) => {
  const { days } = getMonthStats(monthIndex, year);
  const { days: daysPrev } = getMonthStats(monthIndex-1, year);

  const rows = getEmptyRows();
  // Calculating day of the week when current month start and end
  const startIndex = new Date(year, monthIndex, 1).getDay();
  const endIndex = new Date(year, monthIndex+1, 0).getDay();

  // Filling rows array with days from previous, current & next month
  Array.from({ length: days }).forEach((_, i) => {
    const index = startIndex + i;
    if (i < startIndex) {
      rows[i] = daysPrev - startIndex + 1 + i;
    }; 
    if (i < 7 - endIndex -1) {
      rows[days+startIndex+i] = i +1;
    };
    rows[index] = i + 1;
  });
  
  const filled = rows.map(i => (Array.isArray(i) ? undefined : i));
  return filled[35] ? filled : filled.slice(0, -7);
};

export const noop = () => {};

export const uuid = (() => {
  let id = 1;
  return () => {
    return ++id;
  };
})();
