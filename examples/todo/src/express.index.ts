// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TodoListApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {Request, Response} from '@loopback/rest';
const express = require('express');
const path = require('path');
// const pEvent = require('p-event');

export async function main(options: ApplicationConfig = {}) {
  const app = new express();
  const lbApp = new TodoListApplication(options);

  // Mount LB4 as our REST API
  await lbApp.boot();
  lbApp.basePath('/api');

  // Expose the front-end assets via Express, not as LB4 route
  app.use(lbApp.requestHandler);
  app.use(express.static('./public'));

  // Add any custom Express routes
  app.get('/', function(_req: Request, res: Response) {
    res.sendFile(path.resolve('public/index.html'));
  });
  app.get('/get', function(_req: Request, res: Response) {
    res.send('Get!');
  });

  app.listen(3000);

  // This line doesn't work right now
  // await pEvent(app, 'listening');

  console.log('TodoList example listening on http://127.0.0.1:3000!');

  return app;
}

export {TodoListApplication};
