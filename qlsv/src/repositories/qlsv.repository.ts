import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RestQlsvdbDataSource} from '../datasources';
import {Qlsv, QlsvRelations} from '../models';

export class QlsvRepository extends DefaultCrudRepository<
  Qlsv,
  typeof Qlsv.prototype.id,
  QlsvRelations
> {
  constructor(
    @inject('datasources.restQlsvdb') dataSource: RestQlsvdbDataSource,
  ) {
    super(Qlsv, dataSource);
  }
}
