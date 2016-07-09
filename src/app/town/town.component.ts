import { Component, Output, EventEmitter } from '@angular/core';
import { HeroeService } from '../heroe.service'
import { DiceService } from '../dice.service'

import { HeroeState } from '../models/heroe.model'
import { Store } from '@ngrx/store'

@Component({
  moduleId: module.id,
  selector: 'app-town',
  templateUrl: 'town.component.html',
  styleUrls: ['town.component.css'],
  providers: [DiceService,HeroeService]
})
export class TownComponent{
  public heroe
  @Output() onNewAdventure = new EventEmitter<Boolean>()
  constructor(public hs: HeroeService, public store:Store<any>) {
    store.select('heroRed').subscribe(h=>this.heroe=h)
  }
  new_adventure(){
    this.onNewAdventure.emit(true)
  }
  rest(){
    this.store.dispatch({type:'HEAL', payload: 'MAX' })
  }
}
