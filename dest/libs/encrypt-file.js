import * as openpgp from "openpgp";
import fs from "fs";
import { getPublicKeys } from "./keyManager.js";
export async function encrypt() {
    const publicKeys = await getPublicKeys();
    // const privateKey = await getPrivateKey();
    const plainData = fs.readFileSync("pgp/src/secrets.txt", "utf8");
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: plainData }),
        encryptionKeys: publicKeys,
        // signingKeys: privateKey, // optional
    });
    const destPath = "pgp/encrypted/encrypted-secrets.txt.pgp";
    return new Promise((resolve, reject) => {
        fs.writeFileSync(destPath, encrypted);
        resolve("success");
    });
}
// encrypt();
