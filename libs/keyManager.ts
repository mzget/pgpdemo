import fs, { ReadStream } from "fs";
import openpgp from "openpgp";

export async function getPublicKeys() {
  const publicKeyArmored = fs
    .readFileSync("keys/nattapon_r.pub.txt", {
      flag: "r",
      encoding: "utf-8",
    })
    .toString();

  let key;
  await openpgp
    .readKey({ armoredKey: publicKeyArmored })
    .catch((err) => console.log("pub error", err))
    .then((val) => {
      key = val;
    });
  return await key;
}

export async function getPrivateKey() {
  const privateKeyArmored = fs
    .readFileSync("keys/nattapon_r.txt", {
      flag: "r",
      encoding: "utf-8",
    })
    .toString();

  let key;
  await openpgp
    .readPrivateKey({
      armoredKey: privateKeyArmored,
    })
    .catch((err) => console.log("sec err", err))
    .then((val) => {
      key = val;
    });

  return await key;
}
