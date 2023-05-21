import dummyProfilePhoto from 'src/assets/images/profilePhoto.png';
import { ReactComponent as GlobeIconSvg } from 'src/assets/images/globeIcon.svg';
import { ReactComponent as KiiraLogoSvg } from 'src/assets/images/KiiraLogo.svg';
import { ReactComponent as OvalPlan1 } from 'src/assets/icons/oval.svg';
import { ReactComponent as OvalPlan2 } from 'src/assets/icons/oval2.svg';
import { ReactComponent as Calender } from 'src/assets/icons/calenderIcon.svg';
import { ReactComponent as Location } from 'src/assets/icons/Location.svg';
import sliderImg1 from 'src/assets/images/sliderImg1.png';
import sliderImg2 from 'src/assets/images/sliderImg2.png';
import MessageProfilePicture from 'src/assets/images/inbox_profile.png';
import cardPic1 from 'src/assets/images/cardPicture1.png';
import cardPic2 from 'src/assets/images/cardPicture2.png';
import girl from 'src/assets/images/girl.png';
import girlBg from 'src/assets/images/girlPurpleBg.png';
import aid from 'src/assets/images/aid.png';

export const IMAGES = {
  profilePhoto: dummyProfilePhoto,
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
  LocationIcon: Location
};

export const userData = {
  firstName: 'Ayodeji',
  lastName: 'Osindele',
  email: 'aosindele@gmail.com',
  phoneNumber: '01-77939920',
  photo: IMAGES.profilePhoto
};

export const kiiraSubscriptions = [
  {
    cycle: 'Monthly',
    colorCode: '#E2EDFF',
    colorCodeBold: '#3F84FF',
    planIcon: OvalPlan1,
    amount: '15',
    currency: 'USD',
    currencyCode: '$',
    description: '$15 billed monthly',
    package: [
      'Same day or next-day appointments, in person or over video',
      'Save extra trips with Drop-in lab services at our Melrose office',
      'Get second opinions and peace of mind with 24/7 on-demand care via Video Chat from anywhere with providers available in every state.',
      'Call in or easily book same/next-day appointments on your desktop or phone. No app needed.',
      'Online access to your health summaries and care plans.'
    ]
  },
  {
    cycle: 'Yearly',
    colorCode: '#DFE5FF',
    colorCodeBold: '#777AFF',
    planIcon: OvalPlan2,
    amount: '150',
    currency: 'USD',
    currencyCode: '$',
    description: '$150 billed annually - Yup! Thats less than $13 per month.',
    package: [
      'Same day or next-day appointments, in person or over video',
      'Save extra trips with Drop-in lab services at our Melrose office',
      'Get second opinions and peace of mind with 24/7 on-demand care via Video Chat from anywhere with providers available in every state.',
      'Call in or easily book same/next-day appointments on your desktop or phone. No app needed.',
      'Online access to your health summaries and care plans.'
    ]
  }
];

export const kiiraUpdates = [
  {
    title: 'New Year, More Self Care',
    content: 'How to implement a self-care mindset in 2023',
    author: 'Reem Abdalla',
    imageSrc: IMAGES?.cardPic1
  },
  {
    title: 'Equitable healthcare for those with',
    content:
      'Ensuring equitable healthcare for individuals with disabilities is an important issue that...',
    author: 'Reem Abdalla',
    imageSrc: IMAGES?.cardPic2
  },
  {
    title: 'Equitable healthcare for those with',
    content:
      'Ensuring equitable healthcare for individuals with disabilities is an important issue that...',
    author: 'Reem Abdalla',
    imageSrc: IMAGES?.cardPic2
  },
  {
    title: 'Equitable healthcare for those with',
    content:
      'Ensuring equitable healthcare for individuals with disabilities is an important issue that...',
    author: 'Reem Abdalla',
    imageSrc: IMAGES?.cardPic2
  }
];
