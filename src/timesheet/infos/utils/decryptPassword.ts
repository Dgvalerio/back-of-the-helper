import { CryptoHash } from '@/timesheet/infos/types';

import { createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

export const decryptPassword = async (hash: CryptoHash): Promise<string> => {
  const key: Buffer = (await promisify(scrypt)(
    `${process.env.AZURE_SECRET}`,
    'salt',
    32
  )) as Buffer;

  const decipher = createDecipheriv(
    'aes-256-ctr',
    key,
    Buffer.from(hash.iv, 'hex')
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};
