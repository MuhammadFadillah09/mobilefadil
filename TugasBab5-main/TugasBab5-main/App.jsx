import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';

import {Bookmark, Discover, Favorite, Home, Profile} from './src/screens';
import Setting from './src/screens/Setting';

export default function App() {
  return (
    <NavigationContainer>
     <Router/>
    </NavigationContainer>
  );
}

