import React, { Component } from 'react'
import { VideoPorteroPresentation } from '../components/VideoPorteroPresentation'

const NEIGHBOURS = 18
const iva = (n) => (n*1.21) 
const reparto = (n) => (n/NEIGHBOURS)

const PROVIDERS_FEES = {
    DatesSL: {
            basePrice: 2835,
            proximity: 110,
            key: 4,
            handsFree: 15
    },
    Abatronic: {
            basePrice: 2477.5,
            proximity: 0,
            key: 5,
            handsFree: 0,
    },
    Emitek: {
            basePrice: 2830.5,
            proximity: 180,
            key: 7.5,
            handsFree: 28.93,
    },
}

const PROVIDERS = Object.keys(PROVIDERS_FEES)



export class VideoPorteroContainer extends Component {
    state = {
        totalCom: 0,
        extraPerNeighbour: 0,
        totalPerNeighbour: 0
    }


    _updateState = (data) => {
        const provider = parseInt(data.provider)
        if (isNaN(provider)){
            //console.error('Select provider!')
            return
        }
        if (provider < 0 || provider > Object.keys(PROVIDERS_FEES).length){
            //console.error('Invalid option!')
            return
        }

        const baseCost = PROVIDERS_FEES[PROVIDERS[provider]].basePrice

        const handsFreeCost = data.hasHandFree ? PROVIDERS_FEES[PROVIDERS[provider]].handsFree : 0

        let keys = parseInt(data.keyNumber) || 0
        
        let totalCom, keysPrice = 0

        if (keys > 0) { // someone ones a proximity door opener!
            totalCom = baseCost + handsFreeCost + PROVIDERS_FEES[PROVIDERS[provider]].proximity
            if (PROVIDERS[provider] !== 'Emitek')
                    keysPrice = PROVIDERS_FEES[PROVIDERS[provider]].key * keys
            else { // emitek includes 2 proximity keys for free
                    keysPrice = keys > 2 
                                ? (keys - 2)*PROVIDERS_FEES[PROVIDERS[provider]].key
                                : 0
            }
        }
        else {
            totalCom = baseCost + handsFreeCost
        }

        console.log(`Precio base (sin iva): ${totalCom}`)
        console.log(`Precio manos libres (sin iva): ${handsFreeCost}`)
        console.log(`Precio de las llaves (sin iva): ${keysPrice}`)

        this.setState({ totalCom: iva(totalCom), 
                        extraPerNeighbour: iva(handsFreeCost+keysPrice), 
                        totalPerNeighbour: reparto(iva(totalCom+handsFreeCost)) })
        
    }

    render(){
        return(
            <div>
                <VideoPorteroPresentation 
                    dataHandler={this._updateState}
                    providers={PROVIDERS} 
                    totalCom = { this.state.totalCom }
                    extraNeig = {this.state.extraPerNeighbour}
                    totalNeig = {this.state.totalPerNeighbour} />
            </div>
        )
    }

}