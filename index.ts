import fastify from "fastify";
import { generate } from "./libs/generate-keys.js";
import { encrypt } from "./libs/encrypt-file.js";
import { decrypt } from "./libs/decrypt-file.js";

const server = fastify();

/**
 *  curl localhost:8080/ping
 */
server.get("/ping", async (request, reply) => {
  console.log("/ping");
  return "pong\n";
});

/**
 * curl -X POST localhost:8080/genkey
 */
server.post("/genkey", async (request, reply) => {
  return generate();
});
server.post("/encrypt", async (request, reply) => {
  return encrypt();
});
server.post("/decrypt", async (request, reply) => {
  return decrypt();
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
