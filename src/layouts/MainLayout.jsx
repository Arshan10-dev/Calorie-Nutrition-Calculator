// src/layouts/MainLayout.jsx
import Navbar from '../components/Navbar';
import { DesktopSidebar, MobileSidebar } from '../components/Sidebar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-body transition-colors duration-300">
      <Navbar />
      <MobileSidebar />

      <div className="flex pt-16 min-h-screen">
        <DesktopSidebar />

        {/* Main content area */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-8">
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
