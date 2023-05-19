import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ROUTES } from './Paths';
import { ProtectedRoute } from './ProtectedRoute';
import {
  BookAppointment,
  CodeVerification,
  ForgotPassword,
  Login,
  ResetPassword,
  Signup,
  SignupSubscription
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
          <Route index exact path={ROUTES.INDEX} element={<BookAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
