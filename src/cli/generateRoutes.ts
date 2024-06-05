import { getDynamicRoutes } from '../utils/getDynamicRoutes';
import fs from 'fs';

export const generateRoutes = () => {
  const routes = getDynamicRoutes();
  console.log(routes.length, 'dynamic routes detected:');
  for (let route of routes) {
    console.log(route);
  }

  const routesFile = `export const dynamicRoutes = ${JSON.stringify(
    routes,
    null,
    2
  )};`;

  fs.writeFileSync('src/utils/dynamicRoutes.js', routesFile);
};
