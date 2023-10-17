import openpgp from "openpgp";
import fs from "fs";
import { getPrivateKey, getPublicKeys } from "./keyManager.js";
export async function encrypt() {
    const publicKeys = await getPublicKeys();
    const privateKey = await getPrivateKey();
    const plainData = fs.createReadStream("pgp/src/secrets.txt", "utf8");
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: plainData }),
        encryptionKeys: publicKeys,
        signingKeys: privateKey, // optional
    });
    return new Promise((resolve, reject) => {
        let writeStream = fs.createWriteStream("pgp/encrypted/encrypted-secrets.txt", {
            flags: "a",
        });
        encrypted.pipe(writeStream);
        encrypted.on("end", resolve("done"));
    });
}
// encrypt();
