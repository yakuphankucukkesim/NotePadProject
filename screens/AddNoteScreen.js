import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from '@expo/vector-icons';

function AddNoteScreen() {
    const [noteTitle, setChangeTitle] = useState('');
    const [noteText, setChangeText] = useState('');

    const navigation = useNavigation();

    const saveNote = () => {
        setChangeTitle((title) => setChangeTitle(title));
        setChangeText((text) => setChangeText(text));
        console.log({ noteTitle })
        console.log({ noteText })
    }

    const deleteData = () => {
        console.log('Note deleted');
        setChangeTitle('');
        setChangeText('');
    }

    const alertSave = () => {
        saveNote();
        // Alert.alert('Successful',
        //     'Your note is saved! What would you like to do?', [
        //     {
        //         text: 'Go to home',
        //         onPress: () => navigation.navigate('Home'),
        //         style: 'cancel',
        //     },
        //     {
        //         text: 'Display notes',
        //         onPress: () => navigation.navigate('DisplayNotes'),
        //         style: 'cancel'
        //     },
        //     {
        //         text: 'Add another note',
        //         onPress: () => navigation.navigate('AddNote'),
        //         style: 'cancel'
        //     },
        // ])
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                >
                    <AntDesign name="leftcircle" size={40} color="black" />
                </TouchableOpacity>
                <Text style={styles.backText}>Back</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Create a note</Text>
            </View>
            <View>
                <TextInput
                    style={styles.inputTitle}
                    onChangeText={(title) => setChangeTitle(title)}
                    value={noteTitle}
                    placeholder='Title'
                    maxLength={50}
                />
            </View>
            <View>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => setChangeText(text)}
                    value={noteText}
                    placeholder='Note'
                    maxLength={500}
                    // multiline={true}
                    autoCorrect={false}
                />
            </View>
            <View style={styles.iconsAll}>
                <View style={styles.icons}>
                    <Ionicons
                        name="close-circle"
                        size={70}
                        color="black"
                        onPress={deleteData}
                    />
                </View>
                <View style={styles.icons}>
                    <Ionicons
                        name="documents"
                        size={70}
                        color="black"
                        onPress={() => navigation.navigate('DisplayNotes')}
                    />
                </View>
                <View style={styles.icons}>
                    <Ionicons
                        name="checkmark-circle"
                        size={70}
                        color="black"
                        onPress={alertSave}
                    />
                </View>
            </View>
        </View>
    );
}

export default AddNoteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    textStyle: {
        fontSize: 35,
        justifyContent: 'center',
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'serif'
    },
    backButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        top: -40,
        left: 14
    },
    backText: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'serif'
    },
    image: {
        width: 205,
        height: 170
    },
    inputTitle: {
        borderWidth: 2,
        borderColor: '#e8e8e8',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        height: 50,
        margin: 15,
        top: 30,
        backgroundColor: '#e8e8e8'
    },
    inputText: {
        borderWidth: 2,
        borderColor: '#e8e8e8',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        height: 300,
        margin: 15,
        top: 30,
        backgroundColor: '#e8e8e8'
    },
    iconsAll: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 13,
        padding: 5,
        top: 70
    },
    icons: {
        margin: 5,
        padding: 5,
    }
})