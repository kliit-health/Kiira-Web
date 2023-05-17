import { element } from 'prop-types';
import { LayoutWrapper } from 'src/components/shared/styledComponents';

const MainLayout = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default MainLayout;

MainLayout.propTypes = {
  children: element
};
