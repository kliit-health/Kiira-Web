import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ROUTES } from './Paths';
import { ProtectedRoute } from './ProtectedRoute';
import {
  BookAppointment,
  CodeVerification,
  Doctors,
  ForgotPassword,
  History,
  Home,
  Inbox,
  Login,
  ResetPassword,
  Signup,
  SignupSubscription,
  Subscription
} from 'src/pages';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGINUP} element={<Signup />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTES.CODE_VERIFICATION} element={<CodeVerification />} />
        <Route path={ROUTES.SIGINUP_SUBSCRIPTION} element={<SignupSubscription />} />

        {/* Authenticated Routes */}
        <Route element={<ProtectedRoute />}>
          <Route index exact path={ROUTES.INDEX} element={<Home />} />
          <Route exact path={ROUTES.SUBSCRIPTION} element={<Subscription />} />
          <Route exact path={ROUTES.INBOX} element={<Inbox />} />
          <Route exact path={ROUTES.HISTORY} element={<History />} />
          <Route exact path={ROUTES.BOOK_APPOINTMENT} element={<BookAppointment />} />
          <Route exact path={ROUTES.DOCTORS} element={<Doctors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
