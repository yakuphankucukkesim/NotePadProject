import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function FullNoteScreen({ route }) {
    const { note } = route.params;

    const navigation = useNavigation();

    const handleDeleteNote = async () => {
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
                                navigation.goBack();
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
                        <AntDesign
                            name="leftcircle"
                            size={40}
                            color="black"
                        />
                    </TouchableOpacity>
                    <Text style={styles.backText}>Back</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.titleContainer}>{note.title}</Text>
                <Text style={styles.textContainer}>{note.text}</Text>
            </View>
            <View style={styles.deleteButton}>
                <TouchableOpacity
                    onPress={handleDeleteNote}
                >
                    <AntDesign
                        name="delete"
                        size={50}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FullNoteScreen;

const styles = StyleSheet.create({
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 150
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 90
    },
    page: {
        flex: 1,
        flexDirection: 'column'
    },
    titleContainer: {
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontSize: 33,
        margin: 50
    },
    textContainer: {
        fontFamily: 'serif',
        fontSize: 30,

    },
    deleteButton: {
        margin: 50
    }
})