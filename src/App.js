import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={
        <>
          <Banner/>
          <Movies/>
        </>
        }/>
        <Route path = '/favourites' Component = {Favourite}/>
      </Routes>
      
    </Router>
  );
}

export default App;