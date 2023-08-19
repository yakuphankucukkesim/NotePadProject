import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import NotesScreen from './screens/NotesScreen';
// import Header from './components/Header';
import UsernameScreen from './screens/UsernameScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='FirstScreen'
            component={UsernameScreen}
            // options={{
            //   headerTitle: () => <Header name='Welcome to NotePad!' />,
            //   headerStyle: {
            //     backgroundColor: 'white',
            //   },
            //   headerTitleAlign: 'center'
            // }}
          />
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            // options={{
            //   headerTitle: () => <Header name='Welcome, ' />,
            //   headerStyle: {
            //     backgroundColor: 'white',
            //   },
            //   headerTitleAlign: 'center'
            // }}
          />
          <Stack.Screen
            name='AddNote'
            component={AddNoteScreen}
            // options={{
            //   headerTitle: () => <Header name='New note' />,
            //   headerStyle: {
            //     backgroundColor: 'white',
            //   },
            //   headerTitleAlign: 'center'
            // }}
          />
          <Stack.Screen
            name='DisplayNotes'
            component={NotesScreen}
            // options={{
            //   headerTitle: () => <Header name='Notes' />,
            //   headerStyle: {
            //     backgroundColor: 'white',
            //   },
            //   headerTitleAlign: 'center'
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}