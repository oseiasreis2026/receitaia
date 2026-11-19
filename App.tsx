
import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import AnalysisPage from './pages/AnalysisPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';
import Layout from './components/Layout';

const App: React.FC = () => {
  const { activePage } = useContext(AppContext);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'recipes':
        return <RecipesPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Layout>
        <main className="pb-20">
          {renderPage()}
        </main>
        <BottomNav />
      </Layout>
    </div>
  );
};

export default App;
