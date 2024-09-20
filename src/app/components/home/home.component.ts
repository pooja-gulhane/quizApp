import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FeaturesComponent } from '../features/features.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  heroComponent = HeroComponent;
  testimonialsComponent = TestimonialsComponent;
  features = FeaturesComponent;
  footer = FooterComponent;
}
