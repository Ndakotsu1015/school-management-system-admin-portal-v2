import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const BCRYPT_HASH_ROUNDS = 10;

@Injectable()
export class BcryptService {
    async hashPassword(password: string) {
        return bcrypt.hash(password, BCRYPT_HASH_ROUNDS);
    }

    async comparePasswords(attemptedPassword: string, hashedPassword: string) {
        return await bcrypt.compare(attemptedPassword, hashedPassword);
    }
}