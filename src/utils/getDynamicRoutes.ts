import { findFolderPath, findAllFilesInFolder } from './fsUtils';

const isDynamicPage = (file: string) => {
  return (
    file.includes('[') &&
    (file.endsWith('page.tsx') ||
      file.endsWith('page.js') ||
      file.endsWith('page.jsx'))
  );
};

const stripRoute = (route: string) => {
  const withoutPage = route.replace(/\/page\.(js|jsx|tsx)$/, '');
  const withoutGrouping = withoutPage.replace(/\/\([^)]*\)/g, '');
  return withoutGrouping;
};

export const getDynamicRoutes = () => {
  const appPath = findFolderPath(process.cwd(), 'app');
  if (!appPath) throw new Error('No /app directory found');

  const allFiles = findAllFilesInFolder(appPath);
  const relativePaths = allFiles.map((file) => file.replace(appPath, ''));
  const dynamicPaths = relativePaths.filter(isDynamicPage);
  const dynamicRoutes = dynamicPaths.map(stripRoute);

  return dynamicRoutes;
};
