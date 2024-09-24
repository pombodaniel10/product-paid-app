// src/application/helpers/encryptor.ts
import * as crypto from 'crypto';

const secret = 'your-encryption-key'; // Puedes usar una clave secreta segura

export function encryptSensitiveData(data: any): string {
  const cipher = crypto.createCipher('aes-256-cbc', secret);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
