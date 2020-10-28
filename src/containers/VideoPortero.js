import React, { Component } from 'react'
import { VideoPorteroPresentation } from '../components/VideoPorteroPresentation'

const VECINOS = 18

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
const reparto = (n) => (n/VECINOS)

export class VideoPorteroContainer extends Component {
    state = {
        keys: 0,            //  number of proximity keys
        provider: null,       
        proximity: false,
        total: 0,
    }


    _updateState = (data) => {
        const provider = data.provider
        console.log("Selected provider: ", PROVIDERS[provider])
        this.setState( { provider: PROVIDERS[provider] })

        switch(parseInt(provider)){
            case 0: // Dates SL
                this.setState({ total: reparto(iva(2835)) })
                break;
            case 1: // Abatronic
                this.setState({ total: reparto(iva(2477.5)) })
                break
            case 2: // Emitek
                this.setState({ total: reparto(iva(2830)) })
                break
            default:
                this.setState({ total: 0 })
        }
        
    }

    render(){
        console.log("render", this.state)
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