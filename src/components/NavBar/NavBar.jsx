import { Navbar, IconButton, List, ListItem, Button } from '@material-tailwind/react';
import { ReactComponent as KiiraLogoSvg } from 'src/assets/images/KiiraLogo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { AppButton, AppLinkExternal } from '../shared/styledComponents';
import { ReactComponent as GlobeIconSvg } from 'src/assets/images/globeIcon.svg';
import useAuth from 'src/hooks/useAuth';

export default function AppNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { logout } = useAuth();

  const navList = (
    <List className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      {/* <AppLink href="#">
        <ListItem>Pricing</ListItem>
      </AppLink> */}
      <AppLinkExternal as="a" href="https://www.kiira.io/locations">
        <ListItem>Location</ListItem>
      </AppLinkExternal>
      <AppLinkExternal as="a" href="https://www.kiira.io/about">
        <ListItem>About</ListItem>
      </AppLinkExternal>
      <AppLinkExternal href="https://www.kiira.io/blog">
        <ListItem className="hover:opacity-80">Kick it with Kiira</ListItem>
      </AppLinkExternal>
      <AppLinkExternal href="https://www.kiira.io/podcast">
        <ListItem>Podcast</ListItem>
      </AppLinkExternal>
    </List>
  );

  return (
    <Navbar className="sticky inset-0 z-10 block max-w-full lg:max-w-screen-2xl px-1 py-3 mx-auto bg-transparent border-transparent rounded-none shadow-none h-max">
      <div className="container flex items-center justify-between mx-auto text-blue-gray-900">
        <Link to={ROUTES.INDEX}>
          <KiiraLogoSvg className="w-24 text-md" />
        </Link>

        <div className="flex flex-row items-center gap-12">
          <div className="hidden lg:block">{navList}</div>
          <div className="flex flex-row items-center gap-1">
            <Link
              to={ROUTES.BOOK_APPOINTMENT}
              className="hidden text-kiiraBlue lg:inline-block text-sm">
              Book an appointment
            </Link>

            {pathname !== ROUTES.SIGINUP_SUBSCRIPTION ? (
              <Link to={ROUTES.SUBSCRIPTION}>
                <AppButton
                  size="sm"
                  className="px-4 py-2 text-white capitalize text-[10px] shadow-transparent">
                  Join Kiira
                </AppButton>
              </Link>
            ) : (
              <Link to={ROUTES.SUBSCRIPTION}>
                <AppButton
                  size="sm"
                  className="px-4 py-2 text-white capitalize text-[10px] shadow-transparent">
                  Join Kiira
                </AppButton>
              </Link>
              // <AppLinkExternal href="https://www.kiira.io/become-a-member">
              //   {' '}
              //   <AppButton
              //     size="sm"
              //     className="px-4 py-2 text-white capitalize text-[10px] shadow-transparent">
              //     Join Kiira
              //   </AppButton>
              // </AppLinkExternal>
            )}
            {pathname === ROUTES.SIGINUP_SUBSCRIPTION ? (
              <Button
                size="sm"
                variant="text"
                onClick={() => {
                  logout();
                  navigate(ROUTES.LOGIN);
                }}
                className="text-red-500 hover:bg-white uppercase hover:shadow-sm">
                Log Out
              </Button>
            ) : null}
            <IconButton
              variant="text"
              ripple={false}
              size="sm"
              className="hidden w-auto p-0 lg:inline-block ml-2">
              <GlobeIconSvg className="w-4 h-4" />
            </IconButton>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
