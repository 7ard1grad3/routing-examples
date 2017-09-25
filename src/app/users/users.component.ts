import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) {

  }

    navigateToServers() {
      console.log(this._activatedRoute);
      //this._route.navigate(['systems'], {relativeTo: this._activatedRoute});
    }


}
