import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

function NotesScreen() {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.header}>
                <View style={styles.backButton}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddNote')}
                    >
                        <AntDesign name="leftcircle" size={40} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.backText}>Back</Text>
                </View>
                <TextInput
                    style={styles.inputTitle}
                    placeholder='Search here..'
                />
            </View>
            <View style={styles.container}>
                <View>
                    <Text>View Notes Screen</Text>
                </View>
            </View>
        </>
    );
}

export default NotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputTitle: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        height: 50,
        margin: 15,
        width: 250,
        top: -18
    },
    backButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    backText: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'serif'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 90,
    }
})