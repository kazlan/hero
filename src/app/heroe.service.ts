import { Injectable, OnInit } from '@angular/core';
import { DiceService } from './dice.service'

interface Heroe {
  nombre: string
  nivel: number
  exp: number
  inventario: string[]
  hp: number
  defeated: boolean
}

@Injectable()
export class HeroeService implements OnInit{

  private heroe:Heroe = {
    nombre: "Perseoh",
    nivel: 1,
    hp: 6,
    exp: 0,
    inventario: [],
    defeated: false
  }

  constructor(private dice: DiceService) {
  }
  ngOnInit(){
  }

  attack(){
    return this.dice.roll(1,6)*this.heroe.nivel
  }
  hurt(amount:number){
    this.heroe.hp -= amount
    if (this.heroe.hp < 1 ){
      this.heroe.hp = 0
      this.heroe.defeated = true
    }
  }
  exp(cantidad){
    this.heroe.exp += cantidad
    //check nivel
    if (this.heroe.exp >= this.heroe.nivel*2){
      this.heroe.nivel++
      this.heroe.exp = 0
      this.heroe.hp = this.heroe.nivel*6
    }
  }
  isDefeated(){
    return this.heroe.defeated
  }
  getHeroe(){
    return this.heroe
  }
  setHeroe(h:Heroe){
    this.heroe = h
  }

}
