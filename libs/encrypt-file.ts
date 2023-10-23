import openpgp from "openpgp";
import fs, { ReadStream } from "fs";

import { getPrivateKey, getPublicKeys } from "./keyManager.js";

export async function encrypt() {
  const publicKeys = await getPublicKeys();
  const privateKey = await getPrivateKey();

  const plainData = fs.createReadStream("pgp/src/secrets.txt", "utf8");

  const encrypted: any = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plainData }), // input as Message object
    encryptionKeys: publicKeys,
    signingKeys: privateKey, // optional
  });

  return new Promise((resolve, reject) => {
    let writeStream = fs.createWriteStream(
      "pgp/encrypted/encrypted-secrets.txt",
      {
        flags: "a",
      }
    );
    encrypted.pipe(writeStream);
    encrypted.on("end", () => {
      const data = fs.readFileSync(
        "pgp/encrypted/encrypted-secrets.txt",
        "utf8"
      );
      const str = data.toString();
      console.log(str);
      resolve(str);
    });
  });
}

// encrypt();
