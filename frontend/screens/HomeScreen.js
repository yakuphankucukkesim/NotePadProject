import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import StyleableButton from "../components/StyleableButton";

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
                    <Ionicons
                        name="arrow-back"
                        size={40}
                        color="black"
                        style={{
                            shadowOpacity: 2,
                            textShadowRadius: 2,
                            textShadowOffset: { width: 2, height: 2 },
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.backText}>Back</Text>
            </View>
            <View>
                <Text style={styles.welcomeText}>Welcome, {user}</Text>
            </View>
            <View>
                <Text style={styles.textStyle}>Create notes about work, education, shopping and personal categories</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.smallTextStyle}>What would you like to do?</Text>
            </View>
            <View style={styles.buttonView}>
                <StyleableButton
                    title="Skip to my notes >>"
                    onPress={() => navigation.navigate('DisplayNotes')}
                />
                <StyleableButton
                    title="Add note +"
                    onPress={() => navigation.navigate('AddNote')}
                />
            </View>
        </View >
    );
}

export default Home;

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderColor: '#ccc',
        alignItems: 'center',
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
        fontSize: 20,
        justifyContent: 'center',
        fontFamily: 'sans-serif-light'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    addNoteButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNoteTextView: {
        fontFamily: 'serif',
        fontSize: 15
    }
})