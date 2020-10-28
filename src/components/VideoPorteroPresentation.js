/**
 * presentational component - render data
 */
export const VideoPorteroPresentation = (props) => {

    const handleSubmission = (e) => {
        const selectedProvider = document.querySelector('input[name="providers-radio"]:checked').value;
        // console.log(`You selected ${selectedProvider}`)
        const data = { provider: selectedProvider.replace('choice-','')}
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
            </form>
            <span className="message">
                { props.total === 0
                        ? 'Seleccione sus preferencias para calcular importe'
                        : `Coste de su elección ${props.total} euros por vecino.`
                }
            </span>
        </div>
    )
}