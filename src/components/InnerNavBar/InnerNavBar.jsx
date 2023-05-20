import { useState, useEffect } from 'react';
import {
  MobileNav,
  IconButton,
  List,
  Navbar,
  Badge,
  Avatar,
  Typography
} from '@material-tailwind/react';
import { ReactComponent as Hamburger } from 'src/assets/icons/hamburger.svg';
import { ReactComponent as KiiraLogoSvg } from 'src/assets/icons/kiiraBirdie.svg';
import { ReactComponent as Message } from 'src/assets/icons/Message.svg';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { AppButton, AppLink, ContentContainer, NavListItem } from '../shared/styledComponents';
import useAuth from 'src/hooks/useAuth';

export default function InnerNavBar() {
  const { user, isAuthenticated } = useAuth();
  console.log('🚀 ~ file: InnerNavBar.jsx:27 ~ InnerNavBar ~ user:', user);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <List className="flex flex-row flex-wrap gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center mx-4 p-0">
      <Link to="#">
        <NavListItem className="">Book an Appointment</NavListItem>
      </Link>
      <AppLink to="#">
        <NavListItem>Doctors</NavListItem>
      </AppLink>
      <AppLink to="#">
        <NavListItem>Subscription Plan</NavListItem>
      </AppLink>
      {isAuthenticated ? (
        <AppLink to="#">
          <NavListItem>History</NavListItem>
        </AppLink>
      ) : null}
    </List>
  );

  return (
    <Navbar className="block p-0 max-w-full mx-auto bg-white border-transparent rounded-2xl shadow-none h-max bg-opacity-100">
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
              <ContentContainer className="flex flex-row items-center gap-2 bg-kiiraCardBg2 px-3 py-1 rounded-lg">
                <IconButton variant="text" size="lg" className="bg-kiiraCardBg1 shadow-none">
                  <Message className="text-md w-5 h-5" />
                </IconButton>

                <ContentContainer
                  row
                  cursor="pointer"
                  className="items-center gap-1 hover:opacity-80">
                  <Badge overlap="circular" placement="bottom-end">
                    <Avatar
                      src={user?.photo}
                      alt="Profile"
                      variant="rounded-full"
                      size="md"
                      className="rounded-full"
                    />
                  </Badge>
                  <Typography
                    variant="sm"
                    className="text-kiiraText text-xs font-medium tracking-tight hidden sm:flex">
                    {user?.firstName}
                  </Typography>
                </ContentContainer>

                <IconButton
                  variant="text"
                  className="ml-auto bg-kiiraCardBg1 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
              <AppButton
                variant="text"
                className="text-kiiraText bg-kiiraCardBg2 capitalize font-medium">
                Log in
              </AppButton>
            )}
          </div>
        </div>
      </div>

      <MobileNav open={openNav}>
        <div className="container mx-auto my-4">{navList}</div>
      </MobileNav>
    </Navbar>
  );
}
