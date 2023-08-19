import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

function Home() {
    const route = useRoute()
    const user = route.params?.user
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircle" size={40} color="black" />
                </TouchableOpacity>
                <Text style={styles.backText}>Back</Text>
            </View>
            <View>
                <Text style={styles.welcomeText}>Welcome, {user}</Text>
            </View>
            <View>
                <Text style={styles.textStyle}>Create notes about any categories</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.smallTextStyle}>Just need to select a category</Text>
            </View>
            <View style={styles.skipButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DisplayNotes')}
                >
                    <Text style={styles.skipText}>Skip to my notes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddNote')}
                >
                    <MaterialIcons
                        name="note-add"
                        size={60}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View >
    );
}

export default Home;

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    backText: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'serif'
    },
    welcomeText: {
        fontSize: 35,
        fontFamily: 'serif',
        fontWeight: '800',
        textAlign: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        bottom: 60
    },
    container: {
        flex: 1,
        margin: 14,
        justifyContent: 'space-evenly'
    },
    textStyle: {
        fontSize: 25,
        justifyContent: 'center',
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'serif'
    },
    smallTextStyle: {
        fontSize: 17,
        justifyContent: 'center',
        fontFamily: 'sans-serif-light'
    },
    skipButton: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    skipText: {
        color: 'blue',
        fontSize: 16,
        fontFamily: 'serif'
    }
})