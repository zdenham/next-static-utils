import { generateRoutes } from './generateRoutes';

const command = process.argv[2];

switch (command) {
  case 'help':
    console.log(
      'Run next-server-utils generate to generate dynamic fallback routes.\n\nYou can optionally append a config type to output (cloudfront|serve) currently supported.'
    );
    break;
  case 'generate':
    console.log('Generating Dynamic Fallback Routes...');
    generateRoutes();
    break;
  default:
    console.log(
      'Unknown command, use "help" for a list of available commands.'
    );
    break;
}
