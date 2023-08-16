import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { MainOutletLayout } from 'src/layouts';
import { ROUTES } from './Paths';
import {
  RequestAcuityMigration,
  BookAppointment,
  ChangePassword,
  ChooseAppointment,
  CodeVerification,
  ConfirmBooking,
  Doctors,
  ForgotPassword,
  History,
  Home,
  Inbox,
  Login,
  MigrateAcuityUser,
  Profile,
  RescheduleAppointment,
  ResetPassword,
  ReviewAppointment,
  Signup,
  SignupSubscription,
  Subscription,
  ViewBooking
} from 'src/pages';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { AuthProvider } from 'src/contexts/AuthProvider';
import { PageNotFound } from 'src/components';

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGINUP} element={<Signup />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.REQUEST_ACUITY_MIGRATION} element={<RequestAcuityMigration />} />
          <Route path={ROUTES.MIGRATE_ACUITY_ACCOUNT} element={<MigrateAcuityUser />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTES.VERIFY_ACCOUNT} element={<CodeVerification />} />

          {/* Authenticated Routes */}
          <Route element={<ProtectedRoute />}>
            <Route exact index path={ROUTES.INDEX} element={<Home />} />
            <Route path={ROUTES.SIGINUP_SUBSCRIPTION} element={<SignupSubscription />} />
            <Route path={ROUTES.SUBSCRIPTION} element={<Subscription />} />
            <Route path={ROUTES.INBOX} element={<Inbox />} />
            <Route path={ROUTES.DOCTORS} element={<Doctors />} />
            <Route element={<MainOutletLayout />}>
              <Route path={ROUTES.CONFIRM_BOOKING} element={<ConfirmBooking />} />
              <Route index path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
            </Route>

            <Route element={<MainOutletLayout />}>
              <Route index path={ROUTES.BOOK_APPOINTMENT} element={<BookAppointment />} />
              <Route path={`${ROUTES.CHOOSE_APPOINTMENT}/:id`} element={<ChooseAppointment />} />
              <Route path={ROUTES.REVIEW_APPOINTMENT} element={<ReviewAppointment />} />
            </Route>
            <Route element={<MainOutletLayout />}>
              <Route index path={ROUTES.HISTORY} element={<History />} />
              <Route exact path={`${ROUTES.VIEW_BOOKING}/:id`} element={<ViewBooking />} />
              <Route
                path={`${ROUTES.HISTORY}/:id${ROUTES.RESCHEDULE_APPOINTMENT}`}
                element={<RescheduleAppointment />}
              />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
