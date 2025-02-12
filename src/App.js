import React, { lazy, Suspense } from 'react';
import LayoutWrapper from './common-components/LayoutWrapper/LayoutWrapper';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./views/home-page-component/HomePage'));
const LoginPage = lazy(() => import('./views/login-page-component/LoginPage'));

export default function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Suspense>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/app' element={<HomePage />} />
          </Routes>
        </Suspense>
      </LayoutWrapper>
    </BrowserRouter>
  )
}
