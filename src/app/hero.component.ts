import { Component } from '@angular/core';
import { TownComponent } from './town'
import { AdventureComponent } from './adventure'

@Component({
  moduleId: module.id,
  selector: 'hero-app',
  templateUrl: 'hero.component.html',
  styleUrls: ['hero.component.css'],
  directives: [ TownComponent, AdventureComponent ]
})
export class HeroAppComponent {
  scene = 'adventure'
  onNewAdventure(){
    this.scene = "adventure"
  }
  onToTown(){
    this.scene = "town"
  }

}
