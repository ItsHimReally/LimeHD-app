import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import styles from '../Styles/MainStyle';

export default function Test() {


    return (
        <View style={styles.container}>
            <View style={styles.scroller}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scroller}
                >
                    <View>
                        {[1, 2, 3, 4, 5].map((key) => {
                            return (
                                <View style={styles.div}>
                                    <Text>Телепрограмма {key}.1</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View>
                        {[1, 2, 3, 4, 5].map((key) => {
                            return (
                                <View style={styles.div}>
                                    <Text>Телепрограмма {key}.2</Text>
                                </View>
                            )
                        })}
                    </View>

                </ScrollView>
            </View>



            <Text>Основной контент</Text>
            <StatusBar style="auto" />
        </View>
    );
}

