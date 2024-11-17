import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Layout from './components/Layout';
import AccountSetting from './pages/account-setting/AccountSetting';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import OralCheck from './pages/oral-check/OralCheck';
import AdditionalCheck from './pages/oral-check/aditional-check/AditionalCheck';
import CameraCapture from './pages/oral-check/camera-capture/CameraCapture';
import PhotoPreview from './pages/oral-check/photo-preview/PhotoPreview';
import OralCheckPhoto from './pages/oral-check/photo/OralCheckPhoto';
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
            <Route path="/oral-check/photo" element={<OralCheckPhoto />} />
            <Route
              path="/oral-check/camera-capture"
              element={<CameraCapture />}
            />
            <Route
              path="/oral-check/photo-preview"
              element={<PhotoPreview />}
            />
            <Route
              path="/oral-check/aditional-check"
              element={<AdditionalCheck />}
            />

            <Route path="/report" element={<Report />} />
            <Route path="/report-list" element={<ReportList />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
