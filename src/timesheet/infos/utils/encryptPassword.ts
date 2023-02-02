import { CryptoHash } from '@/timesheet/infos/types';

import { randomBytes, createCipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

export const encryptAzurePassword = async (
  text: string
): Promise<CryptoHash> => {
  const iv = randomBytes(16);
  const key: Buffer = (await promisify(scrypt)(
    `${process.env.AZURE_SECRET}`,
    'salt',
    32
  )) as Buffer;

  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};
