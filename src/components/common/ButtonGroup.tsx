import { Button, HStack, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ButtonGroupProps {
    leftText: string
    rightText: string
    onPressRight: any
    onPressLeft: any
}

const ButtonGroup = ({ leftText, rightText, onPressRight, onPressLeft }: ButtonGroupProps) => {
    return (
        <HStack justifyContent={'center'} alignItems={'flex-end'} my={2}>
            <Button onPress={onPressLeft} shadow={1} bgColor={colors.darkGrey} w={'35%'} mr={6}><Text fontWeight={'bold'}>{leftText}</Text></Button>
            <Button onPress={onPressRight} bgColor={colors.primary} w={'35%'} ><Text fontWeight={'bold'} color={colors.white}>{rightText}</Text></Button>
        </HStack>
    );
};

export default ButtonGroup;

const styles = StyleSheet.create({
    container: {}
});
