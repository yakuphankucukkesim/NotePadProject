import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import NotesScreen from './screens/NotesScreen';
import UsernameScreen from './screens/UsernameScreen';
import FullNoteScreen from './screens/FullNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';

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
          />
          <Stack.Screen
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='AddNote'
            component={AddNoteScreen}
          />
          <Stack.Screen
            name='DisplayNotes'
            component={NotesScreen}
          />
          <Stack.Screen
            name='FullNoteScreen'
            component={FullNoteScreen}
          />
          <Stack.Screen
            name='EditNote'
            component={EditNoteScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}