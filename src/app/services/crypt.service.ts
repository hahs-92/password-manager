import { Injectable } from '@angular/core';

import { AES, enc } from 'crypto-js';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptService {
  private SECRET_KEY = environment.secretKey;

  constructor() {}

  encryptPassword(password: string) {
    return AES.encrypt(password, this.SECRET_KEY).toString();
  }

  decryptPassword(password: string) {
    return AES.decrypt(password, this.SECRET_KEY).toString(enc.Utf8);
  }
}
