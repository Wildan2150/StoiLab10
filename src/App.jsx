import { CourseProgressProvider } from './context/CourseProgressContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './features/home/HomePage';

function App() {
  const handleSelectChapter = (_chapterId) => {
    // When chapters are opened, scroll or provide friendly feedback
    const roadmapEl = document.getElementById('roadmap-section');
    if (roadmapEl) {
      roadmapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CourseProgressProvider>
      <div className="app-layout">
        <Header />
        <main className="app-main-content">
          <HomePage onSelectChapter={handleSelectChapter} />
        </main>
        <Footer />
      </div>
    </CourseProgressProvider>
  );
}

export default App;
