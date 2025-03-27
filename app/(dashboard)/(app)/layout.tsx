import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardActions from '@/components/dashboard/DashboardActions';
import TabNavigation from '@/components/dashboard/TabNavigation';
import SettingsWrapper from '@/components/dashboard/SettingsWrapper';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='px-6 py-4 w-full max-w-7xl mx-auto flex flex-col main-h-svh '>
      <div className='space-y-8 w-full h-full'>
        {/* Header/Navbar */}
        <DashboardHeader />

        <SettingsWrapper />

        {/* Main Section */}
        <div className='space-y-0 w-full '>
          <div className='w-full flex justify-between max-[800px]:flex-col-reverse'>
            {/* Tabs List/Component (Stock, Sales, Report) */}
            <TabNavigation />

            {/* Add New Stock button and Search Component */}
            <DashboardActions />
          </div>
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className='flex flex-col gap-2 mt-4'>
        <p className='text-center mt-4'>
          &copy; {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
    </main>
  );
};

export default Layout;
