import pmex from 'pmex';

import { rmSync, cpSync } from 'fs';

const { name } = require('../package.json');

const cwd = './example';

pmex('build');

pmex(`install`, { cwd });

rmSync(`${cwd}/node_modules/${name}/dist`, { force: true, recursive: true });

cpSync('dist', `${cwd}/node_modules/${name}/dist`, { recursive: true, force: true });

cpSync('package.json', `${cwd}/node_modules/${name}/package.json`, { force: true });

pmex(`expo start`, { cwd });
