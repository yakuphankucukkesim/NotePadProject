import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import DisplayItem from "../components/DisplayItem";

function NotesScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    const url = "http://10.0.2.2:5000/api/notes"
    const categoriesUrl = "http://10.0.2.2:5000/api/categories"

    const fetchData = () => {
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                setData(json);
                setOriginalData(json);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, [data])

    const fetchCategories = () => {
        fetch(categoriesUrl)
            .then(response => response.json())
            .then(json => setCategories(json))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const uniqueCategoriesFromData = [...new Set(data.map(item => item.category))];
    const uniqueCategoriesFromApi = categories.map(cat => cat.name);
    const allCategories = [...uniqueCategoriesFromData, ...uniqueCategoriesFromApi];
    const filteredCategories = [...new Set(allCategories)];

    const categoryButtons = (
        <ScrollView
            horizontal={true}
            contentContainerStyle={styles.categoryButtonsContainer}
            showsHorizontalScrollIndicator={false}
        >
            {filteredCategories.map(category => (
                <TouchableOpacity
                    key={category}
                    style={[
                        styles.categoryButton,
                        selectedCategory === category && styles.selectedCategoryButton
                    ]}
                    onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}

                >
                    <Text
                        style={[
                            styles.categoryButtonText,
                            selectedCategory === category && styles.selectedCategoryButtonText,
                        ]}
                    >
                        {category}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const filteredData = selectedCategory
        ? data.filter(item => item.category === selectedCategory)
        : data;

    const searchFilterFunction = (text) => {
        setSearch(text);
        const newData = originalData.filter(
            function (item) {
                const itemData = item.title && item.text
                    ? item.title.toUpperCase() + ' ' + item.text.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        setSearchedData(newData);
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
                <TextInput
                    style={styles.inputTitle}
                    placeholder='Search here..'
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.categories}>
                    {categoryButtons}
                </View>
                <FlatList
                    style={styles.notes}
                    data={search ? searchedData : filteredData}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <DisplayItem
                            key={item.id}
                            title={item.title}
                            text={item.text}
                            timestamp={
                                new Date(item.createdAt)
                                    .toLocaleDateString(undefined,
                                        { year: "numeric", month: "long", day: "numeric" })}
                            onPress={() => navigation.navigate('FullNoteScreen', { note: item })}
                        />
                    )}
                    numColumns={2}
                />
            </View>
            <View style={styles.addNoteButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddNote')}
                >
                    <MaterialIcons
                        name="note-add"
                        size={60}
                        color="black"
                        style={{
                            shadowOpacity: 2,
                            textShadowRadius: 2,
                            textShadowOffset: { width: 2, height: 2 },
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.addNoteTextView}>Add Note</Text>
            </View>
        </View>
    );
}

export default NotesScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 100
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 90
    },
    backButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    backText: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'serif'
    },
    inputTitle: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        height: 50,
        margin: 15,
        width: 250,
        top: -18,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3
    },
    notes: {
        top: 20,
        width: '100%',
        height: '100%'
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3
    },
    selectedCategoryButton: {
        backgroundColor: '#e8e8e8',
        borderColor: 'grey'
    },
    categoryButtonText: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'serif'
    },
    selectedCategoryButtonText: {
        color: 'black',
        fontFamily: 'serif'
    },
    addNoteButton: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNoteTextView: {
        fontFamily: 'serif',
        fontSize: 15
    },
    scrollView: {

    }
});