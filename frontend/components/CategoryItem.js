import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function CategoryItem({ title, onPress, icon }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.categoryItem}
        >
            <Ionicons
                name={icon}
                size={30}
                color="black"
            />
            <Text style={styles.categoryText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CategoryItem;

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
    categoryText: {
        fontSize: 18,
        fontFamily: 'sans-serif-medium'
    }
})