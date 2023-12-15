import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CounterComponent} from "./counter/counter.component";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    title: 'ПУКИШ'
  },
  {
    path: 'counter',
    component: CounterComponent,
    title: 'ТАЙМЕР'
  }
];
