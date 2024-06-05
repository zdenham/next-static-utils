import { getDynamicRoutes } from '../utils/getDynamicRoutes';
import fs from 'fs';

export const generateRoutes = () => {
  const routes = getDynamicRoutes();
  console.log(routes.length, 'dynamic routes detected:');
  for (let route of routes) {
    console.log(route);
  }

  const routesFile = `"use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.dynamicRoutes = void 0;
  exports.dynamicRoutes = ${JSON.stringify(routes, null, 2)};`;

  console.log('CURRENT PATH: ', process.cwd());

  const pathToUpdate = `${process.cwd()}/node_modules/next-static-utils/utils/dynamicRoutes.js`;

  fs.writeFileSync(pathToUpdate, routesFile);
};
