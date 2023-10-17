import openpgp from "openpgp";
import fs from "fs";

export async function generate() {
  const { privateKey, publicKey, revocationCertificate } =
    await openpgp.generateKey({
      userIDs: [{ name: "nattapon.r", email: "nattapon.r@live.com" }],
      curve: "ed25519",
    });
  fs.writeFileSync("keys/privateKey.key", privateKey, { encoding: "utf-8" });
  fs.writeFileSync("keys/publicKey.key", publicKey, { encoding: "utf-8" });

  return "success gen keys";
}

// generate();
