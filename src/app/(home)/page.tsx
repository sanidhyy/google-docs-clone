import { Navbar } from './navbar';
import { TemplateGallery } from './template-gallery';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 inset-x-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>

      <div className="mt-16">
        <TemplateGallery />
      </div>
    </div>
  );
};

export default HomePage;
