import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import JobDetail from "./pages/JobDetail";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/ContactUs";
import Committees from "./pages/Investors/Committees";
import Financials from "./pages/Investors/Financials";
import Policies from "./pages/Investors/Policies";
import Accreditation from "./pages/AboutUs/Accreditation";
import LeadershipTeam from "./pages/AboutUs/LeadershipTeam";
import BoardOfInvestors from "./pages/AboutUs/BoardOfInvestors";
import CompanyProfile from "./pages/AboutUs/CompanyProfile";
import AdministrativeServices from "./pages/WorkSpace/AdministrativeServices";
import HospitalityServices from "./pages/WorkSpace/HospitalityServices";
import TraditionalService from "./pages/WorkSpace/TraditionalService";
import BuildingMaintenance from "./pages/WorkSpace/BuildingMaintenance";
import HRCompliance from "./pages/Workforce/HRCompliance";
import RecruitmentService from "./pages/Workforce/RecruitmentService";
import ContractStaffing from "./pages/Workforce/ContractStaffing";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Careers from "./pages/Careers";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="routes-container" className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/workforce/contract-staffing"
            element={<ContractStaffing />}
          />
          <Route
            path="/workforce/recruitment-service"
            element={<RecruitmentService />}
          />
          <Route path="/workforce/hr-compliance" element={<HRCompliance />} />

          <Route
            path="/workspace/building-maintenance"
            element={<BuildingMaintenance />}
          />
          <Route
            path="/workspace/traditional-service"
            element={<TraditionalService />}
          />
          <Route
            path="/workspace/hospitality-services"
            element={<HospitalityServices />}
          />
          <Route
            path="/workspace/administrative-services"
            element={<AdministrativeServices />}
          />

          <Route
            path="/about-us/company-profile"
            element={<CompanyProfile />}
          />
          <Route
            path="/about-us/board-of-investors"
            element={<BoardOfInvestors />}
          />
          <Route
            path="/about-us/leadership-team"
            element={<LeadershipTeam />}
          />
          <Route path="/about-us/accreditation" element={<Accreditation />} />

          <Route path="/investors/policies" element={<Policies />} />
          <Route path="/investors/financials" element={<Financials />} />
          <Route path="/investors/committees" element={<Committees />} />

          <Route path="/careers" element={<Careers />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
