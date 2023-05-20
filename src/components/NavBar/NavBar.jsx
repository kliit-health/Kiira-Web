import { useState, useEffect } from 'react';
import { Navbar, MobileNav, IconButton, List, ListItem } from '@material-tailwind/react';
import { ReactComponent as KiiraLogoSvg } from 'src/assets/images/KiiraLogo.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';
import { AppButton, AppLink, AppLinkExternal } from '../shared/styledComponents';
import { ReactComponent as GlobeIconSvg } from 'src/assets/images/globeIcon.svg';

export default function AppNavBar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <List className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <AppLinkExternal href="https://www.kiira.io/">
        <ListItem>Services</ListItem>
      </AppLinkExternal>
      <AppLink href="#">
        <ListItem>Pricing</ListItem>
      </AppLink>
      <AppLinkExternal as="a" href="https://www.kiira.io/locations">
        <ListItem>Location</ListItem>
      </AppLinkExternal>
      <AppLinkExternal as="a" href="https://www.kiira.io/about">
        <ListItem>About</ListItem>
      </AppLinkExternal>
      <AppLinkExternal href="https://www.kiira.io/blog">
        <ListItem className="hover:opacity-80">Kick it with Kiira</ListItem>
      </AppLinkExternal>
    </List>
  );

  return (
    <Navbar className="sticky inset-0 z-10 block max-w-full px-1 py-3 mx-auto bg-transparent border-transparent rounded-none shadow-none h-max backdrop-blur-2xl backdrop-saturate-200">
      <div className="container flex items-center justify-between mx-auto text-blue-gray-900">
        <Link to={ROUTES.INDEX}>
          <KiiraLogoSvg className="w-24 text-md" />
        </Link>

        <div className="flex flex-row items-center gap-12">
          <div className="hidden lg:block">{navList}</div>
          <div className="flex flex-row items-center gap-4">
            <AppLinkExternal
              href="www.kiira.io/about"
              className="hidden text-kiiraBlue lg:inline-block">
              Book an appointment
            </AppLinkExternal>
            <AppLinkExternal href="https://app.acuityscheduling.com/catalog.php?owner=20421830&category=Membership">
              <AppButton
                size="sm"
                className="px-4 py-2 text-white capitalize text-[10px] shadow-transparent">
                Join Kiira
              </AppButton>
            </AppLinkExternal>
            <IconButton
              variant="text"
              ripple={false}
              size="sm"
              className="hidden w-auto p-0 lg:inline-block">
              <GlobeIconSvg className="w-4 h-4" />
            </IconButton>
            {/* <IconButton
              variant="text"
              ripple={false}
              className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              onClick={() => setOpenNav(!openNav)}>
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton> */}
          </div>
        </div>
      </div>

      {/* <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <AppButton
            size="sm"
            fullWidth
            className="px-4 py-2 text-white capitalize text-[10px] mb-2 shadow-transparent">
            Join Kiira
          </AppButton>
        </div>
      </MobileNav> */}
    </Navbar>
  );
}
