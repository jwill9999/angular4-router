import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  errorMessage: string ="";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data)=> {
      this.errorMessage = data['errorMessage']
    })
  }

}
