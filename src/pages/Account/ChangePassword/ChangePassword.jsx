import { Breadcrumbs } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { AppPasswordInput, Loader } from 'src/components';
import {
  AppButton,
  AppNavLink,
  AppTypography,
  ContentContainer
} from 'src/components/shared/styledComponents';
import { ROUTES } from 'src/routes/Paths';
import isEmpty from 'src/utils/isEmpty';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/utils';
import { useChangePassword, useProfile } from 'src/queries/queryHooks';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useProfile();
  const profile = userProfile?.data?.user;

  const appPasswordRef = useRef(null);
  const appPasswordRef2 = useRef(null);
  const appPasswordRef3 = useRef(null);

  const { mutate, isLoading } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    if (data?.new_password !== data?.confirm_new_password) {
      Toast.fire({
        icon: 'warning',
        title: `Passwords do not match`
      });
      return;
    }

    const payload = {
      email: profile?.email,
      ...data
    };

    mutate(payload, {
      onSuccess: (response) => {
        reset();
        Toast.fire({
          icon: 'success',
          title: response?.data?.message
        });
        navigate(ROUTES.LOGIN);
      },
      onError: (error) => {
        // console.log(' \n 🚀 ~ file: ResetPassword.jsx:53 ~ onSubmit ~ error:', error);

        Toast.fire({
          icon: 'error',
          title: error.response?.data?.message
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

      <ContentContainer className="w-full h-full flex flex-col gap-4">
        <ContentContainer className="w-full gap-5 bg-kiiraBg2 p-4 justify-center rounded-2xl h-full min-h-[25vh]">
          <ContentContainer className="flex-wrap items-center justify-between gap-5 p-1 xs:p-3 md:p-8">
            <AppTypography
              variant="h4"
              color="blue"
              className="uppercase text-kiiraDark text-lg md:text-xl font-semibold font-poppins">
              Change Password
            </AppTypography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full md:w-8/12">
              <ContentContainer className="gap-1 w-full">
                <AppPasswordInput
                  ref={appPasswordRef}
                  autoComplete="off"
                  label="Old Password"
                  size="lg"
                  name="old_password"
                  {...register('old_password', {
                    required: 'Password is required.',
                    validate: {
                      checkLength: (value) => value.length >= 6
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                    }
                  })}
                  error={!isEmpty(errors.old_password)}
                />
                {errors.old_password && errors.old_password.type === 'required' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    {errors.old_password.message}
                  </ContentContainer>
                )}
                {errors?.old_password?.type === 'checkLength' && (
                  <ContentContainer className="text-kiiraBlue font-medium text-xs">
                    Password should be at least 6 characters.
                  </ContentContainer>
                )}
                {errors?.old_password?.type === 'matchPattern' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    Password should contain at least one uppercase letter, lowercase letter, digit,
                    and special symbol.
                  </ContentContainer>
                )}
              </ContentContainer>
              <ContentContainer className="gap-1 w-full">
                <AppPasswordInput
                  ref={appPasswordRef2}
                  autoComplete="off"
                  label="New Password"
                  size="lg"
                  name="new_password"
                  {...register('new_password', {
                    required: 'Password is required.',
                    validate: {
                      checkLength: (value) => value.length >= 6
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                    }
                  })}
                  error={!isEmpty(errors.new_password)}
                />
                {errors.new_password && errors.new_password.type === 'required' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    {errors.new_password.message}
                  </ContentContainer>
                )}
                {errors?.new_password?.type === 'checkLength' && (
                  <ContentContainer className="text-kiiraBlue font-medium text-xs">
                    Password should be at least 6 characters.
                  </ContentContainer>
                )}
                {errors?.new_password?.type === 'matchPattern' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    Password should contain at least one uppercase letter, lowercase letter, digit,
                    and special symbol.
                  </ContentContainer>
                )}
              </ContentContainer>
              <ContentContainer className="gap-1 w-full">
                <AppPasswordInput
                  ref={appPasswordRef3}
                  autoComplete="off"
                  label="Re-enter new Password"
                  size="lg"
                  name="confirm_new_password"
                  {...register('confirm_new_password', {
                    required: 'Confirm Password is required.',
                    validate: {
                      checkLength: (value) => value.length >= 6
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                    }
                  })}
                  error={!isEmpty(errors.confirm_new_password)}
                />
                {errors.confirm_new_password && errors.confirm_new_password.type === 'required' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    {errors.confirm_new_password.message}
                  </ContentContainer>
                )}
                {errors?.confirm_new_password?.type === 'checkLength' && (
                  <ContentContainer className="text-kiiraBlue font-medium text-xs">
                    Password should be at least 6 characters.
                  </ContentContainer>
                )}
                {errors?.confirm_new_password?.type === 'matchPattern' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    Password should contain at least one uppercase letter, lowercase letter, digit,
                    and special symbol.
                  </ContentContainer>
                )}
              </ContentContainer>

              {isLoading ? (
                <Loader />
              ) : (
                <AppButton
                  size="md"
                  background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
                  className="text-sm font-medium text-white capitalize shadow-transparent mt-4"
                  fullWidth
                  type="submit">
                  Change password
                </AppButton>
              )}
            </form>
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};

export default ChangePassword;
