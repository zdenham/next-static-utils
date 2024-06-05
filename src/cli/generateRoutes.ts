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
    routes,
  };

  fs.writeFileSync('./serve.json', JSON.stringify(serveJson, null, 2));
};
