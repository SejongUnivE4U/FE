import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Layout from './components/Layout';
import AccountSetting from './pages/account-setting/AccountSetting';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import OralCheck from './pages/oral-check/OralCheck';
import OralCheckType from './pages/oral-check/type/OralCheckType';
import ReportList from './pages/report-list/ReportList';
import Report from './pages/report/Report';
import SignUp from './pages/signup/SignUp';
import GlobalStyle from './styles/GlobalStyles';
import { ResetStyles } from './styles/ResetStyles';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResetStyles />
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/home" element={<Home />} />

            <Route path="/account-setting" element={<AccountSetting />} />

            <Route path="/oral-check" element={<OralCheck />} />
            <Route path="/oral-check/type" element={<OralCheckType />} />

            <Route path="/report" element={<Report />} />
            <Route path="/report-list" element={<ReportList />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
