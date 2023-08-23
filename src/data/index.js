import { ReactComponent as GlobeIconSvg } from 'src/assets/images/globeIcon.svg';
import { ReactComponent as KiiraLogoSvg } from 'src/assets/images/KiiraLogo.svg';
import { ReactComponent as OvalPlan1 } from 'src/assets/icons/oval.svg';
import { ReactComponent as OvalPlan2 } from 'src/assets/icons/oval2.svg';
import { ReactComponent as Calender } from 'src/assets/icons/calenderIcon.svg';
import { ReactComponent as Location } from 'src/assets/icons/Location.svg';
import { ReactComponent as SearchIcon } from 'src/assets/icons/Search.svg';
import { ReactComponent as TimeIcon } from 'src/assets/icons/Time.svg';
import { ReactComponent as TimeIconFilled } from 'src/assets/icons/TimeFilled.svg';
import { ReactComponent as LogoutIcon } from 'src/assets/icons/LogoutIcon.svg';
import { ReactComponent as AccountIcon } from 'src/assets/icons/AccountIcon.svg';
import { ReactComponent as CloseIcon } from 'src/assets/icons/Close.svg';
import { ReactComponent as ShareIcon } from 'src/assets/icons/ShareIcon.svg';
import { ReactComponent as PenIcon } from 'src/assets/icons/Pen.svg';
import { ReactComponent as CautionIcon } from 'src/assets/icons/caution.svg';
import { ReactComponent as KiiraBirdieBlack } from 'src/assets/icons/KiiraBirdieBlack.svg';
import sliderImg1 from 'src/assets/images/sliderImg1.png';
import sliderImg2 from 'src/assets/images/sliderImg2.png';
import MessageProfilePicture from 'src/assets/images/inbox_profile.png';
import cardPic1 from 'src/assets/images/cardPicture1.png';
import cardPic2 from 'src/assets/images/cardPicture2.png';
import Empty from 'src/assets/images/empty-box.png';
import girl from 'src/assets/images/girl.png';
import girlBg from 'src/assets/images/girlPurpleBg.png';
import aid from 'src/assets/images/aid.png';
import generalHealth from 'src/assets/images/options/GeneralHealth.png';
import gynecology from 'src/assets/images/options/Gynecology.png';
import healthCoaching from 'src/assets/images/options/HealthCoaching.png';
import mentalHealth from 'src/assets/images/options/MentalHealth.png';
import pregnancy from 'src/assets/images/options/Pregnancy.png';
import primaryCare from 'src/assets/images/options/PrimaryCare.png';
import ultrasound from 'src/assets/images/options/Ultrasound.png';
import DrCandice from 'src/assets/images/doctors/DrCandice.png';
import DrFrancesca from 'src/assets/images/doctors/DrFrancesca.png';
import DrLauraine from 'src/assets/images/doctors/DrLauraine.png';
import DrNneka from 'src/assets/images/doctors/DrNneka.png';
import DrOdunsi from 'src/assets/images/doctors/DrOdunsi.png';
import DrPilar from 'src/assets/images/doctors/DrPilar.png';
import DrScut from 'src/assets/images/doctors/DrScut.png';
import ConfirmBookingBirdie from 'src/assets/images/DrPenguin.png';
import QR from 'src/assets/images/qrCode.png';
import profilePlaceHolder from 'src/assets/images/profilePlaceHolder.jpeg';
import { ReactComponent as PdfIcon } from 'src/assets/icons/pdfIcon.svg';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/Download.svg';
import { ReactComponent as VisaIcon } from 'src/assets/icons/visaWhite.svg';
import { ReactComponent as RadioChecked } from 'src/assets/icons/radioChecked.svg';
import { ReactComponent as DividerIcon } from 'src/assets/icons/DividerShape.svg';
import { ReactComponent as EditIcon } from 'src/assets/icons/EditFilled.svg';

export const IMAGES = {
  dummyProfilePhoto: profilePlaceHolder, // 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295402_1280.png'
  GlobeIconSvg: GlobeIconSvg,
  KiiraLogoSvg: KiiraLogoSvg,
  sliderImg1: sliderImg1,
  sliderImg2: sliderImg2,
  calenderIcon: Calender,
  inboxImg: MessageProfilePicture,
  cardPic1: cardPic1,
  cardPic2: cardPic2,
  girlAvatar: girl,
  girlAvatarBg: girlBg,
  medicalAid: aid,
  LocationIcon: Location,
  Search: SearchIcon,
  GeneralHealth: generalHealth,
  Gynecology: gynecology,
  HealthCoaching: healthCoaching,
  MentalHealth: mentalHealth,
  Pregnancy: pregnancy,
  PrimaryCare: primaryCare,
  Ultrasound: ultrasound,
  DrCandice,
  DrFrancesca,
  DrLauraine,
  DrNneka,
  DrOdunsi,
  DrPilar,
  DrScut,
  TimeIcon,
  TimeIconFilled,
  KiiraBirdieBlack,
  AccountIcon,
  LogoutIcon,
  VisaIcon,
  RadioChecked,
  DownloadIcon,
  PdfIcon,
  CloseIcon,
  Penguin: ConfirmBookingBirdie,
  ShareIcon,
  QR,
  DividerIcon,
  PenIcon,
  EditIcon,
  subscriptionOval1: OvalPlan1,
  Empty,
  CautionIcon
};

export const profileState = {
  online: 'online',
  offline: 'offline',
  busy: 'busy',
  away: 'away',
  unavailable: 'unavailable'
};

export const INPUT_TYPES = {
  CHECKBOX: 'checkbox',
  TEXTBOX: 'textbox',
  YESNO: 'yesno',
  FILE: 'file',
  DROPDOWN: 'dropdown',
  CHECKBOXLIST: 'checkboxlist'
};

export const INPUT_NAMES = {
  full_name: 'Full Name',
  email: 'Email Address'
};
