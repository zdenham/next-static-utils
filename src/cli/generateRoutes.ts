import { FALLBACK_STRING } from '../utils/constants';
import { getDynamicRoutes } from '../utils/getDynamicRoutes';
import fs from 'fs';

export const generateRoutes = () => {
  const routes = getDynamicRoutes();
  printRoutes(routes);
  writeRoutes(routes);
  writeServeJson(routes);
};

const printRoutes = (routes: string[]) => {
  console.log(routes.length, 'dynamic routes detected:');
  for (let route of routes) {
    console.log(route);
  }
};

const writeRoutes = (routes: string[]) => {
  const routesFile = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicRoutes = void 0;
exports.dynamicRoutes = ${JSON.stringify(routes, null, 2)};`;

  console.log('CURRENT PATH: ', process.cwd());

  const pathToUpdate = `${process.cwd()}/node_modules/next-static-utils/dist/utils/dynamicRoutes.js`;

  fs.writeFileSync(pathToUpdate, routesFile);
};

const writeServeJson = (routes: string[]) => {
  const serveJson = {
    rewrites: routes.map(routeToRewrite),
  };

  const pathToUpdate = `${process.cwd()}/node_modules/next-static-utils/dist/utils/serve.json`;
  fs.writeFileSync(pathToUpdate, JSON.stringify(serveJson, null, 2));
};

const routeToRewrite = (route: string) => {
  return {
    source: route.replace(/\[([^\]]+)\]/g, ':$1'), // change to /user/:id format
    destination: route.replace(/\[([^\]]+)\]/g, FALLBACK_STRING), // change to /user/fallback format
  };
};
