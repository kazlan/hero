import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DiceService } from '../dice.service'
import { HeroeService} from '../heroe.service'
import { HeroeState } from '../models/heroe.model'
import { Observable } from 'rxjs'


import { Store } from '@ngrx/store'

@Component({
  moduleId: module.id,
  selector: 'app-adventure',
  templateUrl: 'adventure.component.html',
  styleUrls: ['adventure.component.css'],
  providers: [DiceService, HeroeService]
})
export class AdventureComponent implements OnInit {
  success = false
  fail = false
  rounds:number = 5
  enemies:string[] = ['Bandits', 'Goblins', 'Kobolds', 'Orcs']
  enemy_kind:string = ''
  enemy = {
    name: '',
    hp: 0,
    level: 0,
    defeated: false,
    hurt: function(cant){
      this.hp -= cant
      if (this.hp < 1){
        this.defeated = true
      }
    }
  }
  public heroe:HeroeState
  constructor(private dice: DiceService, public hs: HeroeService,
               public store: Store<HeroeState>) {
    this.enemy_kind = this.enemies[dice.roll(1,4)-1]
    store.select('heroRed').subscribe((h:HeroeState)=> this.heroe = h)
  }

  ngOnInit() {
    this.success = this.fail = false
    this.spawn(this.enemy_kind)
  }
  @Output() onToTown = new EventEmitter<Boolean>()
  toTown(){
    this.onToTown.emit(true)
  }
  onAttack(){
    this.enemy.hurt(this.hs.attack())
    this.checkState()
  }
  private checkState(){
    //Mob muerto?
    if (this.enemy.defeated){
      //otorga exp
      this.store.dispatch({type:"ADD_EXP", payload: this.enemy.level })

      //era el ultimo?
      if (this.rounds == 1){
        this.success = true
      }else{
        //no lo era => pasa ronda y saca otro mob
        this.rounds --
        this.spawn(this.enemy_kind)
      }
    }else{
    // el mob devuelve el golpe
      this.store.dispatch({type: "HURT", payload: this.enemy.level})
      //miramos si nos ha matado
      if (this.heroe.hp <= 0 ){
        this.fail = true
      }else{
        // next round
      }
    }
  }
  // Helpers
  spawn(kind:String){
    this.enemy.name = this.enemy_kind
    this.enemy.level = this.dice.roll(1,this.heroe.lvl)
    this.enemy.hp = this.dice.roll(1,6) * this.enemy.level
  }

}
