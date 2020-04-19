import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import NoteScreen from './screens/NoteScreen';
import NotesScreen from './screens/NotesScreen';
import InfoScreen from './screens/Info';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => {
            return {
              headerTitleAlign: 'center',
              headerRightContainerStyle: {
                marginRight: 10
              },
              headerRight: () => {
                return (
                  <Button
                    onPress={() => {
                      navigation.navigate('Info');
                    }}
                    title="Info"
                  />
                );
              }
            };
          }}
          initialRouteName="Notes">
          <Stack.Screen name="Notes" component={NotesScreen} />
          <Stack.Screen name="Note" component={NoteScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
