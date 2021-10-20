import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Qlsv} from '../models';
import {QlsvRepository} from '../repositories';

export class QlsvController {
  constructor(
    @repository(QlsvRepository)
    public qlsvRepository : QlsvRepository,
  ) {}

  @post('/qlsvs')
  @response(200, {
    description: 'Qlsv model instance',
    content: {'application/json': {schema: getModelSchemaRef(Qlsv)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qlsv, {
            title: 'NewQlsv',
            exclude: ['id'],
          }),
        },
      },
    })
    qlsv: Omit<Qlsv, 'id'>,
  ): Promise<Qlsv> {
    return this.qlsvRepository.create(qlsv);
  }

  @get('/qlsvs/count')
  @response(200, {
    description: 'Qlsv model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Qlsv) where?: Where<Qlsv>,
  ): Promise<Count> {
    return this.qlsvRepository.count(where);
  }

  @get('/qlsvs')
  @response(200, {
    description: 'Array of Qlsv model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Qlsv, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Qlsv) filter?: Filter<Qlsv>,
  ): Promise<Qlsv[]> {
    return this.qlsvRepository.find(filter);
  }

  @patch('/qlsvs')
  @response(200, {
    description: 'Qlsv PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qlsv, {partial: true}),
        },
      },
    })
    qlsv: Qlsv,
    @param.where(Qlsv) where?: Where<Qlsv>,
  ): Promise<Count> {
    return this.qlsvRepository.updateAll(qlsv, where);
  }

  @get('/qlsvs/{id}')
  @response(200, {
    description: 'Qlsv model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Qlsv, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Qlsv, {exclude: 'where'}) filter?: FilterExcludingWhere<Qlsv>
  ): Promise<Qlsv> {
    return this.qlsvRepository.findById(id, filter);
  }

  @patch('/qlsvs/{id}')
  @response(204, {
    description: 'Qlsv PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qlsv, {partial: true}),
        },
      },
    })
    qlsv: Qlsv,
  ): Promise<void> {
    await this.qlsvRepository.updateById(id, qlsv);
  }

  @put('/qlsvs/{id}')
  @response(204, {
    description: 'Qlsv PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() qlsv: Qlsv,
  ): Promise<void> {
    await this.qlsvRepository.replaceById(id, qlsv);
  }

  @del('/qlsvs/{id}')
  @response(204, {
    description: 'Qlsv DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.qlsvRepository.deleteById(id);
  }
}
