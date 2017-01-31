import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { QuizesComponent } from './quizes/quizes.component'
import { AddQuizComponent } from './quizes/add-quiz.component';
import { ResultComponent } from './result/result.component';

import { DataService } from './services/data.service';

import { ToastComponent } from './shared/toast/toast.component';

const routing = RouterModule.forRoot([
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'quizes', component: QuizesComponent },
  { path: 'quizes/add', component: AddQuizComponent },
  { path: 'result', component: ResultComponent }
]);


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    GameComponent,
    QuizesComponent,
    AddQuizComponent,
    ResultComponent,
    ToastComponent
  ],
  providers: [
    DataService,
    ToastComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
