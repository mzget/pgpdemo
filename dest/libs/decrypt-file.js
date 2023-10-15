import openpgp from "openpgp";
import fs from "fs";
const publicKeyArmored = fs
    .readFileSync("keys/publicKey.key", { flag: "r", encoding: "utf-8" })
    .toString();
const privateKeyArmored = fs
    .readFileSync("keys/privateKey.key", { flag: "r", encoding: "utf-8" })
    .toString();
async function decrypt() {
    const publicKeys = await openpgp.readKeys({ armoredKeys: publicKeyArmored });
    const privateKey = await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
    });
    const plainData = fs.createReadStream("pgp/encrypted/encrypted-secrets.txt", "utf8");
    let plaintext = "";
    //   const decrypted: { data: any } = await
    openpgp
        .decrypt({
        message: await openpgp.readMessage({ armoredMessage: plainData }),
        verificationKeys: publicKeys,
        decryptionKeys: privateKey,
    })
        .then((e) => {
        e.data
            .on("data", (chunk) => {
            console.log(chunk);
            plaintext += chunk;
        })
            .on("end", () => {
            console.log("end:" + plaintext);
            fs.writeFileSync("pgp/decrypted/decrypted.txt", plaintext, {
                encoding: "utf8",
            });
        })
            .on("error", (err) => {
            console.warn(err);
        });
    })
        .catch((err) => {
        console.warn(err);
    });
    //   const chunks: string[] = [];
    //   for await (const chunk of decrypted.data) {
    //     console.log("chunk", chunk);
    //     chunks.push(chunk);
    //   }
    //   const plaintext = chunks.join("");
}
decrypt();
