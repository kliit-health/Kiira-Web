import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { MainOutletLayout } from 'src/layouts';
import { ROUTES } from './Paths';
import {
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

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGINUP} element={<Signup />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTES.VERIFY_ACCOUNT} element={<CodeVerification />} />
        <Route path={ROUTES.SIGINUP_SUBSCRIPTION} element={<SignupSubscription />} />

        {/* Authenticated Routes */}
        <Route element={<ProtectedRoute />}>
          <Route exact index path={ROUTES.INDEX} element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
};
