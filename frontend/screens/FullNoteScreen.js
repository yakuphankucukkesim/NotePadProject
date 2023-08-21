import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

function FullNoteScreen({ route }) {
    const { note } = route.params;

    const Stack = createStackNavigator();
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
        </View>
        <View style={styles.textView}>
            <Text>{note}</Text>
        </View>
    </View>
}

export default FullNoteScreen;

const styles = StyleSheet.create({
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    page: {
        flex: 1,
        flexDirection: 'column'
    },
})