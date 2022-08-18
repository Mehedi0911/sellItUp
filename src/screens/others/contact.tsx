import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ComingSoon from '../../components/common/CommingSoon';

interface ContactProps { }

const Contact = (props: ContactProps) => {
    return (
        <ComingSoon />
    );
};

export default Contact;

const styles = StyleSheet.create({
    container: {}
});
