import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AboutProps { }

const About = (props: AboutProps) => {
    return (
        <View style={styles.container}>
            <Text>About</Text>
        </View>
    );
};

export default About;

const styles = StyleSheet.create({
    container: {}
});
