import { Injectable } from '@angular/core';

@Injectable()
export class DiceService {

  constructor() {}

  roll(number, sides){
    return Array(number).fill(0)
      .reduce(
        (acc,x)=>{
          return acc+Math.ceil(Math.random()*sides);
        }
      ,0)
  }

}
