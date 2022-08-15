import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DialogPage } from '../dialog/dialog.page';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public page: string;
  public searchTerm: string = '';
  public aProjects: Observable<any[]>;
  public aProjects_temp: Observable<any[]>;
  public aCountries: Observable<any[]>;
  public aCountries_temp: Observable<any[]>;
  constructor(
    private _aR: ActivatedRoute,
    private _modal: ModalController,
    private _fireStore: AngularFirestore
  ) {}

  async ngOnInit() {
    // Fetching ID from the Menu
    this.page =
      this._aR.snapshot.paramMap.get('id') === 'countries'
        ? 'Länder'
        : 'Projekte';
    // Fetching Countries from Database
    this.aCountries = this.aCountries_temp = this._fireStore
      .collection('countries')
      .valueChanges()
      .pipe(
        map((data) => {
          return data;
        })
      );
    // Fetching Projects from Database
    this.aProjects = this.aProjects_temp = this._fireStore
      .collection('projects')
      .valueChanges()
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  async addItem() {
    await this._modal
      .create({
        component: DialogPage,
        componentProps: {
          page: this.page,
        },
      })
      .then((_oModal) => _oModal.present());
  }

  searchItems(searchTerm: string) {
    if (!searchTerm) {
      this.aCountries = this.aCountries_temp;
      this.aProjects = this.aProjects_temp;
    }
    if (this.page === 'Länder') {
      this.aCountries = this.aCountries_temp.pipe(
        map((data) => {
          return data.filter((item) => {
            return (
              item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
            );
          });
        })
      );
    } else {
      this.aProjects = this.aProjects_temp.pipe(
        map((data) => {
          return data.filter((item) => {
            return (
              item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
            );
          });
        })
      );
    }
  }
}
