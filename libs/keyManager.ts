import fs, { ReadStream } from "fs";
import openpgp from "openpgp";

export async function getPublicKeys() {
  const publicKeyArmored = fs
    .readFileSync("keys/publicKey.key", { flag: "r", encoding: "utf-8" })
    .toString();

  return await openpgp.readKeys({ armoredKeys: publicKeyArmored });
}

export async function getPrivateKey() {
  const privateKeyArmored = fs
    .readFileSync("keys/privateKey.key", { flag: "r", encoding: "utf-8" })
    .toString();

  return await openpgp.readPrivateKey({
    armoredKey: privateKeyArmored,
  });
}
