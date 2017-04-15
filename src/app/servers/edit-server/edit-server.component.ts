import { Observable } from 'rxjs/Observable';
import { CanDeactivate } from '@angular/router/router';
import { CanComponentDeactivate } from './../../services/canDeactivate-guard.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  allowEdit: boolean = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false; });

    const id = +this.route.snapshot.params['id']

    this.server = this.serversService.getServer(id);

    this.route.params.subscribe((params: Params) => {
      this.server.id = +params['id'];});

    this.serverName = this.server.name;

    this.serverStatus = this.server.status;

  }

  //update server data
  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route })
  }


  // guard to check if data is saved first prior to exit
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.server.name !== this.serverName || this.serverStatus !== this.server.status) &&
      !this.changesSaved) {
      return confirm('Do you wish to leave the page before saving?');
    }
    else {
      return true;
    }
  };
}


// CanDeactivate uses an Observable. It checks if user can edit or not and if not just returns true and exits.
// if the user has changed the server name or status it alerts user before redirecting page.
// user can exit or continue to save changes first.

// onInit checks and updates the + converts string to number type.
