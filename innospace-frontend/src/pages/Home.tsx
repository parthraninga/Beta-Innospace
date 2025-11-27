import HeroSection from '../components/sections/HeroSection';
import ShowcaseCarousel from '../components/sections/ShowcaseCarousel';
import BookingSteps from '../components/sections/BookingSteps';
import RecentProjects from '../components/sections/RecentProjects';
import PopularDesigns from '../components/sections/PopularDesigns';
import WhyUs from '../components/sections/WhyUs';
import Reviews from '../components/sections/Reviews';
import Suppliers from '../components/sections/Suppliers';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ShowcaseCarousel />
      <BookingSteps />
      <RecentProjects />
      <PopularDesigns />
      <WhyUs />
      <Reviews />
      <Suppliers />
    </div>
  );
};

export default Home;