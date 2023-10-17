import openpgp from "openpgp";
import fs, { ReadStream } from "fs";

import { getPrivateKey, getPublicKeys } from "./keyManager.js";

export async function decrypt() {
  const publicKeys = await getPublicKeys();
  const privateKey = await getPrivateKey();

  const plainData = fs.createReadStream(
    "pgp/encrypted/encrypted-secrets.txt",
    "utf8"
  );
  let plaintext = "";
  let decrypted = openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: plainData }),
    verificationKeys: publicKeys, // optional
    decryptionKeys: privateKey,
  });
  return new Promise((resolve, reject) => {
    decrypted
      .then((e: { data }) => {
        e.data
          .on("data", (chunk) => {
            console.log(chunk);
            plaintext += chunk;
          })
          .on("end", () => {
            fs.writeFileSync("pgp/decrypted/decrypted.txt", plaintext, {
              encoding: "utf8",
            });

            resolve("done");
          })
          .on("error", (err) => {
            reject(`error : ${err.message}`);
          });
      })
      .catch((err) => {
        reject(`error : ${err.message}`);
      });
  });
}

// decrypt();
