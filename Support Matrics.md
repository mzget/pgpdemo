# Support Matrics

## Support priority

| Model            | File Explorer  | Log |
| -----------------| -------------- | --- |
| Inbound Passive  | 1              | 2   |
| Outbound Passive | 1              | 2   |
| Inbound Active   | 2              | 1   |
| Outbound Active  | 2              | 1   |

## File Explorer


| Model            | Case        | Folder | Remark  | Remark2     |
| ------------------ | ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inbound Passive  | Normal      | Virtual Folder /Inbound  | ถ้า Partner ยังไม่วางไฟล์ หรือยังไม่ถึงรอบ Process จะเห็นไฟล์ใน Folder | ถ้าไม่เห็นไฟล์ อาจถูก process ไปแล้ว ให้ check log เพิ่ม                                                                  |
| Outbound Passive | Normal      | Virtual Folder /Outbound | ถ้า Partner ยังไม่เข้ามากวาดไฟล์ จะเห็นไฟล์ใน Folder                            | ถ้าไม่เห็นไฟล์ อาจถูกกวาด ไปแล้ว ให้ check log เพิ่ม                                                                  |
| Inbound Passive  | Decrypt     | -                        | ดู case Inbound Passive/Normal                                                                                   | ถ้า Check log พบ Decrypt Fail ตรวจสอบไฟล์ได้ที่<br /> /{Gateway Machine}/root/{product name}/backup/pre_decrypt_inbound/{date_time}   |
| Outbound Passive | Encrypt     | -                        | ดู case Outbound Passive/Normal                                                                                  | ถ้า Check log พบ Encrypt Fail ตรวจสอบไฟล์ได้ที่<br /> /{Gateway Machine}/root/{product name}/backup/pre_encrypt_outbound/{date_time}  |
| Outbound Passive | Zip / Unzip | -                        | ดู case Outbound Passive/Normal                                                                                  | ถ้า Check log พบ Zip/Unzip Fail ตรวจสอบไฟล์ได้ที่<br /> /{Business Machine}/root/{product name}/backup/pre_unzip_outbound/{date_time} |
| Inbound Active    | Normal     | - | ดู log เพื่อตรวจว่า กวาดไฟล์จาก Partner สำเร็จ  | ถ้าเจอ Connection Fail (เข้าเครื่อง Partner ไม่ได้) หรือ File not found (ยังไม่มีไฟล์ หรือยังไม่ถึงรอบ)   |
| Inbound Active    | Decrypt    | - | ดู case Inbound Active/Normal | ถ้า Check log พบ Decrypt Fail ตรวจสอบไฟล์ได้ที่<br /> /{Gateway Machine}/root/{product name}/backup/pre_decrypt_inbound/{date_time}  |
| Outbound Active   | Normal     | - | ดู log เพื่อตรวจว่า วางไฟล์ให้ Partner สำเร็จ  | ถ้าเจอ Connection Fail (เข้าเครื่อง Partner ไม่ได้) หรือ File not found (ยังไม่มีไฟล์ หรือยังไม่ถึงรอบ) |
| Outbound Active   | Encrypt    | - | ดู case Outbound Active/Normal  | ถ้า Check log พบ Encrypt Fail ตรวจสอบไฟล์ได้ที่ <br /> /{Gateway Machine}/root/{product name}/backup/pre_encrypt_outbound/{date_time} |
