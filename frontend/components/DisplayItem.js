import { TouchableOpacity, Text, StyleSheet } from "react-native";

function DisplayItem({ title, text, timestamp, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.categoryItem}
        >
            <Text
                style={styles.categoryTitle}
                numberOfLines={1}
            >{title}</Text>
            <Text
                style={styles.categoryText}
                numberOfLines={1}
            >{text}</Text>
            <Text
            style={styles.categoryTime}
            numberOfLines={1}
            >{timestamp}</Text>
        </TouchableOpacity>
    );
}

export default DisplayItem;

const styles = StyleSheet.create({
    categoryItem: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3
    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
    categoryText: {
        fontSize: 11,
        fontFamily: 'sans-serif-medium'
    },
    categoryTime: {
        fontSize: 10
    }
})