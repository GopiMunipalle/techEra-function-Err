import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'

import Item from './components/Item'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={Item} />
  </Switch>
)

export default App
