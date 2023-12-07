import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { decode, encode } from 'base-64';
import { firebase } from './src/firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { HomeScreen, LoginScreen, RegistrationScreen, ProductScreen, ListingScreen, SupplierScreen, OrderScreen } from './src/screens';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const auth = getAuth(firebase);
  const [user, setUser] = React.useState(null);

  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);


  if (loading) {
    return (
      <></>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Listing" component={ListingScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Supplier" component={SupplierScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}