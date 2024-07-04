import Fastify from 'fastify';
import mercurius from 'mercurius';
import { schema } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(mercurius, {
  schema: schema,
  resolvers: resolvers,
  graphiql: true,
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit();
}
