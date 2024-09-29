import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreQuizComponent } from './components/explore-quiz/explore-quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { RulesComponent } from './components/rules/rules.component';
import { ScoreComponent } from './components/score/score.component';
import { HeroComponent } from './components/hero/hero.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { QuizHistoryComponent } from './components/quiz-history/quiz-history.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserResponseHistoryComponent } from './components/user-response-history/user-response-history.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    ExploreQuizComponent,
    QuestionComponent,
    RulesComponent,
    ScoreComponent,
    HeroComponent,
    TestimonialsComponent,
    QuizHistoryComponent,
    UserProfileComponent,
    UserResponseHistoryComponent,
    FeaturesComponent,
    FooterComponent,
    TutorialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
