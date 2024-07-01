import { Route, Routes } from 'react-router-dom';
import routerConfig from './routerConfig';
import { RouteConfig } from '../types';

const RouterMapping = () => {
  return (
    <Routes>
      {routerConfig.map(
        ({ path, component: PageComponent, id }: RouteConfig) => (
          <Route path={path} element={<PageComponent />} key={id} />
        )
      )}
    </Routes>
  );
};

export default RouterMapping;
