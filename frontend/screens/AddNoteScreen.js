import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";

function AddNoteScreen() {
    const [noteTitle, setChangeTitle] = useState('');
    const [noteText, setChangeText] = useState('');
    const [noteCategory, setChangeCategory] = useState('');

    const categories = ["Business", "Education", "Personal", "Shopping"];

    const navigation = useNavigation();

    const saveNote = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:5000/api/notes', {
                title: noteTitle,
                text: noteText,
                category: noteCategory
            });

            setChangeTitle('');
            setChangeText('');
            setChangeCategory('');

        } catch (error) {
            console.error('Error saving note:', error);
            Alert.alert('Error', 'An error occurred while saving the note');
        }
    }

    const deleteData = () => {
        if (noteTitle === '' || noteText === '') {
            Alert.alert('Error!', 'Title and text boxes are already blank!')
        } else {
            console.log('Note deleted');
            setChangeTitle('');
            setChangeText('');
        }
    }

    const alertSave = () => {
        if (noteTitle === '' || noteText === '') {
            Alert.alert('Error!', 'Title and text must be filled!')
        } else {
            saveNote();
            Alert.alert('Successful',
                'Your note is saved! What would you like to do?', [
                {
                    text: 'Go to home',
                    onPress: () => navigation.navigate('Home'),
                    style: 'cancel',
                },
                {
                    text: 'Display notes',
                    onPress: () => navigation.navigate('DisplayNotes'),
                    style: 'cancel'
                },
                {
                    text: 'Add another note',
                    onPress: () => navigation.navigate('AddNote'),
                    style: 'cancel'
                },
            ])
        }
    }

    return (
        <View style={styles.container}>
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
                    multiline={true}
                    blurOnSubmit={true}
                />
            </View>
            <View>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => setChangeText(text)}
                    value={noteText}
                    placeholder='Note'
                    maxLength={500}
                    multiline={true}
                    autoCorrect={false}
                    blurOnSubmit={true}
                />
            </View>
            <View style={styles.categorySelect}>
                <SelectDropdown
                    data={categories}
                    onSelect={(selectedCategory, index) => {
                        console.log(selectedCategory, index);
                        setChangeCategory(selectedCategory);
                    }}
                    defaultButtonText={'Select category'}
                    buttonTextAfterSelection={(selectedCategory, index) => {
                        return selectedCategory;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonTextStyle}
                    renderDropdownIcon={isOpened => {
                        return (
                            <FontAwesome
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={'black'}
                                size={18}
                            />
                        );
                    }}
                    dropdownIconPosition={'right'}
                    rowStyle={styles.rowStyle}
                    rowTextStyle={styles.rowTextStyle}
                />
            </View>
            <View style={styles.iconsAll}>
                <View style={styles.icons}>
                    <Ionicons
                        name="reload-circle-sharp"
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
        backgroundColor: '#e8e8e8',
        textAlignVertical: 'top'
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
        padding: 5
    },
    categorySelect: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -50
    },
    buttonStyle: {
        width: 300,
        height: 50,
        backgroundColor: '#e8e8e8',
        borderRadius: 8
    },
    buttonTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    dropdownStyle: {
        backgroundColor: 'black',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    rowStyle: {
        backgroundColor: '#e8e8e8',
        borderBottomColor: '#c5c5c5'
    },
    rowTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})