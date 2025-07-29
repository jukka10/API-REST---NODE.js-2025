import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString() * -1);
    const transformedFinal = Buffer.from(String(transformed));

    console.log(transformed);

    callback(null, transformedFinal);
  }
}

const server = http.createServer(async (req, res) => {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }

  const fullBufferContent = Buffer.concat(buffer).toString();
  console.log(fullBufferContent);

  return res.end(fullBufferContent);
});

server.listen(3334);
