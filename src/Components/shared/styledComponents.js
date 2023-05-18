import { Button, Input } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

export const LayoutWrapper = styled.div`
  ${(props) => props.hideScroll && hideScrollbar}
  ${tw`flex flex-col w-full h-screen max-h-screen gap-10 p-4 mx-auto overflow-auto max-w-screen-xl text-kiiraText lg:px-8 lg:pb-2 lg:pt-0 md:pl-16 md:pr-16 bg-kiiraBg`}
`;

export const AppLink = styled(Link)`
  ${tw`text-sm font-medium text-kiiraText`}
`;

export const AppLinkExternal = styled.a`
  ${tw`text-sm font-medium text-kiiraText`}

  &:hover {
    opacity: 0.75;
  }
`;

export const AppButton = styled(Button)`
  ${tw`p-2 text-sm font-bold`}
  background: ${(background) =>
    background || 'linear-gradient(290.44deg, #0253E2 13.57%, #00C0E2 86.43%)'};
  border-radius: 12px;
`;

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

AppLinkExternal.defaultProps = {
  rel: 'noreferrer',
  target: '_blank'
};

export const hideScrollbar = () => css`
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export const ContentContainer = styled.div`
  ${(props) => props.hideScroll && hideScrollbar}
  position: ${({ position }) => position};
  display: flex;
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
