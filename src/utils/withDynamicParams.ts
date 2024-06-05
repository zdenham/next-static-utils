import { FALLBACK_STRING } from './constants';

const cannotDeduceErr =
  'Cannot deduce path, please provide a path to withDynamicParams';

const patternToMatch = /app\/(.*?)\.(tsx|js|jsx)/;

export const withDynamicParams = (
  staticParamsFunc?: ParamsFunc,
  path: string = getPathFromErrorStack()
): ParamsFunc => {
  const fallbackParams = getFallbackParamsFromPath(path);
  return async () => {
    const staticParamsArr = staticParamsFunc ? await staticParamsFunc() : [];
    return [...staticParamsArr, fallbackParams];
  };
};

export const parsePagePath = (pagePath: string): string => {
  const match = pagePath.match(patternToMatch);
  if (!match || !match[0]) {
    throw new Error(cannotDeduceErr);
  }

  return match[0].replace('app', '');
};

const getPathFromFileName = (): string => {
  const fileName = __filename;
  if (!fileName) {
    throw new Error(cannotDeduceErr);
  }

  return parsePagePath(fileName);
};

const getPathFromErrorStack = (): string => {
  const stack = new Error().stack;
  if (!stack) {
    throw new Error(cannotDeduceErr);
  }

  const stackLines = stack.split('\n');
  for (let stackLine of stackLines) {
    if (patternToMatch.test(stackLine)) {
      return parsePagePath(stackLine);
    }
  }

  throw new Error(cannotDeduceErr);
};

export const getFallbackParamsFromPath = (
  path: string
): Record<string, typeof FALLBACK_STRING> => {
  const pathParts = path.split('/');

  const params = pathParts
    .map((part) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return part.replace('[', '').replace(']', '');
      }

      return '';
    })
    .filter((part) => !!part);

  return params.reduce((acc, param) => {
    acc[param] = FALLBACK_STRING;
    return acc;
  }, {} as Record<string, typeof FALLBACK_STRING>);
};

type ParamsFunc = () => Promise<Record<string, string>[]>;
