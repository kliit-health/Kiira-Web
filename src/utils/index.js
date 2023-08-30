import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  timerProgressBar: true,
  timer: 5000
});

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const getCountryFlag = (iso2) =>
  iso2?.replace(/./g, (ch) => String.fromCodePoint(0x1f1a5 + ch.toUpperCase().charCodeAt()));
