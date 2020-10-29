import './sass/index.scss';

import { VideoPorteroContainer } from './containers/VideoPortero'

function App() {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title">Elección de videoportero</h1>
          <h2 className="subtitle">
            Rellene sus preferencias y calcule el importe.
          </h2>
        </div>
      </section>
      <section className="section" style={{marginTop: '0', paddingTop: '0'}}>
        <VideoPorteroContainer />
      </section>
    </div>
  );
}

export default App;
