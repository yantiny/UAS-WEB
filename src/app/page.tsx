import Navbar from './component/navbar';
import HeroSection from './component/heroSection';
import ProductSection from './component/ProductSection';
import Footer from './component/Footer';
import AboutSection from './component/AboutSection';

export default function Home() {
  return (
    <div className='mx-7'>
      <Navbar />
      <HeroSection />
      <ProductSection />
      <AboutSection />
      <Footer />
    </div>

  );
}
