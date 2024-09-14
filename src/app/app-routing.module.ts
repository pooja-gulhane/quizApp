import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreQuizComponent } from './components/explore-quiz/explore-quiz.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';
import { RulesComponent } from './components/rules/rules.component';
import { ScoreComponent } from './components/score/score.component';


const routes: Routes = [
  {
    path: "",
    component:HomeComponent
  },
  {
    path: "signin",
    component:SignInComponent
  },
  {
    path: "signup",
    component:SignUpComponent
  },
  {
    path:"explore-quiz",
    component:ExploreQuizComponent
  },
  {
    path: 'quiz/rules/:quizId', 
    component: RulesComponent 
  },
  {
    path:"quiz/questions/:quizId",
    component:QuestionComponent
  },
  {
    path:"score/:quizId",
    component:ScoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }