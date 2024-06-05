export const extractParamsFromPath = (
  path: string,
  dynamicRoutes: string[]
) => {
  for (let format of dynamicRoutes) {
    // Convert the format to a regular expression
    let regexStr = format.replace(/\[([^\]]+)\]/g, '(?<$1>[^/]+)');
    let regex = new RegExp(`^${regexStr}$`);

    // Test if the path matches the format
    let match = path.match(regex);

    if (match) {
      // Extract the named groups as the parameters
      return match.groups;
    }
  }

  // Return null if no match is found
  return null;
};
