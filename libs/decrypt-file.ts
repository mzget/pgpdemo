import openpgp from "openpgp";
import fs, { ReadStream } from "fs";

import { getPrivateKey, getPublicKeys } from "./keyManager.js";

async function decrypt() {
  const publicKeys = await getPublicKeys();
  const privateKey = await getPrivateKey();

  const plainData = fs.createReadStream(
    "pgp/encrypted/encrypted-secrets.txt",
    "utf8"
  );
  let plaintext = "";
  openpgp
    .decrypt({
      message: await openpgp.readMessage({ armoredMessage: plainData }),
      verificationKeys: publicKeys, // optional
      decryptionKeys: privateKey,
    })
    .then((e: { data }) => {
      e.data
        .on("data", (chunk) => {
          console.log(chunk);
          plaintext += chunk;
        })
        .on("end", () => {
          console.log("end");

          fs.writeFileSync("pgp/decrypted/decrypted.txt", plaintext, {
            encoding: "utf8",
          });
        })
        .on("error", (err) => {
          console.warn(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}

decrypt();
