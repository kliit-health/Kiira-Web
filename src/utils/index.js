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
