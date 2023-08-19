import { Text, View, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';

function Header(props) {
    const route = useRoute()
    const user = route.params?.user

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {props.name}{user}
            </Text>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    headerText: {
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontSize: 30,
        color: 'black'
    }
})