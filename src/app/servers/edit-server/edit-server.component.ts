import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, CanDeactivate } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = true;
  changesSaved = false;
  constructor(private serversService: ServersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    // console.log(this._activatedRoute.snapshot.queryParams); // Query params from URL
    // console.log(this._activatedRoute.snapshot.fragment); // Fragment from URL
    this.server = this.serversService.getServer(+this._activatedRoute.snapshot.params['id']);
    this._activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = (+queryParams['allowEdit']) ? true : false;
      }
    );
      this._activatedRoute.queryParams.subscribe(
          (queryParams) => {
            // console.log(queryParams);
          }
      );

    const id = +this._activatedRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      console.log(1);
      return true;
    }

    if ((this.serverName !== this.server.name) &&
    (!this.changesSaved)
    ) {
      console.log(2);
      return confirm('Do you want to discard the changes?');
    }else {
      console.log(3);
      return true;
    }
  }

}
