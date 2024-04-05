
import Map from './Map';
import Readings from './Readings';

const startingCoordinates = [22.1696, 91.4996];
const endingCoordinates = [22.2637, 91.7159];
const speed = 20; // kmph
const currentPosition = startingCoordinates;

function App() {
  return (
    <div className="App">
      <div className='readings'><Readings startingCoordinates={startingCoordinates} endingCoordinates={endingCoordinates} speed={speed} /></div>
      <div className='map'><Map startingCoordinates={startingCoordinates} endingCoordinates={endingCoordinates} currentPosition={currentPosition} /></div>
    </div>
  );
}

export default App;
