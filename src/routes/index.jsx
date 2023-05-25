import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ROUTES } from './Paths';
import { ProtectedRoute } from './ProtectedRoute';
import {
  BookAppointment,
  ChooseAppointment,
  CodeVerification,
  Doctors,
  ForgotPassword,
  History,
  Home,
  Inbox,
  Login,
  ResetPassword,
  ReviewAppointment,
  Signup,
  SignupSubscription,
  Subscription
} from 'src/pages';
import { AppointmentLayout } from 'src/layouts';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGINUP} element={<Signup />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTES.CODE_VERIFICATION} element={<CodeVerification />} />
        <Route path={ROUTES.SIGINUP_SUBSCRIPTION} element={<SignupSubscription />} />

        {/* Authenticated Routes */}
        <Route element={<ProtectedRoute />}>
          <Route index exact path={ROUTES.INDEX} element={<Home />} />
          <Route path={ROUTES.SUBSCRIPTION} element={<Subscription />} />
          <Route path={ROUTES.INBOX} element={<Inbox />} />
          <Route path={ROUTES.HISTORY} element={<History />} />
          <Route path={ROUTES.DOCTORS} element={<Doctors />} />
          <Route path={ROUTES.BOOK_APPOINTMENT} element={<AppointmentLayout />}>
            <Route index path={ROUTES.BOOK_APPOINTMENT} element={<BookAppointment />} />
            <Route path={`${ROUTES.CHOOSE_APPOINTMENT}/:id`} element={<ChooseAppointment />} />
            <Route path={ROUTES.REVIEW_APPOINTMENT} element={<ReviewAppointment />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
