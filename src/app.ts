import fastify from 'fastify'

import formDataRoutes from './routes/form_data'
import queryRoutes from './routes/query'
import errorHandler from './errors'

function build(opts = {}) {
  const app = fastify({
    ...opts,
  })

  app.register(formDataRoutes, { prefix: '/form-data' })
  app.register(queryRoutes, { prefix: '/query' })

  app.setErrorHandler(errorHandler)

  app.ready(err => {
    if (err) throw err
    console.log(app.printRoutes())
  })

  return app
}
export default build
