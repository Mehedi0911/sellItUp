import { Text, TextArea, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface TextFieldProps { }

const TextField = ({ title, placeHolder, onChangeText, numberOfLines, value, disabled, h, error }: any) => {
    return (
        <View mb={3}>
            <Text mb={2} fontWeight={600} color={error ? colors.red : colors.black}>{title}</Text>
            <TextArea
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
            {error && <Text mb={2} color={colors.red}>* {error}</Text>}
        </View>
    );
};

export default TextField;

const styles = StyleSheet.create({
    container: {}
});
