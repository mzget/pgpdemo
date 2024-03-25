import openpgp from "openpgp";
import fs from "fs";

import { getPrivateKey } from "./keyManager.js";

export async function decrypt() {
  // const publicKeys = await getPublicKeys();
  const privateKey = await getPrivateKey();

  const srcPath = "pgp/encrypted/encrypted-secrets.txt.pgp";
  const destPath = "pgp/decrypted/decrypted.txt";
  const plainData = fs.createReadStream(srcPath, "utf8");
  let plaintext = "";
  let decrypted = openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: plainData }),
    // verificationKeys: publicKeys, // optional
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
          .on("error", (err) => {
            reject(`error : ${err.message}`);
          })
          .on("end", () => {
            fs.writeFileSync(destPath, plaintext, {
              encoding: "utf8",
            });
            resolve(plaintext);
          });
      })
      .catch((err) => {
        reject(`error : ${err.message}`);
      });
  });
}

// decrypt();
