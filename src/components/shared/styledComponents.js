import { Avatar, Button, List, ListItem, MenuItem, Typography } from '@material-tailwind/react';
import { Link, NavLink } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import { ReactComponent as AddCircle } from 'src/assets/icons/Add_circle.svg';
import { profileState } from 'src/data';

export const ContentContainer = styled.div`
  ${(props) => props.hideScroll && hideScrollbar}
  position: ${({ position }) => position};
  display: flex;
  color: ${({ color }) => color};
  flex: ${({ flex }) => flex};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  flex-direction: ${({ column, row, flexDirection }) =>
    row ? 'row' : column ? 'column' : flexDirection ? flexDirection : 'column'};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  height: ${({ height }) => height};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  background: ${({ background }) => background};
  border-radius: ${({ borderRadius }) => borderRadius};
  gap: ${({ gap }) => gap};
  cursor: ${({ cursor }) => cursor};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ border }) => border || 'transparent'};
  overflow: ${({ overflow }) => overflow};
  overflow-x: ${({ overflowX }) => overflowX};
  overflow-y: ${({ overflowY }) => overflowY};
  box-shadow: ${({ boxShadow }) => boxShadow};
  z-index: ${({ zIndex }) => zIndex};
`;

export const AppTypography = styled(Typography)`
  ${tw`font-poppins`}
  font-family: 'Poppins', sans-serif !important;
`;

export const LayoutWrapper = styled.div`
  ${(props) => props.hideScroll && hideScrollbar}
  ${tw`flex relative flex-col w-full h-screen gap-8 p-4 pt-0 mx-auto overflow-auto max-w-screen-xl lg:max-w-screen-2xl text-kiiraText lg:px-8 lg:pb-2 lg:pt-0 md:pl-16 md:pr-16 bg-kiiraBg`}
`;

export const ItemCardWrapper = styled(ContentContainer)`
  ${tw`col-auto flex-col w-full max-w-max rounded-3xl h-full bg-kiiraBg2 gap-2`}
`;

export const AppLink = styled(Link)`
  ${tw`text-sm font-medium text-kiiraText`}
`;

export const AppNavLink = styled(NavLink)`
  ${tw`text-sm font-medium text-kiiraText`}
`;

export const AppLinkExternal = styled.a`
  ${tw`text-sm font-medium text-kiiraText`}
`;

export const AddCircleIcon = styled(AddCircle)``;

AppLinkExternal.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

export const NavList = styled(List)`
  ${tw`flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6`}
`;

export const NavListItem = styled(ListItem)`
  ${tw`text-kiiraText text-xs font-medium bg-kiiraBg2`}
`;

export const MenuListItem = styled(MenuItem)`
  ${tw`text-kiiraText text-xs font-medium bg-kiiraBg2 flex items-center gap-2 my-2.5`}
`;

export const AppButton = styled(Button)`
  ${tw`p-2 text-sm font-bold text-white capitalize! shadow-transparent`}
  background: ${(background) =>
    background ? background : `linear-gradient(290.44deg, #0253E2 13.57%, #00C0E2 86.43%)`};
  border-radius: 12px;
`;

AppButton.defaultProps = {
  background: `linear-gradient(290.44deg, #0253E2 13.57%, #00C0E2 86.43%);`,
  size: 'md'
};

export const Divider = styled.hr`
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  &:before {
    content: '';
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    background: rgba(
      111,
      120,
      136,
      0.2
    ); // linear-gradient(to right, transparent, #6F7888, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;
    padding: 0 0.5em;
    line-height: 1.5em;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: #6f7888;
    background-color: #fcfcfa;
  }
`;

export const hideScrollbar = () => css`
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export const AppAvatar = styled(Avatar)`
  ${tw`p-[4px] object-cover rounded-full mt-6 border border-solid`}
  /* border-color: ${({
    status
  }) => (status === profileState.online ? tw`border-[#6467CE]` : tw`border-[#DFDFDF]`)}; */
`;

export const BorderedContainer = styled(ContentContainer)`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='%233F84FFFF' stroke-width='2' stroke-dasharray='14%2c 10' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 14px;
  ${tw`h-32 rounded-2xl min-w-fit flex flex-row items-center border-none justify-center gap-1 flex-wrap hover:opacity-80 hover:cursor-pointer`}
`;

export const CalendarWrapper = styled(ContentContainer)`
  /* .responsive-calendar {
    width: 40%;
    height: 100%;
  }

  ${tw`w-full flex-wrap lg:flex-nowrap`} */

  .Calendar__monthYear.-shown {
    font-weight: 700;
    opacity: 1;
    margin-top: auto;
    margin-bottom: auto;
    /* transform: translateX(-150%); */
    font-size: 1.25rem;
  }

  @media (min-width: 768px) and (max-width: 1440px) {
    .Calendar__monthYear.-shown {
      /* transform: translateX(-120%); */
    }
  }

  @media screen and (max-width: 768px) {
    .Calendar__header {
      padding: 1em 1.9em;
    }

    .Calendar__section {
      padding: 0 0.9em;
    }

    .Calendar__monthYear.-shown {
      /* transform: translateX(-70%); */
    }
    .Calendar__yearText:last-child {
      margin-left: -0.875em;
    }
    .Calendar__day.-ltr {
      min-height: 4.75em;
      font-size: 1em;
    }
  }
`;
