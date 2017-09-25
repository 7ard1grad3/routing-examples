import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    /*First initialization of data by routes*/
    this.user = {
        id : this._activatedRoute.snapshot.params['id'],
        name: this._activatedRoute.snapshot.params['name']
    };
    /*Track parameters change by async subscription*/
    this._activatedRoute.params.subscribe(
        /*Wait for data within callback*/
        (_parameters: Params) => {
            this.user = {
                id : _parameters['id'],
                name: _parameters['name']
            };
        }
    );

  }

}
