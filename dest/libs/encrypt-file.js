import openpgp from "openpgp";
import fs from "fs";
import { getPublicKeys } from "./keyManager.js";
export async function encrypt() {
    const publicKeys = await getPublicKeys();
    // const privateKey = await getPrivateKey();
    const plainData = fs.createReadStream("pgp/src/secrets.txt", "utf8");
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: plainData }),
        encryptionKeys: publicKeys,
        // signingKeys: privateKey, // optional
    });
    const destPath = "pgp/encrypted/encrypted-secrets.txt.pgp";
    return new Promise((resolve, reject) => {
        let writeStream = fs.createWriteStream(destPath, {
            flags: "a",
        });
        encrypted.pipe(writeStream);
        encrypted.on("end", () => {
            const data = fs.readFileSync(destPath, "utf8");
            const str = data.toString();
            console.log(str);
            resolve(str);
        });
    });
}
// encrypt();
