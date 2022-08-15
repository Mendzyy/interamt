import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
})
export class DialogPage implements OnInit {
  public page: string;
  public country: {
    name: '';
    code: '';
    capital: '';
    currency: '';
  };
  aList_Countries = [];
  constructor(private _navParams: NavParams, private _http: HttpClient) {}

  ngOnInit() {
    this.page = this._navParams.get('page') === 'Länder' ? 'Land' : 'Projekt';
    if (this.page === 'Land') {
      this.fetch_Country_Suggestions();
    }
  }
  async fetch_Country_Suggestions() {
    this._http
      .get('./assets/json/countries_suggestions.json')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          this.aList_Countries = data;
        }
      });
  }

  closeModal() {
    this['modal'].dismiss();
  }

  addItem() {}
}
