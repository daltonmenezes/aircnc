import  { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login'
import List from './pages/List'
import Book from './pages/Book'

export default createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Book
  })
)
