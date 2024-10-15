import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AccountSetting from './pages/account-setting/AccountSetting';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import OralCheck from './pages/oral-check/OralCheck';
import ReportList from './pages/report-list/ReportList';
import Report from './pages/report/Report';
import SignUp from './pages/signup/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/home" element={<Home />} />

        <Route path="/account-setting" element={<AccountSetting />} />
        <Route path="/oral-check" element={<OralCheck />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report-list" element={<ReportList />} />
      </Routes>
    </Router>
  );
}

export default App;
