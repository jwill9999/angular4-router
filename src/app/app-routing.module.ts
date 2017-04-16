import { ServerResolverService } from './services/server-resolver.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CanDeactivateGuard } from './services/canDeactivate-guard.service';
import { CanDeactivate } from '@angular/router/router';
import { AuthGuardService } from './services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  {
    path: "", component: HomeComponent, pathMatch: 'full'
  },
  {
    path: "users", component: UsersComponent, children: [
      {
        path: ":id/:name", component: UserComponent
      },
    ]
  },
  {
    path: "servers", canActivateChild: [AuthGuardService], component: ServersComponent, children: [
      {
        path: ":id", component: ServerComponent, resolve: {server: ServerResolverService}
      },
      {
        path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  // {
  //   path: '404-NotFound', component: PageNotFoundComponent
  // },
  {
      path: "404-NotFound", component: ErrorMessageComponent, data: {errorMessage: "404 Error on this page"}
  },
  {
    path: '**', redirectTo: '404-NotFound'
  }
]


@NgModule({
      imports: [
        //RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
      ],
      exports: [
        RouterModule
      ]
})


export class AppRoutingModule {}


// Here we add all our routes and of course bring in the imports
// Remember to import RouterModule and export it through app.modules exports section
// where you declare this class
// NB... canActivateChild: [AuthGuardService] and canDeactivate: [CanDeactivateGuard] these are
// services which set up checks for auth-guard and deactivate before saving
//useHash is an option in older browser. Not a recommened feature unless issues with //server
