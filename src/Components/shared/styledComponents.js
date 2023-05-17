import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

export const LayoutWrapper = styled.div`
  ${tw`flex flex-col w-full h-screen max-h-screen gap-12 p-4 mx-auto overflow-y-auto max-w-screen-2xl text-kiiraText lg:px-8 lg:py-2 md:pl-16 md:pr-16 bg-kiiraBg`}
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
  background: linear-gradient(290.44deg, #0253E2 13.57%, #00C0E2 86.43%);
  border-radius: 12px;
`;

AppLinkExternal.defaultProps = {
  rel: 'noreferrer',
  target: '_blank'
};
