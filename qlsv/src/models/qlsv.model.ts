import {Entity, model, property} from '@loopback/repository';

@model()
export class Qlsv extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  hoten?: string;

  @property({
    type: 'string',
  })
  msv?: string;

  @property({
    type: 'string',
  })
  gioitinh?: string;

  @property({
    type: 'date',
  })
  ngaysinh?: string;

  @property({
    type: 'string',
  })
  sdt?: string;
  @property({
    type:'string',
  })
  email?: string;
  @property({
    type:'string',
  })
  diachi?: string;
  


  constructor(data?: Partial<Qlsv>) {
    super(data);
  }
}

export interface QlsvRelations {
  // describe navigational properties here
}

export type QlsvWithRelations = Qlsv & QlsvRelations;
