import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          message: 'From home, through route params',
        })}
      />
    </View>
  );
}

function DetailsScreen({ navigation, route }) {

  const { message } = route.params;

  const [troplol, setTroplol] = useState('lol');

  const tunnel = 'https://992c-81-185-170-106.ngrok.io';

  useEffect(() => {
    fetch(tunnel + '/api/article/1', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + 'pB1RPbSgJDSGPRqXlnn9g8Q4zHQws8EKu9ABgX0e',
      }
    })
      .then((response) => response.json())
      .then((json) => setTroplol(json.title))
      .catch((error) => console.error(error))
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Text>here</Text>
      <Text>{troplol}</Text>

      <Text>{message}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: "Overview"
          }}
        />

        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          opstions ={{
            title: "Details"
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;