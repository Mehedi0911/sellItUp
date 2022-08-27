import { CheckIcon, Select, Text, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface SelectFieldProps { }

const SelectField = ({ title, items, width, onValueChange, sub, error }: any) => {
    return (
        <View mb={3}>
            <Text mb={2} fontWeight={600} color={error ? colors.red : colors.black}>{title}</Text>
            <Select onValueChange={onValueChange} width={width ? width : '100%'} bgColor={colors.white} accessibilityLabel="Choose Service" placeholder={"select"} _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }}>
                {items?.map((item: any) => (
                    sub ?
                        <Select.Item key={item} label={item} value={item?.toLowerCase()} /> :
                        <Select.Item key={item.name} label={item.name} value={item?.name?.toLowerCase()} />
                ))
                }

            </Select>
            {error && <Text mb={2} color={colors.red}>* {error}</Text>}
        </View>
    )
};

export default SelectField;

const styles = StyleSheet.create({
    container: {}
});
