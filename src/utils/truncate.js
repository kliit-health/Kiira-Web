export const truncate = (s, n) => {
  return s.length > n ? s.substr(0, n - 1) + '...' : s;
};
