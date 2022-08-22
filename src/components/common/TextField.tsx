import { Text, TextArea, VStack } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface TextFieldProps { }

const TextField = ({ title, placeHolder, onChangeText, numberOfLines, value, disabled, h }: any) => {
    return (
        <VStack mb={3}>
            <Text mb={2}>{title}</Text>
            <TextArea
                isRequired={true}
                isDisabled={disabled}
                value={value}
                h={h ? h : 12}
                p={4}
                w={'100%'}
                bgColor={colors.grey}
                variant='unstyled'
                autoCompleteType={"off"}
                placeholder={placeHolder}
                onChangeText={onChangeText}
            />
        </VStack>
    );
};

export default TextField;

const styles = StyleSheet.create({
    container: {}
});
