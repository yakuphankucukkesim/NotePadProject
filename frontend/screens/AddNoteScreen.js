import { useState, useEffect } from "react";
import { TextInput, View, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import StyleableButton from "../components/StyleableButton";
import DialogInput from "react-native-dialog-input";

function AddNoteScreen() {
    const [noteTitle, setChangeTitle] = useState('');
    const [noteText, setChangeText] = useState('');
    const [noteCategory, setChangeCategory] = useState('');
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:5000/api/categories');
            setCategories(response.data.map(category => category.name));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

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

    const saveCategory = async (text) => {
        try {
            const response = await axios.post('http://10.0.2.2:5000/api/categories', {
                name: text,
            });
            setVisible(false)
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            Alert.alert('Error', 'An error occurred while saving the category');
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
        if (noteTitle === '' || noteText === '' || noteCategory === '') {
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
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Create a note {'\u270d'}</Text>
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
            <View style={styles.categoryContainer}>
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
                <View style={styles.categoryAdd}>
                    <DialogInput
                        isDialogVisible={visible}
                        title={'New category'}
                        message={'Enter a category name'}
                        hintInput={'Enter name'}
                        submitInput={(text) => saveCategory(text)}
                        closeDialog={() => setVisible(false)}
                    >
                    </DialogInput>
                    <StyleableButton
                        title='+'
                        onPress={() => setVisible(true)}
                    />
                </View>
            </View>
            <View style={styles.iconsAll}>
                <View style={styles.icons}>
                    <Ionicons
                        name="reload-circle-sharp"
                        size={70}
                        color="black"
                        onPress={deleteData}
                        style={{
                            shadowOpacity: 2,
                            textShadowRadius: 2,
                            textShadowOffset: { width: 2, height: 2 },
                        }}
                    />
                    <Text style={styles.addNoteTextView}>Discard</Text>
                </View>
                <View style={styles.icons}>
                    <Ionicons
                        name="documents"
                        size={70}
                        color="black"
                        onPress={() => navigation.navigate('DisplayNotes')}
                        style={{
                            shadowOpacity: 2,
                            textShadowRadius: 2,
                            textShadowOffset: { width: 2, height: 2 },
                        }}
                    />
                    <Text style={styles.addNoteTextView}>View Notes</Text>
                </View>
                <View style={styles.icons}>
                    <Ionicons
                        name="checkmark-circle"
                        size={70}
                        color="black"
                        onPress={alertSave}
                        style={{
                            shadowOpacity: 2,
                            textShadowRadius: 2,
                            textShadowOffset: { width: 2, height: 2 },
                        }}
                    />
                    <Text style={styles.addNoteTextView}>Save Note</Text>
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
    inputTitle: {
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        height: 50,
        margin: 15,
        top: 30,
        backgroundColor: '#e8e8e8',
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
        top: 30,
        textAlignVertical: 'top',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3
    },
    categorySelect: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -50,
    },
    buttonStyle: {
        width: 300,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3
    },
    buttonTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    rowStyle: {
        backgroundColor: 'white',
        borderBottomColor: '#c5c5c5'
    },
    rowTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    dropdownStyle: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    iconsAll: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 13,
        padding: 5,
        top: 70
    },
    icons: {
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNoteTextView: {
        fontFamily: 'serif',
        fontSize: 15
    },
    categoryAdd: {
        bottom: -50
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})