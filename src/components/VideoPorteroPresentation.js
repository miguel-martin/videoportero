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
        const keyNumber = document.querySelector('input[name="keys"]').value || 0

        const data = { 
            hasHandFree,
            keyNumber,
            provider
        }

        props.dataHandler(data)
    }

    const Providers = props.providers.map((provider, index) => {
        return (
            <div className="provider" key={`choice-${index}`}>
                <input  id={`choice-${index}`} 
                        name="providers-radio" 
                        onChange={ handleSubmission }
                        type="radio" 
                        value={`choice-${index}`}/>
                <label className="radio provider" key={`choice-${index}`} htmlFor={`choice-${index}`}>
                        {provider}
                </label> 
            </div>
        )
    })

    const showPrices = props.totalCom > 0
    console.log(props) // dev
    return (
        <div id="wrapper">
            <form id="videoportero" className="form">
                <fieldset className="field providers">
                        {Providers}
                        <div className="help flex-basis-100">Elija un proveedor de la lista superior</div>
                </fieldset> 
                <fieldset className="field">
                    <input name="freeHands" type="checkbox" onChange={ handleSubmission } />
                    <label htmlFor="freeHands">Manos libres</label>
                    <p className="flex-basis-100 help">¿Desea versión manos libres?</p>
                </fieldset>
                <fieldset className="field">
                    <input id="keys" name="keys" type="text" onChange={ handleSubmission } size="1" maxLength="1" value={props.keyNumber}/>
                    <label htmlFor="keys" >Llaves de proximidad</label>
                    <p className="help">¿Cuántas llaves de proximidad desea para su domicilio?</p>
                </fieldset>
            </form>
            <span className={`message notification is-light ${showPrices ? 'is-success' : 'is-warning'}`}>
                <h3 className="text-3">
                    { showPrices
                            ? 'Coste de su elección (IVA incluído)'
                            : 'Seleccione sus preferencias para calcular importe'
                    }
                </h3>
                <div className="cost-container" style={{display: showPrices ? 'flex' : 'none'}}>   
                    <div id="total-comunidad" className="cost" >
                        <span className="text-2">
                            {props.totalCom.toFixed(2)} €
                        </span>
                        <span className="text-1">Coste Comunidad</span>
                    </div>
                    <div id="extraVecino" className="cost">
                        <span className="text-2">
                            {props.extraNeig.toFixed(2)} €
                        </span>
                        <span className="text-1">Sus extras</span>
                    </div>
                    <div id="totalVecino" className="cost">
                        <span className="text-2">
                            {props.totalNeig.toFixed(2)} €
                        </span>
                        <span className="text-1">Su total</span>
                    </div>
                </div>
            </span>
            <article className="message is-warning is-light" style={{ display: props.alerts.length ? 'block': 'none'}}>
                <div className="message-header">
                    <p>Avisos</p>
                </div>
                <div className="message-body">
                    {
                        props.alerts.map((m,i) => (<p key={i} className="alert">{m}</p>))
                    }
                </div>
            </article>
        </div>
        
    )
}