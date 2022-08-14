import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DialogPage } from '../dialog/dialog.page';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public page: string;

  constructor(private _aR: ActivatedRoute, private _modal: ModalController) {}

  ngOnInit() {
    // Fetching ID from the Menu
    this.page =
      this._aR.snapshot.paramMap.get('id') === 'countries'
        ? 'Länder'
        : 'Projekte';
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
}
