import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this.server = this.serversService.getServer(+this._activatedRoute.snapshot.params['id']);
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

  onEdit() {
    this._router.navigate(['edit'], {relativeTo: this._activatedRoute, queryParamsHandling: 'preserve'});
  }
}
