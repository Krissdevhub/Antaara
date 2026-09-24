import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface StoredAuth {
  hash: string;
  salt: string;
  updatedAt: string;
}

const AUTH_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'admin_auth.json');
export const DEFAULT_INITIAL_PASSWORD = 'AntaaraStudio#2025';

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function getStoredAuth(): StoredAuth | null {
  try {
    if (fs.existsSync(AUTH_FILE_PATH)) {
      const content = fs.readFileSync(AUTH_FILE_PATH, 'utf-8');
      return JSON.parse(content) as StoredAuth;
    }
  } catch (err) {
    console.error('Error reading admin_auth.json:', err);
  }
  return null;
}

export function verifyAdminPassword(enteredPassword: string): boolean {
  if (!enteredPassword) return false;

  const stored = getStoredAuth();
  if (stored && stored.hash && stored.salt) {
    try {
      const computedHash = hashPassword(enteredPassword, stored.salt);
      const computedBuffer = Buffer.from(computedHash, 'hex');
      const storedBuffer = Buffer.from(stored.hash, 'hex');
      if (computedBuffer.length === storedBuffer.length) {
        return crypto.timingSafeEqual(computedBuffer, storedBuffer);
      }
    } catch (e) {
      console.error('Error verifying hashed password:', e);
    }
  }

  // Fallback to process.env.ADMIN_PASSWORD or initial default
  const envPassword = process.env.ADMIN_PASSWORD || DEFAULT_INITIAL_PASSWORD;
  return enteredPassword === envPassword;
}

export function saveAdminPassword(newPassword: string): boolean {
  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashPassword(newPassword, salt);
    const data: StoredAuth = {
      hash,
      salt,
      updatedAt: new Date().toISOString(),
    };

    const dir = path.dirname(AUTH_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');

    // Update in-memory process.env for the active process
    process.env.ADMIN_PASSWORD = newPassword;

    // Update .env.local if it exists
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      try {
        let envContent = fs.readFileSync(envLocalPath, 'utf-8');
        if (envContent.includes('ADMIN_PASSWORD=')) {
          envContent = envContent.replace(
            /ADMIN_PASSWORD=.*/g,
            `ADMIN_PASSWORD=${newPassword}`
          );
        } else {
          envContent += `\nADMIN_PASSWORD=${newPassword}\n`;
        }
        fs.writeFileSync(envLocalPath, envContent, 'utf-8');
      } catch (err) {
        console.warn('Could not update .env.local:', err);
      }
    }

    return true;
  } catch (err) {
    console.error('Error saving admin password:', err);
    return false;
  }
}
