import crypto from 'crypto';

// Générer une clé aléatoire de 64 octets (512 bits)
export const generateJwtSecret = (): string => {
  return crypto.randomBytes(64).toString('hex');
};
