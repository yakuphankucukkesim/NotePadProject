import { Text, StyleSheet, TouchableHighlight } from "react-native";

function StyleableButton({ title, onPress }) {
    return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableHighlight>
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
        elevation: 3
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'normal'
    }
})