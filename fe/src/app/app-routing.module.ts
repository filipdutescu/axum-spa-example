import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { JoinRoomComponent } from './join-room/join-room.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'home', component: HomeComponent },
    { path: 'join', component: JoinRoomComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
