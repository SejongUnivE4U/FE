import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  const location = useLocation();

  const NavBarPaths = [
    '/home',
    '/account-setting',
    '/oral-check',
    '/report-list',
  ];

  return (
    <>
      <main>
        <Outlet />
      </main>
      {NavBarPaths.includes(location.pathname) && <NavBar />}
    </>
  );
}
