import { array, func } from 'prop-types';
import { string } from 'prop-types';

export const searchFilter = (
  searchText,
  searchParams,
  setSearchText,
  searchData,
  updateFilteredData
) => {
  console.log(" \n 🚀 ~ file: searchFilter.js:11 ~ updateFilteredData:", updateFilteredData)
  console.log(" \n 🚀 ~ file: searchFilter.js:11 ~ setSearchText:", setSearchText)
  console.log(" \n 🚀 ~ file: searchFilter.js:11 ~ searchParams:", searchParams)
  console.log(" \n 🚀 ~ file: searchFilter.js:11 ~ searchText:", searchText)
  setSearchText(searchText);
  let filter = searchParams;

  const filterData = searchData?.filter(function (obj) {
    if (obj[filter]?.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
      return obj[filter];
    } else if (obj[filter]?.toLowerCase().startsWith(searchText.toLowerCase())) {
      return obj[filter];
    }
    //return obj[filter] === searchText;
  });

  return updateFilteredData(filterData);
};

searchFilter.propTypes = {
  searchText: string,
  searchParams: string,
  setSearchText: func,
  searchData: array,
  updateFilteredData: func
};

searchFilter.defaultPropTypes = {
  searchText: '',
  searchParams: '',
  setSearchText: () => {},
  searchData: [],
  updateFilteredData: () => {}
};
