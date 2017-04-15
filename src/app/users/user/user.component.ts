import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }


//snapshot and params used in dynamic routes

  ngOnInit() {
    //this is ok for external links
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    //if loaded within component this is needed
    this.route.params.subscribe((params:Params) => {
            this.user.id = params['id'];
            this.user.name = params['name'];
    })
  }

}
