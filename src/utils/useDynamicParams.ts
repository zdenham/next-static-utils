import { usePathname } from 'next/navigation';

import { dynamicRoutes } from './dynamicRoutes';
import { extractParamsFromPath } from './extractParamsFromPath';
import { useEffect, useState } from 'react';

export const useDynamicParams = (): Record<string, string> => {
  const [params, setParams] = useState<Record<string, string>>({});
  const pathName = usePathname();

  useEffect(() => {
    if (!dynamicRoutes)
      throw new Error(
        'No dynamic routes found, you likely need to run next-static-utils generate'
      );

    const nextParams = extractParamsFromPath(pathName, dynamicRoutes) || {};
    setParams(nextParams);
  }, [pathName]);

  return params;
};
