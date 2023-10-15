import fs, { ReadStream } from "fs";
import openpgp from "openpgp";

const publicKeyArmored = fs
  .readFileSync("keys/publicKey.key", { flag: "r", encoding: "utf-8" })
  .toString();
const privateKeyArmored = fs
  .readFileSync("keys/privateKey.key", { flag: "r", encoding: "utf-8" })
  .toString();

export async function getPublicKeys() {
  return await openpgp.readKeys({ armoredKeys: publicKeyArmored });
}

export async function getPrivateKey() {
  return await openpgp.readPrivateKey({
    armoredKey: privateKeyArmored,
  });
}
