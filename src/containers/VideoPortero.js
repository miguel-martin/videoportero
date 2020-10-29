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
            handsFree: 15,
            handsFreeDecor: 10,
    },
    Abatronic: {
            basePrice: 2477.5,
            proximity: 0,
            key: 5,
            handsFree: 0,
            handsFreeDecor: 0,
    },
    Emitek: {
            basePrice: 2830.5,
            proximity: 180,
            key: 7.5,
            handsFree: 28.93,
            handsFreeDecor: 12.4,
    },
}

const PROVIDERS = Object.keys(PROVIDERS_FEES)



export class VideoPorteroContainer extends Component {

    state = {
        keyNumber: 0,
        isHandFreeChecked: false,
        isHandFreeDecorChecked: false,
        totalCom: 0,
        extraPerNeighbour: 0,
        totalPerNeighbour: 0,
        alerts: []
    }

    _updateState = (data) => {
        console.log("Received data...",data)
        const provider = parseInt(data.provider)
        let keys = parseInt(data.keyNumber),
            alerts = [], 
            keysPrice = 0,
            totalCom

        if (isNaN(provider) || provider < 0 || provider > Object.keys(PROVIDERS_FEES).length){
            console.error('Invalid provider, or provider not selected!')
            this.setState({
                isHandFreeChecked: data.hasHandFree,
                isHandFreeDecorChecked: data.hasHandFreeDecor || PROVIDERS[provider] !== 'Abatronic',
                keyNumber: keys
            })
            console.log(this.state)
            return
        }

        const baseCost = PROVIDERS_FEES[PROVIDERS[provider]].basePrice
        const handsFreeCost = data.hasHandFree 
                                ? PROVIDERS_FEES[PROVIDERS[provider]].handsFree 
                                : 0
        const handsFreeDecorCost = data.hasHandFree && data.hasHandFreeDecor
                                    ? PROVIDERS_FEES[PROVIDERS[provider]].handsFreeDecor
                                    : 0

        if (PROVIDERS[provider] === 'Abatronic'){
            alerts.push('Abatronic incluye el portero manos libres en su presupuesto (con marco).')
        }

        if (keys > 0) { // someone wants a proximity door opener!
            totalCom = baseCost + PROVIDERS_FEES[PROVIDERS[provider]].proximity
            if (PROVIDERS[provider] !== 'Emitek'){
                keysPrice = PROVIDERS_FEES[PROVIDERS[provider]].key * keys
            }       
            else { // emitek includes 2 proximity keys for free
                    keysPrice = keys > 2 
                                ? (keys - 2)*PROVIDERS_FEES[PROVIDERS[provider]].key
                                : 0
                    alerts.push('La empresa Emitek incluye 2 llaveros por vecino en caso de instalar el servicio de proximidad.')
            }
        }
        else {
            totalCom = baseCost
        }
        
        this.setState({ alerts,
                        extraPerNeighbour: iva(handsFreeCost+handsFreeDecorCost+keysPrice), 
                        isHandFreeChecked: PROVIDERS[provider] === 'Abatronic' || data.hasHandFree,
                        isHandFreeDecorChecked: data.hasHandFree && data.hasHandFreeDecor || PROVIDERS[provider] === 'Abatronic',
                        keyNumber: (PROVIDERS[provider] === 'Emitek') && keys===1
                                    ? 2
                                    : keys,
                        totalCom: iva(totalCom), 
                        totalPerNeighbour: reparto(iva(totalCom+handsFreeCost)) 
                    })
        console.log(this.state)
        
    }

    render(){
        return(
            <div>
                <VideoPorteroPresentation 
                    alerts={this.state.alerts}
                    dataHandler={this._updateState}
                    handsFreeChecked = {this.state.isHandFreeChecked}
                    handsFreeDecorChecked = { this.state.isHandFreeChecked && this.state.isHandFreeDecorChecked }
                    showHandsFreeDecor = { this.state.isHandFreeChecked }
                    providers={PROVIDERS} 
                    totalCom = { this.state.totalCom }
                    extraNeig = {this.state.extraPerNeighbour}
                    totalNeig = {this.state.totalPerNeighbour} 
                    keyNumber = {this.state.keyNumber} />
            </div>
        )
    }

}