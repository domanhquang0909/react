import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'restQlsvdb',
  connector: 'mssql',
  url: 'mssql://sa:12345678@localhost/Todo',
  host: 'localhost',
  port: 1433,
  user: 'sa',
  password: '12345678',
  database: 'Todo'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestQlsvdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'restQlsvdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.restQlsvdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
