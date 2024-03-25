import openpgp from "openpgp";
import fs from "fs";

export async function generate() {
  const { privateKey, publicKey, revocationCertificate } =
    await openpgp.generateKey({
      type: "rsa",
      rsaBits: 2048,
      userIDs: [{ name: "nattapon_r", email: "nattapon.r@live.com" }],
      // curve: "ed25519",
      // format: "armored",
    });
  fs.writeFileSync("keys/get_rsa_privateKey.txt", privateKey, {
    encoding: "utf-8",
  });
  fs.writeFileSync("keys/get_rsa_publicKey.txt", publicKey, {
    encoding: "utf-8",
  });

  return "success gen keys";
}

// generate();
