import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import nextTranspileModules from 'next-transpile-modules';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withTM = nextTranspileModules([]);

export default withTM({
  webpack: (config) => {
    config.resolve.alias['@'] = resolve(__dirname, 'src');
    return config;
  },
});
