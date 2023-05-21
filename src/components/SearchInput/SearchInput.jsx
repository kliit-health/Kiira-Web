import { string } from 'prop-types';
import React from 'react';
import { IMAGES } from 'src/data';

const SearchInput = ({ placeholder, label, ...rest }) => {
  return (
    <div className="w-full relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <IMAGES.Search />
      </div>
      <input
        type="search"
        id="default-search"
        class="block w-full px-4 py-2 pl-8 min-w-[100px] focus:outline-0 text-xs text-kiiraText border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-kiiraText dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder || label}
        required
        {...rest}
      />
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: string,
  label: string
};

SearchInput.defaultProps = {
  placeholder: '',
  label: 'Search'
};

export default SearchInput;
