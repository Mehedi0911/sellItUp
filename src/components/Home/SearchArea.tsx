import { Ionicons } from '@expo/vector-icons';
import { Button, CheckIcon, HStack, Icon, Select, TextArea } from 'native-base';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import Input from '../common/Input';

interface SearchAreaProps { }

const SearchArea = (props: SearchAreaProps) => {
    const [category, setCategory] = React.useState('');
    return (
        <View style={styles.container}>
            <HStack p={5} shadow={6} top={-100} w={'80%'} borderRadius={10} bgColor={colors.white} flexDirection='column'>
                <TextArea variant='unstyled' bgColor={colors.grey} autoCompleteType={"off"} h={12} p={4} placeholder="Ads title, keywords..." w="100%" />
                <TextArea variant='unstyled' my={3} bgColor={colors.grey} autoCompleteType={"off"} h={12} p={4} placeholder="Location" w="100%" />
                <Select selectedValue={category} onValueChange={itemValue => setCategory(itemValue)} bgColor={colors.grey} minWidth="200" accessibilityLabel="Choose Service" placeholder="Select Category" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }}>
                    <Select.Item label="UX Research" value="ux" />
                    <Select.Item label="Web Development" value="web" />
                    <Select.Item label="Cross Platform Development" value="cross" />
                    <Select.Item label="UI Designing" value="ui" />
                    <Select.Item label="Backend Development" value="backend" />
                </Select>
                <Button my={3} bgColor={"brandPrimary.main"} leftIcon={<Icon mt={0.5} as={Ionicons} name="ios-search" size="sm" />}>
                    Search
                </Button>
            </HStack>
        </View>
    );
};

export default SearchArea;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});
