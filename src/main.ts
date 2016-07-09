import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store'
import { HeroAppComponent, environment } from './app/';

import { heroeReducer } from './app/reducers'

if (environment.production) {
  enableProdMode();
}

bootstrap(HeroAppComponent, [
  provideStore({
    heroRed: heroeReducer
  })
]);
