import { TouchableOpacity, Text, StyleSheet } from "react-native";

function DisplayItem({ title, text, onPress }) {
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
        </TouchableOpacity>
    );
}

export default DisplayItem;

const styles = StyleSheet.create({
    categoryItem: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        backgroundColor: '#e8e8e8',
        borderRadius: 8
    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
    categoryText: {
        fontSize: 11,
        fontFamily: 'sans-serif-medium'
    }
})