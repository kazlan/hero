import { ActionReducer, Action } from '@ngrx/store'
import { HeroeState } from './models/heroe.model'

let hero:HeroeState = {
    nombre: 'Perseoh_',
    lvl: 1,
    hp: 6,
    exp: 0
}

export const heroeReducer: ActionReducer<HeroeState> = (state:HeroeState = hero, action:Action):HeroeState=>{
    switch (action.type) {
        case "ATTACK":
        case "HEAL":
            // payload: cantidad a curar o MAX
            if (action.payload == "MAX"){
                return Object.assign({},state,{
                    hp: 6*state.lvl
                })
            }else{
                return Object.assign({}, state,{
                    hp: state.hp + action.payload
                })
            }
        case "HURT":    
            //payload: cantidad de hp a perder
            if (state.hp < action.payload){
                return  Object.assign({},state, {
                    hp: 0
                })
            }else {
                return  Object.assign({},state, {
                    hp: state.hp - action.payload
                })
            }
        case "ADD_EXP":
            let delta  = state.exp + action.payload - state.lvl*3
            if (delta > 0 ){
                //exp > tope
                return Object.assign({},state,{
                    exp: delta,
                    lvl: state.lvl+1,
                    hp: 6*(state.lvl+1)                    
                })
            }else{
                return Object.assign({},state,{
                    exp: state.exp + action.payload,
                })
            }
        default:
            return state
    }
}