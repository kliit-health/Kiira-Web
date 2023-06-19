import { useState, useEffect } from 'react';
import {
  IconButton,
  List,
  Navbar,
  Badge,
  Avatar,
  Collapse,
  Menu,
  MenuList,
  MenuHandler,
  MenuItem,
  ListItemPrefix
} from '@material-tailwind/react';
import { ReactComponent as Hamburger } from 'src/assets/icons/hamburger.svg';
import { ReactComponent as KiiraLogoSvg } from 'src/assets/icons/kiiraBirdie.svg';
import { ReactComponent as Message } from 'src/assets/icons/Message.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import {
  AppButton,
  AppLink,
  AppNavLink,
  AppTypography,
  ContentContainer,
  MenuListItem,
  NavListItem
} from '../shared/styledComponents';
import useAuth from 'src/hooks/useAuth';
import { IMAGES } from 'src/data';
import Auth from 'src/middleware/storage';

export default function InnerNavBar() {
  const navigate = useNavigate();
  const isAuthenticated = Auth.isAuthenticated();
  const { user, logout } = useAuth();

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <List className="flex flex-row flex-wrap gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center mx-4 p-0">
      <AppNavLink to={ROUTES.BOOK_APPOINTMENT}>
        {({ isActive }) => (
          <NavListItem className={isActive ? 'text-kiiraBlue' : ''}>
            Book an Appointment
          </NavListItem>
        )}
      </AppNavLink>
      <AppNavLink to={ROUTES.DOCTORS}>
        {({ isActive }) => (
          <NavListItem className={isActive ? 'text-kiiraBlue' : ''}>Doctors</NavListItem>
        )}
      </AppNavLink>
      <AppNavLink to={ROUTES.SUBSCRIPTION}>
        {({ isActive }) => (
          <NavListItem className={isActive ? 'text-kiiraBlue' : ''}>Subscription Plan</NavListItem>
        )}
      </AppNavLink>
      {isAuthenticated ? (
        <AppNavLink to={ROUTES.HISTORY}>
          {({ isActive }) => (
            <NavListItem className={isActive ? 'text-kiiraBlue' : ''}>History</NavListItem>
          )}
        </AppNavLink>
      ) : null}
    </List>
  );

  return (
    <Navbar className="block p-0 max-w-full mx-auto bg-white border-transparent rounded-2xl shadow-none h-max bg-opacity-100 py-1">
      <div className="flex w-full items-center">
        <ContentContainer className="h-full border-r-2 border-t-0 border-l-0 border-b-0 border-kiiraBg">
          <NavLink
            to={ROUTES.INDEX}
            className={({ isActive }) =>
              isActive ? 'border border-kiiraBlue rounded-lg bg-kiiraBlue/10 m-2 mx-3' : 'm-2 mx-3'
            }>
            <IconButton size="lg" variant="text">
              <KiiraLogoSvg className="text-md w-10 h-10" />
            </IconButton>
          </NavLink>
        </ContentContainer>

        <div className="flex flex-row items-center gap-12 w-full">
          <div className="hidden lg:block">{navList}</div>
          <div className="flex flex-row items-center justify-end gap-4 ml-auto mx-2">
            {isAuthenticated ? (
              <ContentContainer className="flex flex-row items-center gap-2 bg-kiiraBg3 px-3 py-1 rounded-lg">
                <Link to={ROUTES.INBOX}>
                  <IconButton variant="text" size="lg" className="bg-kiiraBg2 shadow-none">
                    <Message className="text-md w-5 h-5" />
                  </IconButton>
                </Link>

                <Menu>
                  <MenuHandler>
                    <ContentContainer
                      row
                      cursor="pointer"
                      className="items-center gap-1 hover:opacity-80">
                      <ContentContainer className="relative">
                        <Avatar
                          src={user?.photo || IMAGES.dummyProfilePhoto}
                          alt={user?.last_name}
                          variant="circular"
                          size="md"
                          className="rounded-full bg-kiiraText/50"
                        />
                        <i
                          className="fa fa-angle-down text-[0.55rem] absolute bottom-0 right-1 p-1.5 bg-kiiraBlue w-2 h-2 flex items-center justify-center rounded-full"
                          aria-hidden="true"></i>
                      </ContentContainer>
                      <AppTypography
                        variant="small"
                        className="text-kiiraText text-xs font-medium tracking-tight hidden sm:flex">
                        {user?.first_name}
                      </AppTypography>
                    </ContentContainer>
                  </MenuHandler>
                  <MenuList>
                    <MenuListItem
                      className="bg-transparent flex items-center gap-1 flex-nowrap"
                      onClick={() => navigate(ROUTES.PROFILE)}>
                      <ListItemPrefix className="mr-2">
                        <Avatar
                          src={IMAGES.dummyProfilePhoto || IMAGES.dummyProfilePhoto}
                          alt={user?.lastName}
                          variant="circular"
                          size="sm"
                          className="rounded-full bg-kiiraText/50"
                        />
                      </ListItemPrefix>

                      <AppTypography variant="lead" className="text-kiiraText text-sm font-medium">
                        Account
                      </AppTypography>
                    </MenuListItem>
                    <hr className="my-2 border-blue-gray-50" />
                    <MenuItem
                      className="flex items-center gap-1 flex-nowrap"
                      onClick={() => {
                        logout();
                        navigate(ROUTES.LOGIN);
                      }}>
                      <ListItemPrefix className="mr-2 ">
                        <IMAGES.LogoutIcon />
                      </ListItemPrefix>
                      <AppTypography variant="small" className="text-red-600 font-semibold">
                        Log Out
                      </AppTypography>
                    </MenuItem>
                  </MenuList>
                </Menu>

                <IconButton
                  variant="text"
                  className="ml-auto bg-kiiraBg2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                  onClick={() => setOpenNav(!openNav)}>
                  {openNav ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      stroke="#6F7888"
                      strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <Hamburger />
                  )}
                </IconButton>
              </ContentContainer>
            ) : (
              <Link to={ROUTES.LOGIN}>
                <AppButton
                  variant="text"
                  className="text-kiiraText bg-kiiraBg3 capitalize font-medium">
                  Log in
                </AppButton>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto my-4">{navList}</div>
      </Collapse>
    </Navbar>
  );
}
