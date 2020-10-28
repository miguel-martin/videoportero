import React, { Component } from 'react'
import { VideoPorteroPresentation } from '../components/VideoPorteroPresentation'

const PROVIDERS = ['Dates SL', 'Abatronic', 'Emitek']

export class VideoPorteroContainer extends Component {
    state = {
        keys: 0,            //  number of proximity keys
        provider: null,       
        proximity: false,
        total: 0,
    }

    _iva = (n) => (n*1.21) 


    _updateState = (data) => {
        const provider = data.provider
        console.log("Selected provider: ", PROVIDERS[provider])
        this.setState( { provider: PROVIDERS[provider] })
        
        switch(parseInt(provider)){
            case 0: // Dates SL
                this.setState({ total: this._iva(2835) })
                break;
            case 1: // Abatronic
                this.setState({ total: this._iva(2477.5) })
                break
            case 2: // Emitek
                this.setState({ total: this._iva(2830) })
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