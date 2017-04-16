import { ServersService } from './../servers/servers.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

   interface Server {
      id: number,
      name: string,
      status: string
    }

@Injectable()
export class ServerResolverService implements Resolve<Server> {

  constructor(private serversService: ServersService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Server |
    Observable<Server> |
    Promise<Server> {

   return this.serversService.getServer(+route.params['id']);

  }
}

//Resolver takes the interface server object and maps it to a data model.
//We inject the servers service to get access to the getServer method.
//We then return to that service the activatedrouteSnapshot id via params
//and use the + to covert it to a number.
// remember to add this to providors
//remeber to add this to the route  resolve: {server: ServerResolverService}
//in onInit in server method add
//      this.route.data.subscribe((data:Data)=> {
//     this.server = data['server']
// the data['server'] must match the router key server in resolve

//See link in README.md file



