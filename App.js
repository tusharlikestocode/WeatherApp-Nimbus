import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import S1 from './screens/S1';
import S2 from './screens/S2';
import S3 from './screens/S3';
import { Provider } from 'react-redux';
import {store,persistor} from './store/store'
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Nimbus" component={S1} 
      screenOptions={() => ({
        tabBarShowLabel: false,
    })}/>
    <Tab.Screen name="Convert" component={S3} />
  </Tab.Navigator>
);

const Stacks = ()=>{
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
  <Stack.Screen name="Screen1" component={S1}  />
  <Stack.Screen name="Screen2" component={S2} />
 </Stack.Navigator>

  );
}

const App = () => (

          <NavigationContainer>
          <Tabs/>        
          </NavigationContainer>
);

export default () => {
  return (
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <App />
            </PersistGate>
    </Provider>
  );
};
