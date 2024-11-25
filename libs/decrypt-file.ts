import * as openpgp from "openpgp";
import fs from "fs";

import { getPrivateKey, getPublicKeys } from "./keyManager.js";

export async function decrypt() {
  // const publicKeys = await getPublicKeys();
  const privateKey = await getPrivateKey();

  const srcPath = "pgp/encrypted/encrypted-secrets.txt.pgp";
  const destPath = "pgp/decrypted/decrypted.txt";
  const plainData = fs.readFileSync(srcPath, "utf8");

  let plaintext = "";
  let decrypted = openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: plainData }),
    // verificationKeys: publicKeys, // optional
    decryptionKeys: privateKey,
  })

  return new Promise((resolve, reject) => {
    decrypted.then(({ data }) => {
      fs.writeFileSync(destPath, data, {
        encoding: "utf8",
      });
      resolve(data);
    })
      .catch((err) => {
        console.log(`ex : ${err.message}`)
        reject(`error : ${err.message}`);
      });
  });
}

export async function decrypt2() {
  const publicKeys = await getPublicKeys();
  const privateKey = await getPrivateKey();

  const srcPath = "pgp/encrypted/4000KBK02C964720230512.TXT.pgp";
  const destPath = "pgp/decrypted/decrypted2.txt";

  const encryptedData = fs.readFileSync(srcPath);

  const encryptedMessage = await openpgp.readMessage({
    binaryMessage: encryptedData // parse encrypted bytes
  });

  let decrypted = await openpgp.decrypt({
    message: encryptedMessage,
    verificationKeys: publicKeys, // optional
    decryptionKeys: privateKey,
    format: 'binary'
    // config: {
    //   allowInsecureDecryptionWithSigningKeys: true,
    // },

  })

  return new Promise((resolve, reject) => {
    fs.writeFileSync(destPath, decrypted.data, {
      encoding: "utf8",
    });
    resolve(decrypted.filename);
  });
}