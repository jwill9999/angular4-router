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
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment)
    this.route.queryParams.subscribe((queryParams: Params)=> {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    const id = +this.route.snapshot.params['id']
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params: Params) => {
      this.server.id = +params['id'];

    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route })
  }

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

