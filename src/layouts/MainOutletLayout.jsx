import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '.';

const MainOutletLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default MainOutletLayout;
