import { Avatar, Breadcrumbs, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import {
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { IMAGES } from 'src/data';
import { ROUTES } from 'src/routes/Paths';
import { EditIcon, PenIcon } from 'src/components/shared/AppIcons/AppIcons';
import { useProfile } from 'src/queries/queryHooks';
import { FileUpload } from 'src/components';
import { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const { data: data, isLoading } = useProfile();
  const { fileData, setFileData } = useState({});
  import.meta.env.DEV &&
    console.log('\n 🚀 ~ file: Profile.jsx:19 ~ Profile ~ fileData:', fileData);
  const profile = data?.data?.user;

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
          <AppNavLink to="#" className="opacity-75 text-xs font-medium cursor-default">
            Profile
          </AppNavLink>
        </Breadcrumbs>
      </ContentContainer>

      <ContentContainer className="w-full h-full flex flex-col gap-4">
        <ContentContainer className="w-full gap-4">
          <ContentContainer col cursor="pointer" className="items-center gap-2 mt-4">
            <FileUpload
              setFileData={setFileData}
              canUpload={true}
              usePhotoPicker={true}
              label="Select file"
            />
            {/* <ContentContainer className="relative hover:opacity-80">
              <Avatar
                src={profile?.photo || IMAGES.dummyProfilePhoto}
                alt={profile?.last_name}
                variant="circular"
                size="xxl"
                className="rounded-full bg-kiiraText/50 border-2 md:border-4 border-kiiraBlue w-28 h-28 md:w-40 md:h-40"
              />
              <PenIcon className="z-10 absolute bottom-1.5 md:bottom-2 text-white right-1.5 md:right-4 p-1.5 bg-kiiraBlue w-7 h-7 flex items-center justify-center rounded-full" />
            </ContentContainer> */}
            {isLoading ? (
              <ContentContainer className="flex animate-pulse flex-col items-center h-full justify-center gap-1 w-48">
                <div className="w-3/4 bg-gray-300 h-3 rounded"></div>
                <div className="w-full bg-gray-300 h-3 rounded"></div>
              </ContentContainer>
            ) : (
              <>
                <AppTypography
                  variant="h6"
                  className="text-[#112211] font-semibold text-sm lg:text-base">
                  {profile?.first_name} {profile?.last_name}
                </AppTypography>
                <AppTypography
                  variant="small"
                  className="text-kiiraText text-xs font-medium tracking-tight -mt-1">
                  {profile?.email}
                </AppTypography>
              </>
            )}
          </ContentContainer>
        </ContentContainer>
        <AppTypography
          variant="h6"
          color="blue"
          className="capitalise text-kiiraDark text-lg md:text-xl font-normal font-poppins">
          Account
        </AppTypography>
        <ContentContainer className="w-full gap-5 bg-kiiraBg2 p-4 rounded-2xl h-full">
          <ContentContainer className="gap-1.5">
            <AppTypography
              variant="small"
              className="text-kiiraText text-[10px] md:text-sm xl:text-base font-normal tracking-tight -mt-1">
              Name
            </AppTypography>
            {isLoading ? (
              <ContentContainer className="flex animate-pulse flex-col items-center h-full justify-center gap-1 w-48">
                <div className="w-full bg-gray-300 h-3 rounded"></div>
              </ContentContainer>
            ) : (
              <AppTypography
                variant="h6"
                className="text-kiiraText font-poppins font-semibold text-sm md:text-sm xl:text-base">
                {profile?.first_name} {profile?.last_name}
              </AppTypography>
            )}
          </ContentContainer>
          <ContentContainer className="gap-1.5">
            <AppTypography
              variant="small"
              className="text-kiiraText text-[10px] md:text-sm xl:text-base font-normal tracking-tight -mt-1">
              Email
            </AppTypography>
            {isLoading ? (
              <ContentContainer className="flex animate-pulse flex-col items-center h-full justify-center gap-1 w-48">
                <div className="w-full bg-gray-300 h-3 rounded"></div>
              </ContentContainer>
            ) : (
              <AppTypography
                variant="lead"
                className="text-kiiraText font-poppins font-semibold text-sm md:text-sm xl:text-base">
                {profile?.email}
              </AppTypography>
            )}
          </ContentContainer>
          <ContentContainer row className="flex-wrap items-center justify-between">
            <ContentContainer className="gap-1.5">
              <AppTypography
                variant="small"
                className="text-kiiraText text-[10px] md:text-sm xl:text-base font-normal tracking-tight -mt-1">
                Password
              </AppTypography>
              {isLoading ? (
                <ContentContainer className="flex animate-pulse flex-col items-center h-full justify-center gap-1 w-48">
                  <div className="w-full bg-gray-300 h-3 rounded"></div>
                </ContentContainer>
              ) : (
                <AppTypography
                  variant="h6"
                  className="text-kiiraText font-poppins font-semibold text-sm md:text-sm xl:text-base">
                  ************
                </AppTypography>
              )}
            </ContentContainer>

            <Button
              className="flex flex-row flex-nowrap gap-1 text-kiiraText/70 items-center bg-transparent shadow-none border border-kiiraBlue capitalize font-semibold text-xs md:text-sm"
              onClick={() => navigate(ROUTES.CHANGE_PASSWORD)}>
              <EditIcon />
              Change Password
            </Button>
          </ContentContainer>

          <ContentContainer className="gap-1.5">
            <AppTypography
              variant="small"
              className="text-kiiraText text-[10px] md:text-sm xl:text-base font-normal tracking-tight -mt-1">
              Phone Number
            </AppTypography>
            {isLoading ? (
              <ContentContainer className="flex animate-pulse flex-col items-center h-full justify-center gap-1 w-48">
                <div className="w-full bg-gray-300 h-3 rounded"></div>
              </ContentContainer>
            ) : (
              <AppTypography
                variant="h6"
                className="text-kiiraText font-poppins font-semibold text-sm md:text-sm xl:text-base">
                {profile?.phone_number}
              </AppTypography>
            )}
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

export default Profile;
