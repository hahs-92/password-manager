import { Injectable } from '@angular/core';
import { ISite } from '../models/site.model';

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
  private collection = 'sites';

  constructor(private firestore: Firestore) {}

  addSite(data: ISite) {
    const docInstance = collection(this.firestore, this.collection);
    return addDoc(docInstance, data);
  }

  loadSites() {
    const docInstance = collection(this.firestore, this.collection);
    return collectionData(docInstance, { idField: 'id' });
  }

  updateSite({ id, ...data }: ISite) {
    const docInstance = doc(this.firestore, this.collection, id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, this.collection, id);
    return deleteDoc(docInstance);
  }
}
