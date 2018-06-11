import { preprocessFile } from './preprocessor';
import * as fs from 'fs';

fs.writeFileSync('out/global.d.ts', preprocessFile('./src/global.d.ts'));
fs.writeFileSync('out/namespace.d.ts', preprocessFile('./src/namespace.d.ts'));
