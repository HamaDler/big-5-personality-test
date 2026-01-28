import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TestProvider } from './context/TestContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <TestProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </TestProvider>
  );
}

export default App;
