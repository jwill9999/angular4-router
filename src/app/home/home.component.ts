import { AuthServiceService } from './../services/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth: AuthServiceService) { }

  ngOnInit() {
  }

  onLoadServers(id: number)
{
  this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'})
}

login()
{
  this.auth.login();
}

logOut()
{
  this.auth.logOut();
}

}

// Here we see how we can add to our routes dynamic id queryPrams and fragment data to our url

//dummy login system for demonstration purposes only
