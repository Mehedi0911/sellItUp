import { Box, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ToastBoxProps {
    message: string
    type: 'error' | 'success'
}

const ToastBox = ({ message, type }: ToastBoxProps) => {
    return (
        <Box bg={type === 'success' ? 'green' : colors.red} px="2" py="1" rounded="sm" mb={5}>
            <Text color={colors.white}>{message}</Text>
        </Box>
    );
};

export default ToastBox;

const styles = StyleSheet.create({
    container: {}
});
