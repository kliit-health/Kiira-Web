import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './Paths';
import { ProtectedRoute } from './ProtectedRoute';
import {
  BookAppointment,
  CodeVerification,
  ForgotPassword,
  Login,
  ResetPassword,
  Signup
} from 'src/pages';

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGINUP} element={<Signup />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.CODE_VERIFICATION} element={<CodeVerification />} />

      {/* Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route index exact path={ROUTES.INDEX} element={<BookAppointment />} />
      </Route>
    </Routes>
  );
};
