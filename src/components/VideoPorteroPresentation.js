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
            <div className="provider" key={`provider-${index}`}>
                <input type="radio" name="providers-radio" value={`choice-${index}`} id={`choice-${index}`} onChange={ handleSubmission }/>
                <label htmlFor={`choice-${index}`}>{provider}</label>
            </div>   
        )
    })

    return (
        <div id="wrapper">

            <form id="videoportero" className="form">
                <fieldset className="fieldset">
                    {Providers}
                </fieldset>
                <fieldset className="fieldset">
                    <input name="freeHands" type="checkbox" onChange={ handleSubmission } />
                    <label htmlFor="freeHands">Manos libres</label>
                </fieldset>
                <fieldset className="fieldset">
                    <input name="keys" type="text" onChange={ handleSubmission } />
                    <label htmlFor="keys">Llaves de proximidad</label>
                </fieldset>
            </form>
            <span className="message">
                { props.total === 0
                        ? 'Seleccione sus preferencias para calcular importe'
                        : `Coste de su elección: ${props.total} euros por vecino.`
                }
            </span>
        </div>
    )
}