import pmex from 'pmex';

import { rmSync, cpSync } from 'fs';

const { name } = require('../package.json');

const cwd = './example';

pmex('build');

pmex(`--cwd ${cwd} install`);

rmSync(`${cwd}/node_modules/${name}/dist`, { force: true, recursive: true });

cpSync('dist', `${cwd}/node_modules/${name}/dist`, { recursive: true, force: true });

pmex(`--cwd ${cwd} expo start -c`);
