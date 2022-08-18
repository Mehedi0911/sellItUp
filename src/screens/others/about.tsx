import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ComingSoon from '../../components/common/CommingSoon';

interface AboutProps { }

const About = (props: AboutProps) => {
    return (
        <ComingSoon />
    );
};

export default About;

const styles = StyleSheet.create({
    container: {}
});
