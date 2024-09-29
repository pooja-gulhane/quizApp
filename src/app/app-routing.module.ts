import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { ExploreQuizComponent } from './components/explore-quiz/explore-quiz.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';
import { RulesComponent } from './components/rules/rules.component';
import { ScoreComponent } from './components/score/score.component';
import { QuizHistoryComponent } from './components/quiz-history/quiz-history.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserResponseHistoryComponent } from './components/user-response-history/user-response-history.component';
import { AuthService } from './services/auth-service/auth.service';

export const guard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  // some auth logic
  return inject(AuthService).canActivate()
}

const routes: Routes = [
  {
    path: "home",
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
  },
  {
    path: 'quiz-history', 
    component: QuizHistoryComponent 
  },{
    path: 'profile',
    component: UserProfileComponent 
  },{
    path: 'user-response-history/:quizId/:userId'
    , component: UserResponseHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }