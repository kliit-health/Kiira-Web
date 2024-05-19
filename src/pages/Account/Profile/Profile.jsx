import { Breadcrumbs, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import {
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { ROUTES } from 'src/routes/Paths';
import { EditIcon } from 'src/components/shared/AppIcons/AppIcons';
import { useEditProfile, useProfile } from 'src/queries/queryHooks';
import { FileUpload } from 'src/components';
import { Toast } from 'src/utils';
import Auth from 'src/middleware/storage';

const Profile = () => {
  const navigate = useNavigate();
  const { data: data, isLoading, refetch } = useProfile();
  const profile = data?.data?.user;

  const { mutate, isLoading: editProfileLoading } = useEditProfile();

  const handleEditProfile = (data) => {
    const payload = {
      profile_pic_url: data
    };

    mutate(payload, {
      onSuccess: (response) => {
        import.meta.env.DEV &&
          console.log('\n 🚀 ~ file: Profile.jsx:32 ~ handleEditProfile ~ response:', response);
        Toast.fire({
          icon: 'success',
          title: `${response?.data?.message}\nProfile updated successfully`
        });
        refetch();
        Auth.fetchUser();
      },
      onError: (error) => {
        import.meta.env.DEV &&
          console.log('\n 🚀 ~ file: Profile.jsx:41 ~ handleEditProfile ~ error:', error);
        Toast.fire({
          icon: 'error',
          title: !isEmpty(error.response?.data?.message)
            ? error.response?.data?.message
            : error?.message
        });
        setIsUploaded(false);
        Mixpanel.track('Error: Profile.jsx:41 ~ handleEditProfile ~ error: ->', {
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error.response?.data?.message
              : error?.message,
            url: error?.response?.config?.url
          }
        });
      }
    });
  };

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
          <ContentContainer col className="items-center gap-2 mt-4">
            <FileUpload
              loading={editProfileLoading}
              defaultUrl={profile?.profile_pic_url}
              canUpload={true}
              usePhotoPicker={true}
              label="Select file"
              setFileUrl={() => {}}
              onUploadSuccess={(data) => handleEditProfile(data)}
            />

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
