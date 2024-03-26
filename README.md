# pgpdemo

## Demo file encryption using openpgp standard

Since KBTG/KBANK provide file transfer (SFTP) for partner/client with file encryption capability.
We support GnuPG 1.4, OpenPGP standard, then partner can encrypt file before send to KBANK for Inbound flow or need KBANK encrypt file before send to partner for Outbound flow.

## Partner Encrypt

- Partner get KBANK public key and encrypt with GnuPG or OpenPGP.

## Partner Decrypt

- Partner generate public key and send it to KBANK for make encryption file and then Partner can decrypt file with your private key.

## How to generate key pair

- Partner can generate key pair using [GnuPG command line tool](https://www.gnupg.org/download/)
- Choose RSA algorithm and use 2048 bits key size

\*\* More detail about generate GPG key read [this link](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key?platform=windows)

## Encrypt/Decrypt with OpenPGP standard

- [Developer Libraries/Tools](https://www.openpgp.org/software/developer/)

### Encryption (openpgp.js)

```js
// libs/encrypt-file.ts
export async function encrypt() {
  const publicKeys = await getPublicKeys();

  const plainData = fs.createReadStream("pgp/src/secrets.txt", "utf8");

  const encrypted: any = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plainData }),
    encryptionKeys: publicKeys,
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
```

### Decryption (openpgp.js)

```js
// libs/decrypt-file.ts
export async function decrypt() {
  const privateKey = await getPrivateKey();

  const srcPath = "pgp/encrypted/encrypted-secrets.txt.pgp";
  const destPath = "pgp/decrypted/decrypted.txt";
  const plainData = fs.createReadStream(srcPath, "utf8");
  let plaintext = "";
  let decrypted = openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: plainData }),
    decryptionKeys: privateKey,
  });
  return new Promise((resolve, reject) => {
    decrypted
      .then((e: { data }) => {
        e.data
          .on("data", (chunk) => {
            plaintext += chunk;
          })
          .on("error", (err) => {
            reject(`error : ${err.message}`);
          })
          .on("end", () => {
            fs.writeFileSync(destPath, plaintext, {
              encoding: "utf8",
            });
            resolve(plaintext);
          });
      })
      .catch((err) => {
        reject(`error : ${err.message}`);
      });
  });
}
```

## Encrypt/Decrypt with GnuPG command line

```cmd
# Encrypt file

gpg --always-trust --yes --no-random-seed-file  --output "file_name.txt.pgp" -r KBankH2HPgpUAT --encrypt "file_name.txt"

# Decrypt file

gpg --batch --always-trust --yes --output "file_name_output.*" --passphrase xxxxx --decrypt "file_name_input.pgp"
```
