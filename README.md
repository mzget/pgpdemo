# pgpdemo

Demo file encryption using openpgp standard
----
Since KBTG/KBANK provide file transfer (SFTP) for partner/client with file encryption capability. 
We support GnuPG 1.4, OpenPGP standard, then partner can encrypt file before send to KBANK for Inbound flow or need KBANK encrypt file before send to partner for Outbound flow.

## Partner Encrypt
- Partner get KBANK public key and encrypt with GnuPG or OpenPGP.

## Partner Decrypt 
- Partner generate public key and send it to KBANK for make encryption file and then Partner can decrypt file with your private key.

## How to generate key pair
- Partner can generate key pair using GnuPG command line tool 
