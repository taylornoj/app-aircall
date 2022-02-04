import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import NavTabs from "./components/NavTabs";
import Activity from "./pages/Activity";
import Archive from "./pages/Archive";
import ActivityDetail from "./pages/ActivityDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <NavTabs />
          <div className="container-view">
            <Routes>
              <Route path="/" exact>
                <Route to="/activity" />
              </Route>
              <Route path="/activity" element={<Activity />} exact>
              </Route>
              <Route path="/activity-detail/:activityId" element={<ActivityDetail />} exact>
              </Route>
              <Route path="/archive" element={<Archive />} exact>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
