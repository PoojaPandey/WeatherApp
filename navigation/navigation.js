import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from 'react-native';
const Stack = createNativeStackNavigator();
import {useDispatch, useSelector} from 'react-redux';

import Login from '../components/login/login';
import Dashboard from '../components/forecast/forecast';
import * as Constant from '../utils/constant';
import {getUser} from '../action/auth';

const AuthStack = () => (
  <Stack.Navigator initialRouteName={Constant.LOGIN_SCREEN}>
    <Stack.Screen
      name={Constant.LOGIN_SCREEN}
      component={Login}
      options={({title: Constant.LOGIN_SCREEN}, {headerShown: false})}
    />
    <Stack.Screen
      name={Constant.DASHBOARD_SCREEN}
      component={Dashboard}
      options={
        ({
          title: Constant.DASHBOARD_SCREEN,
          headerTitleStyle: {
            color: '#fff',
          },
        },
        {
          headerStyle: {
            backgroundColor: 'black',
          },
          headerBackVisible: false,
          headerRight: () => <Button title="Logout" />,
        })
      }
    />
  </Stack.Navigator>
);

const AuthStackIfLoggedIn = () => (
  <Stack.Navigator initialRouteName={Constant.DASHBOARD_SCREEN}>
    <Stack.Screen
      name={Constant.LOGIN_SCREEN}
      component={Login}
      options={({title: Constant.LOGIN_SCREEN}, {headerShown: false})}
    />
    <Stack.Screen
      name={Constant.DASHBOARD_SCREEN}
      component={Dashboard}
      options={
        ({
          title: Constant.DASHBOARD_SCREEN,
          headerTitleStyle: {
            color: 'white',
          },
        },
        {
          headerStyle: {
            backgroundColor: 'black',
          },
          headerBackVisible: false,
          headerRight: () => <Button title="Logout" />,
        })
      }
    />
  </Stack.Navigator>
);
const Navigation = () => {
  const reducer = useSelector(state => state);
  const {auth} = reducer;
  const {user} = auth;

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(getUser());
  };

  useEffect(() => {
    init();
  }, [user]);

  return (
    <NavigationContainer>
      {user === null ? <AuthStack /> : <AuthStackIfLoggedIn />}
    </NavigationContainer>
  );
};
export default Navigation;
