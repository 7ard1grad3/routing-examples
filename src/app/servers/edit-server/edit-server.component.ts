import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  constructor(private serversService: ServersService, private _activatedRoute: ActivatedRoute) { }

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

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
