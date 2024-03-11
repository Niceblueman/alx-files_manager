import Fastify from 'fastify';
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import Fastifyexpress from '@fastify/express';
import router from './routes/index';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const port = parseInt(process.env.PORT, 10) || 5000;

const fastify = Fastify({
  logger: process.env.NODE_ENV !== 'production',
});
async function build() {
  await fastify.register(Fastifyexpress);
  fastify.use(express.json());
  fastify.use('/', router);
  fastify.express.disabled('x-powered-by');
  return fastify;
}
build()
  .then((fastify) => fastify.listen({ port }, (err, address) => {
    console.log(`server running on ${address}`);
    if (err) {
      throw err;
    }
  }))
  .catch(console.log);
export default fastify;
