import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Layout from './components/Layout';
import AccountSetting from './pages/account-setting/AccountSetting';
import DetailOralCheck from './pages/detail-oral-check/DetailOralCheck';
import FrontPhotoPreview from './pages/detail-oral-check/photo-preview/FrontPhotoPreview';
import LowerPhotoPreview from './pages/detail-oral-check/photo-preview/LowerPhotoPreview';
import UpperPhotoPreview from './pages/detail-oral-check/photo-preview/UpperPhotoPreview';
import FrontPhoto from './pages/detail-oral-check/photo/FrontPhoto';
import LowerPhoto from './pages/detail-oral-check/photo/LowerPhoto';
import UpperPhoto from './pages/detail-oral-check/photo/UpperPhoto';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import DentalMap from './pages/map/DentalMap';
import OralCheck from './pages/oral-check/OralCheck';
import AdditionalCheck from './pages/oral-check/aditional-check/AditionalCheck';
import CameraCapture from './pages/oral-check/camera-capture/CameraCapture';
import OralCheckGuide from './pages/oral-check/guide/OralCheckGuide';
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
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <ResetStyles />
        <GlobalStyle />
        <Helmet>
          <title>E4U</title>
          <meta
            property="og:title"
            content="E4U: AI 기반 구강 건강 관리 도우미"
          />
          <meta
            property="og:description"
            content="E4U는 AI를 활용한 구강 상태 분석 및 관리를 제공하는 서비스입니다."
          />
          <meta
            property="og:image"
            content="https://e4u-dev.netlify.app/maskable-icon-512x512.png"
          />
          <meta property="og:url" content="https://e4u-dev.netlify.app" />
          <meta property="og:type" content="website" />
        </Helmet>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/home" element={<Home />} />
              <Route path="/map" element={<DentalMap />} />

              <Route path="/account-setting" element={<AccountSetting />} />

              <Route path="/oral-check" element={<OralCheck />} />
              <Route path="/oral-check/guide" element={<OralCheckGuide />} />
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

              <Route path="/detail-oral-check" element={<DetailOralCheck />} />
              <Route
                path="/detail-oral-check/front-photo"
                element={<FrontPhoto />}
              />
              <Route
                path="/detail-oral-check/upper-photo"
                element={<UpperPhoto />}
              />
              <Route
                path="/detail-oral-check/lower-photo"
                element={<LowerPhoto />}
              />
              <Route
                path="/detail-oral-check/front-preview"
                element={<FrontPhotoPreview />}
              />
              <Route
                path="/detail-oral-check/upper-preview"
                element={<UpperPhotoPreview />}
              />
              <Route
                path="/detail-oral-check/lower-preview"
                element={<LowerPhotoPreview />}
              />

              <Route path="/report" element={<Report />} />
              <Route path="/report-list" element={<ReportList />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
