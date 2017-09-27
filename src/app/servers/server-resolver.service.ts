import { ServersService } from './servers.service';
import { Server } from './server.interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable()
export class ServerResolverService implements Resolve<Server> {


  constructor(private _serverService: ServersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this._serverService.getServer(+route.params['id']);
  }

}
