
import {  Navigate } from 'react-router-dom'
import {HomePage} from '../views/main/homePage'
import {AboutPage} from '../views/main/aboutPage'


const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  }
];

export default routes;