import './App.css';
import { Routes, Route } from 'react-router';
import SignUp from './sign-up/SignUp.tsx';
import SignIn from './sign-in/SignIn.tsx';
import Footer from './components/Footer'
// import Navbar from './components/layout/Navbar.tsx';
import OnlyPrivate from './components/OnlyPrivate.tsx';
import TimelinesPage from './pages/TimelinesPage.tsx';
import TimelineItemsPage from './pages/TimelineItemsPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import LifeTimeline from './pages/LifeTimeline.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import UserProfilePage from './pages/UserProfilePage.tsx';
import PageContainer from './components/layout/PageContainer.tsx';
import Navbar from './components/layout/NavbarNew.tsx';

function App() {
  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen">
        <Navbar />
        <main className="max-w-full flex-1">
          <Routes>
            {/* Full-bleed pages — no wrapper */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            
            {/* Contained pages — wrapper with padding*/}
            <Route element={<PageContainer />}>
              <Route path="/timelines" element={<OnlyPrivate><TimelinesPage/></OnlyPrivate>} />
              <Route path="/timeline/:timelineId" element={<OnlyPrivate>{' '}<TimelineItemsPage />{' '} </OnlyPrivate>} />
              <Route path="/lifetimeline" element={<OnlyPrivate> <LifeTimeline /> </OnlyPrivate>} />
              <Route path="/user-profile" element={<OnlyPrivate> <UserProfilePage /> </OnlyPrivate>} />

              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
