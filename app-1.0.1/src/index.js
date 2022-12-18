import express from 'express';
import http from 'http';

import { createTerminus } from '@godaddy/terminus';

const app = express();
const PORT = 8080;

async function sleep(ms, value = '') {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (value !== '' && value != null) {
        console.log('[sleep-log] %s', value);
      }
      resolve(value);
    }, ms);
  });
}

app.get('/', async (req, res) => {
  await sleep(10000, `[v1] - request finished - ${Date.now()}`);
  console.log('[log]: ', req.path, req.query);
  res.json({ foo: '[v1] - bar' });
});

/**
 * @param {Object} params
 * @param {import('@godaddy/terminus').TerminusState} params.state
 */
async function onHealthCheck({ state }) {
  console.log('onHealthCheck --- ', state.isShuttingDown);
  await sleep(2000);
  return Promise.resolve(true);
}

function onSignal() {
  console.log('server is starting cleanup');

  return Promise.all([
    // your clean logic, like closing database connections
    sleep(6000, 'test-1'),
    sleep(2000, 'test-2'),
    sleep(5000, 'test-3')
  ]);
}

function beforeShutdown() {
  console.log('beforeShutdown')
  // given your readiness probes run every 5 second
  // may be worth using a bigger number so you won't
  // run into any race conditions
  return new Promise((resolve) => {
    setTimeout(resolve, 8000);
  });
}

/** @type import('@godaddy/terminus').TerminusOptions */
const terminusOptions = {
  logger: console.log,
  // signal: 'SIGINT',
  signals: ['SIGTERM', 'SIGINT'],
  healthChecks: {
    '/healthcheck': onHealthCheck
  },
  beforeShutdown,
  useExit0: true,
  onSignal
};

const server = http.createServer(app);

createTerminus(server, terminusOptions);

server.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
