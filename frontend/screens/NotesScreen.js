import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import DisplayItem from "../components/DisplayItem";

function NotesScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const url = "http://10.0.2.2:5000/api/notes"

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
    }, [])

    const categories = [...new Set(data.map(item => item.category))];

    const filteredData = selectedCategory
        ? data.filter(item => item.category === selectedCategory)
        : data;

    const searchFilterFunction = (text) => {
        setSearch(text);
        const newData = originalData.filter(
            function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        setData(newData);
    };

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
                <TextInput
                    style={styles.inputTitle}
                    placeholder='Search here..'
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.categories}>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.selectedCategoryButton
                            ]}
                            onPress={() => setSelectedCategory(category === selectedCategory ? null : category)}
                        >
                            <Text
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.selectedCategoryButtonText,
                                ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <FlatList
                    style={styles.notes}
                    data={filteredData}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <DisplayItem
                            key={item.id}
                            title={item.title}
                            text={item.text}
                            onPress={() => navigation.navigate('FullNoteScreen', { note: item })}
                        />
                    )}
                    numColumns={2}
                />
            </View>
        </View>
    );
}

export default NotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 100
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
        alignSelf: 'flex-start'
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
    notes: {
        top: 20,
        width: '100%',
        height: '100%'
    },
    page: {
        flex: 1,
        flexDirection: 'column'
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
        borderColor: '#ccc'
    },
    selectedCategoryButton: {
        backgroundColor: 'black',
        borderColor: 'grey'
    },
    categoryButtonText: {
        fontSize: 14,
        color: 'black'
    },
    selectedCategoryButtonText: {
        color: 'white'
    }
});