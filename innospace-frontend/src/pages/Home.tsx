import HeroSection from '../components/sections/HeroSection';
import ShowcaseCarousel from '../components/sections/ShowcaseCarousel';
import BookingSteps from '../components/sections/BookingSteps';
import RecentProjects from '../components/sections/RecentProjects';
import PopularDesigns from '../components/sections/PopularDesigns';
import WhyUs from '../components/sections/WhyUs';
import Reviews from '../components/sections/Reviews';
import Suppliers from '../components/sections/Suppliers';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`overflow-x-hidden min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-green-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <HeroSection />
      <ShowcaseCarousel />
      <BookingSteps />
      
      {/* Sections with visible borders */}
      <div className={`border-t-4 ${theme === 'dark' ? 'border-amber-500/30' : 'border-orange-500/30'}`}>
        <RecentProjects />
      </div>
      
      <div className={`border-t-4 ${theme === 'dark' ? 'border-green-500/30' : 'border-green-600/30'}`}>
        <PopularDesigns />
      </div>
      
      <div className={`border-t-4 ${theme === 'dark' ? 'border-amber-500/30' : 'border-orange-500/30'}`}>
        <WhyUs />
      </div>
      
      <div className={`border-t-4 ${theme === 'dark' ? 'border-green-500/30' : 'border-green-600/30'}`}>
        <Reviews />
      </div>
      
      <div className={`border-t-4 ${theme === 'dark' ? 'border-amber-500/30' : 'border-orange-500/30'}`}>
        <Suppliers />
      </div>
    </div>
  );
};

export default Home;