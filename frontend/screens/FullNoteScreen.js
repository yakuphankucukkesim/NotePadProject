import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function FullNoteScreen({ route }) {
    const { note } = route.params;
    const navigation = useNavigation();

    const deleteNote = async () => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://10.0.2.2:5000/api/notes/${note._id}`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                Alert.alert('Note Deleted', 'The note has been deleted successfully.');
                                navigation.navigate('DisplayNotes');
                            } else {
                                console.error('Failed to delete note');
                            }
                        } catch (error) {
                            console.error('Error deleting note', error);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    }

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
            <View style={styles.noteView}>
                <Text style={styles.timeStamp}>{
                    new Date(note.createdAt)
                        .toLocaleDateString(undefined,
                            { year: "numeric", month: "long", day: "numeric", })}
                </Text>
                <Text style={styles.titleView}>{note.title}</Text>
                <Text style={styles.textView}>{note.text}</Text>
            </View>
            <View style={styles.buttons}>
                <View style={styles.deleteButtonView}>
                    <TouchableOpacity
                        onPress={deleteNote}
                    >
                        <AntDesign
                            name="delete"
                            size={50}
                            color="black"
                            style={{
                                shadowOpacity: 2,
                                textShadowRadius: 2,
                                textShadowOffset: { width: 2, height: 2 },
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.deleteText}>Delete</Text>
                </View>
                <View style={styles.editButtonView}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditNote', { note })}
                    >
                        <AntDesign
                            name="edit"
                            size={50}
                            color="black"
                            style={{
                                shadowOpacity: 2,
                                textShadowRadius: 2,
                                textShadowOffset: { width: 2, height: 2 },
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.editText}>Edit</Text>
                </View>
            </View>
        </View>
    );
}

export default FullNoteScreen;

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
    noteView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 150
    },
    titleView: {
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontSize: 33,
        margin: 50
    },
    textView: {
        fontFamily: 'serif',
        fontSize: 30
    },
    buttons: {
        margin: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deleteButtonView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteText: {
        fontSize: 15,
        fontFamily: 'serif',
    },
    editButtonView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editText: {
        fontSize: 15,
        fontFamily: 'serif'
    },
    timeStamp: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})