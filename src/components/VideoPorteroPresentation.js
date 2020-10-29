import React from 'react'

/**
 * Presentational component. Renders the form.
 */
export const VideoPorteroPresentation = (props) => {

    const handleSubmission = (e) => {
        const provider = document.querySelector('input[name="providers-radio"]:checked')
                                    ? document.querySelector('input[name="providers-radio"]:checked').value.replace('choice-','')
                                    : null

        const hasHandFree = document.querySelector('input[name="freeHands"]').checked
        const keyNumber = document.querySelector('input[name="keys"]').value
        //console.log(`You selected ${selectedProvider}`)
        //console.log(hasHandFree)
        //console.log(keyNumber)
        const data = { 
            hasHandFree,
            keyNumber,
            provider
        }

        props.dataHandler(data)
    }

    const Providers = props.providers.map((provider, index) => {
        return (
            <div className="provider">
                <label className="radio provider" key={`choice-${index}`} htmlFor={`choice-${index}`}>
                        {provider}
                </label> 
                <input  id={`choice-${index}`} 
                        name="providers-radio" 
                        onChange={ handleSubmission }
                        type="radio" 
                        value={`choice-${index}`}/>
            </div>
        )
    })

    return (
        <div id="wrapper">
            <form id="videoportero" className="form">
                <fieldset className="field providers">
                        {Providers}
                </fieldset>
                <fieldset className="field">
                    <input name="freeHands" type="checkbox" onChange={ handleSubmission } />
                    <label htmlFor="freeHands">Manos libres</label>
                    <p className="help">¿Desea versión manos libres?</p>
                </fieldset>
                <fieldset className="field">
                    <input name="keys" type="text" onChange={ handleSubmission } size="1" maxLength="1" />
                    <label htmlFor="keys" >Llaves de proximidad</label>
                    <p className="help">¿Cuántas llaves de proximidad desea para su domicilio?</p>
                </fieldset>
            </form>
            <span className={`message notification is-light ${props.total === 0 ? 'is-warning' : 'is-success'}`}>
                { props.total === 0
                        ? 'Seleccione sus preferencias para calcular importe'
                        : 'Coste de su elección'
                }
                <br />
                <span className="cost" style={{display: props.total === 0 ? 'none' : 'block'}}>{props.total.toFixed(2)} €</span>
            </span>
        </div>
    )
}