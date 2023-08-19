import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AntDesign } from '@expo/vector-icons';

function UsernameScreen() {
    const [user, setUsername] = useState('');

    const onChangeTextHandler = text => {
        setUsername(text);
    }

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../images/notetakingillustration.png')}
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={styles.textContainer}>Welcome! What is your name?</Text>
            </View>
            <View>
                <TextInput
                    style={styles.usernameInput}
                    onChangeText={onChangeTextHandler}
                    value={user}
                    placeholder='Enter your name'
                    maxLength={15}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home', { user })}
                >
                    <AntDesign
                        name="rightcircle"
                        size={80}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default UsernameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    imageContainer: {
        padding: 50,
        margin: 40
    },
    image: {
        width: 256,
        height: 253
    },
    textContainer: {
        fontSize: 25,
        fontWeight: '500',
        fontFamily: 'serif'
    },
    usernameInput: {
        padding: 12,
        margin: 30,
        borderWidth: 2,
        borderColor: '#e8e8e8',
        borderRadius: 8,
        width: 370,
        height: 50,
        fontSize: 17,
        backgroundColor: '#e8e8e8'
    },
})