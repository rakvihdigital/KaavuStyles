const { spawn } = require('node:child_process');

const args = process.argv.slice(2);
const portIndex = args.findIndex((arg) => arg === '-p' || arg === '--port');
const inlinePort = args.find((arg) => arg.startsWith('--port='));
const port = portIndex >= 0 ? args[portIndex + 1] : inlinePort?.split('=')[1] || process.env.PORT || '3000';

if (!/^\d+$/.test(port || '') || Number(port) < 1 || Number(port) > 65535) {
  console.error('Provide a valid development port (1–65535).');
  process.exit(1);
}

// All Next.js workers inherit the same output folder for this server.
const nextArgs = portIndex >= 0 || inlinePort ? args : [...args, '--port', port];
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', ...nextArgs], {
  stdio: 'inherit',
  env: { ...process.env, KAVVU_DEV_PORT: port },
});
child.on('error', (error) => { console.error(error); process.exitCode = 1; });
child.on('exit', (code) => { process.exitCode = code ?? 1; });
process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
