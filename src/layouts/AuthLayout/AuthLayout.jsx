import { element } from 'prop-types';
import { NavBar } from 'src/components';
import { LayoutWrapper } from 'src/components/shared/styledComponents';

const AuthLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <NavBar />
      {children}
    </LayoutWrapper>
  );
};

export default AuthLayout;

AuthLayout.propTypes = {
  children: element
};
