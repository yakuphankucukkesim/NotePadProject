import { Text, StyleSheet, TouchableOpacity } from "react-native";

function StyleableButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default StyleableButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: 'black',
        fontSize: 16.5,
        fontWeight: 'normal',
        fontFamily: 'serif'
    }
})