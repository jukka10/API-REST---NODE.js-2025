//process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString() * -1);
    const transformedFinal = Buffer.from(String(transformed));

    callback(null, transformedFinal);
  }
}

class MultiplayByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplayByTenStream());
