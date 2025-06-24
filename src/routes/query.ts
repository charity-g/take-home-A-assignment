import { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ICreatedQuery, ICreatedBody, IQuery } from './schemas/query.interface'
import { ApiError } from '../errors'

async function queryRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'queryRoutes' })

  app.post<{
    Body: ICreatedBody
    Reply: ICreatedQuery
  }>('create', {
    async handler(req, reply) {
      const { title, description, form_data_id } = req.body
      if (!description || !form_data_id) {
        throw new ApiError(
          'description and form_data_id query parameter is required',
          400
        )
      }
      const formDataInDb = await prisma.formData.findUnique({
        where: { id: form_data_id },
      })
      if (!formDataInDb) {
        throw new ApiError('form_data_id does not exist', 400)
      }

      try {
        const query: IQuery = await prisma.query.create({
          data: {
            id: randomUUID(),
            title: title,
            description: description,
            status: 'OPEN',
            createdAt: new Date(),
            updatedAt: new Date(),
            formData: {
              connect: { id: form_data_id },
            },
            formDataId: form_data_id,
          },
        })

        reply.send({
          query: query,
        })
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form data', 400)
      }
    },
  })

  app.put<{
    Body: { resolve: boolean; query_id: string }
    Reply: ICreatedQuery
  }>('update', {
    async handler(req, reply) {
      const { resolve, query_id } = req.body
      if (!resolve || !query_id) {
        throw new ApiError('resolve and id query parameter is required', 400)
      }

      try {
        const query = await prisma.query.update({
          where: { id: query_id },
          data: {
            status: resolve ? 'RESOLVED' : 'OPEN',
            updatedAt: new Date(),
          },
        })

        reply.send({
          query: query,
        })
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to update query', 400)
      }
    },
  })

  app.delete<{
    Body: { id: string }
    Reply: { message: string }
  }>('delete', {
    async handler(req, reply) {
      const { id } = req.body
      if (!id) {
        throw new ApiError('id query parameter is required', 400)
      }

      try {
        const deleteQuery = await prisma.query.delete({
          where: { id: id },
        })

        if (!deleteQuery) {
          throw new ApiError('Query could not be deleted - not found', 404)
        }

        reply.send({ message: 'Query deleted successfully' })
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to delete query', 400)
      }
    },
  })
}

export default queryRoutes
