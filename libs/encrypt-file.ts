import openpgp from "openpgp";
import fs, { ReadStream } from "fs";

import { getPrivateKey, getPublicKeys } from "./keyManager.js";

async function encrypt() {
  const publicKeys = await getPublicKeys();
  const privateKey = await getPrivateKey();

  const plainData = fs.createReadStream("pgp/src/secrets.txt", "utf8");

  const encrypted: any = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plainData }), // input as Message object
    encryptionKeys: publicKeys,
    signingKeys: privateKey, // optional
  });

  let writeStream = fs.createWriteStream(
    "pgp/encrypted/encrypted-secrets.txt",
    {
      flags: "a",
    }
  );
  encrypted.pipe(writeStream);
  encrypted.on("end", () => console.log("done!"));
}

encrypt();
