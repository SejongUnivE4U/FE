import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  const location = useLocation();

  const isNavBarVisible = () => {
    const NavBarPaths = [
      '/home',
      '/account-setting',
      '/oral-check',
      '/report-list',
      '/groups',
    ];

    //  /group/{groupId}
    const dynamicGroupPath = /^\/group\/\d+$/;

    return (
      NavBarPaths.includes(location.pathname) ||
      dynamicGroupPath.test(location.pathname)
    );
  };

  return (
    <>
      <main>
        <Outlet />
      </main>
      {isNavBarVisible() && <NavBar />}
    </>
  );
}
