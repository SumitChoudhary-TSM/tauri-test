import { Route, Routes } from 'react-router-dom';
import Error404 from '@/components/404/404';
import { routes, RouteType } from '@/routes/data';
import { RootState } from '@/redux/store';
import ProtectedRoute from './protected';
import { useSelector } from 'react-redux';

export default function Router() {
  const { isUserLoggedIn, user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Routes>
        {routes.map((route: RouteType) => {
          let elementToRender;

          if ('isProtected' in route) {
            if (route.isProtected) {
              elementToRender = (
                <ProtectedRoute element={route} loggedIn={isUserLoggedIn} userRole={user?.role} to="/">
                  {route.element}
                </ProtectedRoute>
              );
            } else {
              elementToRender = (
                <ProtectedRoute loggedIn={!isUserLoggedIn} to="/dashboard">
                  {route.element}
                </ProtectedRoute>
              );
            }
          } else {
            elementToRender = route.element;
          }

          return <Route key={route.path} path={route.path} element={elementToRender} />;
        })}

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}
