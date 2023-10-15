import openpgp from "openpgp";
import fs, { ReadStream } from "fs";

const publicKeyArmored = fs
  .readFileSync("keys/publicKey.key", { flag: "r", encoding: "utf-8" })
  .toString();
const privateKeyArmored = fs
  .readFileSync("keys/privateKey.key", { flag: "r", encoding: "utf-8" })
  .toString();

async function encrypt() {
  // const publicKeys = await Promise.all(
  //   publicKeysArmored.map((armoredKey) => openpgp.readKey({ armoredKey }))
  // );
  // const privateKey = await openpgp.decryptKey({
  //   privateKey: (await openpgp.readKey({
  //     armoredKey: privateKeyArmored,
  //   })) as openpgp.PrivateKey,
  // });

  const publicKeys = await openpgp.readKeys({ armoredKeys: publicKeyArmored });
  const privateKey = await openpgp.readPrivateKey({
    armoredKey: privateKeyArmored,
  });
  // const privateKeyPass = await openpgp.decryptKey({
  //   privateKey,
  // });

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
