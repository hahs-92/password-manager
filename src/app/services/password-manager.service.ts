import { Injectable } from '@angular/core';
import { ISite } from '../models/site.model';
import { createPasswordDTO } from '../models/password.model';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  private sitesCollection = 'sites';
  private passwordCollection = 'passwords';

  constructor(private firestore: Firestore) {}

  addSite(data: ISite) {
    const dbInstance = collection(this.firestore, this.sitesCollection);
    return addDoc(dbInstance, data);
  }

  loadSites() {
    const dbInstance = collection(this.firestore, this.sitesCollection);
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite({ id, ...data }: ISite) {
    const docInstance = doc(this.firestore, this.sitesCollection, id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, this.sitesCollection, id);
    return deleteDoc(docInstance);
  }

  addPassword(data: createPasswordDTO, siteId: string) {
    // se agrega la collection de password, dentro de la collection de sites
    const dbInstance = collection(
      this.firestore,
      `${this.sitesCollection}/${siteId}/${this.passwordCollection}`
    );
    return addDoc(dbInstance, data);
  }

  loadPasswords(siteId: string) {
    const dbInstance = collection(
      this.firestore,
      `${this.sitesCollection}/${siteId}/${this.passwordCollection}`
    );
    return collectionData(dbInstance, { idField: 'id' });
  }
}
