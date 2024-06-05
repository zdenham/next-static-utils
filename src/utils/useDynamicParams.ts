import { usePathname } from 'next/navigation';

import { dynamicRoutes } from './dynamicRoutes';
import { extractParamsFromPath } from './extractParamsFromPath';

export const useDynamicParams = (): Record<string, string> => {
  const pathName = usePathname();

  const params = extractParamsFromPath(pathName, dynamicRoutes) || {};

  return params;
};
