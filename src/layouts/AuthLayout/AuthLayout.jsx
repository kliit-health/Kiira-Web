import { Typography, Carousel } from '@material-tailwind/react';
import { bool, element } from 'prop-types';
import { AppNavBar } from 'src/components';
import { ContentContainer, LayoutWrapper } from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';

const carouselContent = [
  {
    src: IMAGES.sliderImg1,
    description: 'You’ve got the power to take charge of your health',
    alt: ''
  },
  {
    src: IMAGES.sliderImg2,
    description: `Book a doctor’s appointment with ease`,
    alt: ''
  },
  {
    src: IMAGES.sliderImg1,
    description: 'Kiira Health Management Services',
    alt: ''
  }
];

const AuthLayout = ({ children, showSlider, hideScroll }) => {
  return (
    <LayoutWrapper hideScroll={hideScroll}>
      <AppNavBar />
      {showSlider ? (
        <ContentContainer className="flex flex-row w-full h-full gap-2 mb-2 flex-nowrap">
          <div className="w-full h-full">{children}</div>

          <Carousel
            className="hidden shadow-none rounded-xl lg:flex max-h-max"
            loop
            autoplay
            prevArrow={() => {}}
            nextArrow={() => {}}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute z-50 flex gap-2 rounded-xl bottom-4 left-2/4 -translate-x-2/4">
                {new Array(length).fill('').map((_, i) => (
                  <span
                    key={i}
                    className={`block h-2 cursor-pointer rounded-full  transition-all content-[''] ${
                      activeIndex === i ? 'bg-kiiraBlue w-5 rounded-2xl' : 'bg-white w-2'
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}>
            {carouselContent.map((item, index) => {
              return (
                <div className="relative w-full h-full" key={index?.toString()}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="object-cover w-full h-full bg-kiiraText"
                  />
                  <div className="absolute bottom-0 w-full h-3/4 flex place-items-end bg-gradient-to-t from-[#15346B] to-black/0 from-10% via-sky-500 via-30%">
                    <div className="w-full m-10">
                      <Typography
                        variant="lead"
                        color="white"
                        className="px-2 py-5 text-4xl font-medium leading-[1.35] tracking-wide w-4/5">
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </ContentContainer>
      ) : (
        children
      )}
    </LayoutWrapper>
  );
};

export default AuthLayout;

AuthLayout.propTypes = {
  children: element,
  showSlider: bool,
  hideScroll: bool
};
