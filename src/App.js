import logo from './logo.svg';
import './App.css';
import {UseState} from "./use-state";
import {ClassState} from "./class-state";
import {UseReducer} from "./UseReducer";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="Use Reducer" />
    </div>
  );
}

export default App;
