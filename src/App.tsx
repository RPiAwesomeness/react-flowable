import { ReactElement } from 'react';

import { ReactFlowProvider } from 'reactflow';

import './App.css';
import './ReactFlowOverrides.css';
import Modeler from './components/Modeler';

function App(): ReactElement {
  return (
    <div className="App">
      <ReactFlowProvider>
        <Modeler />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
