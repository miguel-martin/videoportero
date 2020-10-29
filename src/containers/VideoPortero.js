import React, { Component } from 'react'
import { VideoPorteroPresentation } from '../components/VideoPorteroPresentation'

const NEIGHBOURS = 18

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
            proximity: 0,
            key: 4.1322,
            handsFree: 28.93,
    },
}

const PROVIDERS = Object.keys(PROVIDERS_FEES)

const iva = (n) => (n*1.21) 
const reparto = (n) => (n/NEIGHBOURS)

export class VideoPorteroContainer extends Component {
    state = {
        //keys: 0,            //  number of proximity keys
        //provider: null,       
        //proximity: false,
        total: 0,
    }


    _updateState = (data) => {
        const provider = parseInt(data.provider)
        const baseCost = PROVIDERS_FEES[PROVIDERS[provider]].basePrice
        const handsFreeCost = data.hasHandFree ? PROVIDERS_FEES[PROVIDERS[provider]].handsFree : 0
        let keys = 0
        try {
            keys = (PROVIDERS[provider] === 'Emitek') && (parseInt(data.keyNumber) === 1) // same price with 1 or 2 keys!
                     ? 2
                     : parseInt(data.keyNumber)
        }
        catch {
            console.error("Number of keys not set!")
            keys = 0
        }
        
        const proximityCost = keys * PROVIDERS_FEES[PROVIDERS[provider]].key
        console.log(`Provider ${PROVIDERS[provider]}. Base cost: ${baseCost}. handsFreeCost: ${handsFreeCost}. proximityCost: ${proximityCost}. keys=${keys}`)
        const proximityExtraCost = proximityCost > 0 ? PROVIDERS_FEES[PROVIDERS[provider]].proximity : 0
        const total = reparto(iva(baseCost)) + iva(handsFreeCost) + iva(proximityCost) + reparto(iva(proximityExtraCost))

        this.setState({ total })
        
    }

    render(){
        return(
            <div>
                <VideoPorteroPresentation 
                    dataHandler={this._updateState}
                    providers={PROVIDERS} 
                    total = { this.state.total }/>
            </div>
        )
    }

}