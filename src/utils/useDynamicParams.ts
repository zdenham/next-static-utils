import { usePathname } from 'next/navigation';

import { dynamicRoutes } from './dynamicRoutes';
import { extractParamsFromPath } from './extractParamsFromPath';

export const useDynamicParams = (): Record<string, string> => {
  const pathName = usePathname();

  if (!dynamicRoutes)
    throw new Error(
      'No dynamic routes found, you likely need to run next-static-utils generate'
    );

  const params = extractParamsFromPath(pathName, dynamicRoutes) || {};

  return params;
};
