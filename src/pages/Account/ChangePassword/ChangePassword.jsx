import { Avatar, Breadcrumbs, Button, IconButton } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPasswordInput, BookingCalendar, DoctorsCard } from 'src/components';
import {
  AppButton,
  AppLink,
  AppLinkExternal,
  AppNavLink,
  AppTypography,
  CalendarWrapper,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES, kiiraDoctors, kiiraServices } from 'src/data';
import { MainLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import useAuth from 'src/hooks/useAuth';
import { EditIcon, PenIcon } from 'src/components/shared/AppIcons/AppIcons';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState(null);

  const [serviceSelected, setServiceSelected] = useState({});

  useEffect(() => {
    if (isEmpty(id)) return;

    let filteredService = {};

    kiiraServices.filter((service) => {
      if (service._id === id) {
        filteredService = service;
        return true;
      }
      setServiceSelected(filteredService);
      return false;
    });
  }, [id]);

  return (
    <ContentContainer
      width="100%"
      height="100%"
      className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto">
      <ContentContainer
        className="w-full -mt-4 bg-kiiraBg2 border border-[#E4E7F3] rounded-lg overflow-hidden overflow-x-auto"
        hideScroll={true}>
        <Breadcrumbs
          separator={<i className="fa fa-angle-right text-kiiraText " aria-hidden="true"></i>}
          fullWidth
          className="w-auto bg-transparent">
          <AppNavLink
            to={ROUTES.INDEX}
            className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
            Home
          </AppNavLink>
          <AppNavLink
            to="#"
            onClick={() => navigate(-1)}
            className="opacity-75 text-xs font-semibold text-kiiraBlue hover:text-kiiraBlue">
            Profile
          </AppNavLink>
          <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
            Change Password
          </AppNavLink>
        </Breadcrumbs>
      </ContentContainer>

      <ContentContainer className="w-full h-full flex flex-col gap-4 mt-6">
        <AppTypography
          variant="h6"
          color="blue"
          className="capitalise text-kiiraDark text-lg md:text-xl font-normal font-poppins ">
          Change Password
        </AppTypography>
        <ContentContainer className="w-full md:w-3/4 xl:w-1/2 gap-5 bg-kiiraBg2 p-4 justify-center rounded-2xl h-full min-h-[25vh]">
          <ContentContainer className="flex-wrap items-center justify-between gap-5 p-1 xs:p-3 md:p-8">
            <AppPasswordInput label="Old Pasword" size="lg" className="" defaultValue="AYTDBJ212" />
            <AppPasswordInput
              label="New Password"
              size="lg"
              className=""
              defaultValue="AYTDBJ212"
            />
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

export default ChangePassword;
