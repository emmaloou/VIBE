import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Terms from './components/Terms';
import ProfilePage from './pages/ProfilePage';
import PostDetails from './pages/PostDetails';
import SearchPage from './pages/SearchPage';
import PublishPage from './pages/PublishPage';
import SettingsPage from './pages/SettingsPage';
import CategoriesPage from './pages/CategoriesPage'; 
import ModeratorDashboard from './pages/ModeratorDashboard';
import ModeratorPage from './pages/ModeratorPage';
import Demos from './pages/Demos';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/publish" element={<PublishPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/moderation" element={<ModeratorDashboard />} />
          <Route path="/demos" element={<Demos />} />
        </Routes>
      </Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/moderate-post" element={<ModeratorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
