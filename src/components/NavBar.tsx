import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CheckActiveIcon from '../../public/assets/icons/check-square-active-icon.svg';
import CheckIcon from '../../public/assets/icons/check-square-icon.svg';
import HomeActiveIcon from '../../public/assets/icons/home-active-icon.svg';
import HomeIcon from '../../public/assets/icons/home-icon.svg';
import ReportActiveIcon from '../../public/assets/icons/report-active-icon.svg';
import ReportIcon from '../../public/assets/icons/report-icon.svg';
import UserActiveIcon from '../../public/assets/icons/user-active-icon.svg';
import UserIcon from '../../public/assets/icons/user-icon.svg';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavBarContainer>
      <NavItem
        onClick={() => handleNavigation('/home')}
        $isActive={location.pathname === '/home'}
      >
        <NavIcon
          src={location.pathname === '/home' ? HomeActiveIcon : HomeIcon}
          alt="홈 아이콘"
        />
        홈
      </NavItem>
      <NavItem
        onClick={() => handleNavigation('/oral-check')}
        $isActive={location.pathname === '/oral-check'}
      >
        <NavIcon
          src={
            location.pathname === '/oral-check' ? CheckActiveIcon : CheckIcon
          }
          alt="구강 체크 아이콘"
        />
        구강 체크
      </NavItem>
      <NavItem
        onClick={() => handleNavigation('/report-list')}
        $isActive={location.pathname === '/report-list'}
      >
        <NavIcon
          src={
            location.pathname === '/report-list' ? ReportActiveIcon : ReportIcon
          }
          alt="구강 리포트 아이콘"
        />
        구강 리포트
      </NavItem>
      <NavItem
        onClick={() => handleNavigation('/account-setting')}
        $isActive={location.pathname === '/account-setting'}
      >
        <NavIcon
          src={
            location.pathname === '/account-setting' ? UserActiveIcon : UserIcon
          }
          alt="계정 설정 아이콘"
        />
        계정 설정
      </NavItem>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 20px;
  border-top: solid #b3b3b3;
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryGreen : '#b3b3b3'};
  cursor: pointer;
`;

const NavIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 4px;
`;
