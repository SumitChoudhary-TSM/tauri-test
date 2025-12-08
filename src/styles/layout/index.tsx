import { TopNav } from '@/styles/navbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Sidebar from '../side-bar';
import { UserRoleOptions } from '@/constants/options';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar role={user.role ?? UserRoleOptions.MARKS_PRINT_ADMIN} />

      <div className="flex-1 flex flex-col">
        <TopNav role={user.role} />

        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
