import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";

import CategoryItem from "../components/CategoryItem";
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

function Home() {
    const route = useRoute()
    const user = route.params?.user

    const navigation = useNavigation();

    const categories = [
        { id: 'business', title: 'Business', icon: 'business' },
        { id: 'shopping', title: 'Shopping', icon: 'basket' },
        { id: 'personal', title: 'Personal', icon: 'person' },
        { id: 'education', title: 'Education', icon: 'school' },
    ];

    const renderCategoryItem = ({ item }) => (
        <CategoryItem
            title={item.title}
            onPress={() => navigation.navigate('AddNote')}
            icon={item.icon}
        />
    )

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FirstScreen')}
                >
                    <AntDesign name="leftcircle" size={40} color="black" />
                </TouchableOpacity>
                <Text style={styles.backText}>Back</Text>
            </View>
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>Welcome, {user}</Text>
            </View>
            <View>
                <Text style={styles.textStyle}>Create notes about any categories</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.smallTextStyle}>Just need to select a category</Text>
            </View>
            <View style={styles.categoriesContainer}>
                <FlatList
                    key={categories}
                    data={categories}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCategoryItem}
                    numColumns={2}
                />
            </View>
            <View style={styles.skipButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DisplayNotes')}
                >
                    <Text style={styles.skipText}>Skip to my notes</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

export default Home;

const styles = StyleSheet.create({
    categoriesContainer: {
        justifyContent: 'center',
        bottom: 100
    },
    backButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    }, backText: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'serif'
    },
    welcome: {
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
        fontSize: 17,
        justifyContent: 'center',
        fontFamily: 'sans-serif-light',
    },
    skipButton: {
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 20,
        padding: 10
    },
    skipText: {
        color: 'blue',
        fontSize: 16,
        fontFamily: 'serif'
    }
})