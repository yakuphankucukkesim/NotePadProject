import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const EditNoteScreen = ({ route, navigation }) => {

    const { note } = route.params;
    const [editedNote, setEditedNote] = useState({ ...note });

    const updateNote = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:5000/api/notes/${editedNote._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedNote),
            });

            if (response.ok) {
                navigation.navigate('DisplayNotes');
            } else {
                console.error('Failed to update note');
            }
        } catch (error) {
            console.error('Error updating note', error);
        }
    };

    return (
        <View style={styles.page}>
            <View style={styles.header}>
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
            </View>
            <View style={styles.updateContainer}>
                <View style={styles.titleText}>
                    <Text style={styles.titleTextView}>Title</Text>
                </View>
                <TextInput
                    style={styles.inputTitle}
                    value={editedNote.title}
                    maxLength={50}
                    multiline={true}
                    blurOnSubmit={true}
                    onChangeText={(title) => setEditedNote({ ...editedNote, title })}
                />
                <View style={styles.titleText}>
                    <Text style={styles.titleTextView}>Text</Text>
                </View>
                <TextInput
                    style={styles.inputText}
                    value={editedNote.text}
                    maxLength={500}
                    multiline={true}
                    blurOnSubmit={true}
                    onChangeText={(text) => setEditedNote({ ...editedNote, text })}
                />
                <View style={styles.updateButton}>
                    <TouchableOpacity
                        onPress={updateNote}
                    >
                        <MaterialIcons
                            name="update"
                            size={70}
                            color="black"
                            style={{
                                shadowOpacity: 2,
                                textShadowRadius: 2,
                                textShadowOffset: { width: 2, height: 2 },
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.addNoteTextView}>Update</Text>
                </View>
            </View>
        </View>
    );
};

export default EditNoteScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 90
    },
    backButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        left: -150
    },
    backText: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'serif'
    },
    updateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 70
    },
    titleText: {
        left: -150
    },
    titleTextView: {
        fontFamily: 'serif',
        fontSize: 20
    },
    inputTitle: {
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        height: 50,
        width: 380,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3
    },
    inputText: {
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        height: 300,
        margin: 15,
        width: 380,
        textAlignVertical: 'top',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3
    },
    updateButton: {
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNoteTextView: {
        fontFamily: 'serif',
        fontSize: 15
    }
});