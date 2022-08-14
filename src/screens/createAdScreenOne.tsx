import { CheckIcon, HStack, Select, Text, TextArea, View, VStack } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import { colors } from '../theme/colors';

interface CreateAdScreenOneProps {
    navigation: any;
}

export const TextField = ({ title, placeHolder, onTextChange, numberOfLines }: any) => {
    return (
        <VStack mb={3}>
            <Text mb={2}>{title}</Text>
            <TextArea
                multiline={numberOfLines > 0 && true}
                numberOfLines={numberOfLines}
                h={12}
                p={4}
                w={'100%'}
                bgColor={colors.grey}
                variant='unstyled'
                autoCompleteType={"off"}
                placeholder={placeHolder}
                onTextInput={onTextChange}
            />
        </VStack>
    )
}

export const SelectField = ({ title, items, width }: any) => {
    return (
        <VStack mb={3}>
            <Text mb={2}>{title}</Text>
            <Select width={width ? width : '100%'} bgColor={colors.white} accessibilityLabel="Choose Service" placeholder={"select"} _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }}>
                {items?.map((item: string) => (
                    <Select.Item key={item} label={item} value={item.toLowerCase()} />
                ))
                }

            </Select>
        </VStack>
    )
}

const CreateAdScreenOne = ({ navigation }: CreateAdScreenOneProps) => {
    return (
        <ScrollView style={styles.container}>
            <ScreenHeader title='Create Ad (1/3)' />
            <View p={6}>
                <TextField title='Ad Name' placeHolder="Ad Name" />
                <SelectField title="Category" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                <SelectField title="Sub-Category" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                <SelectField title="Brand" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                <SelectField title="Model" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                <SelectField title="Condition" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                <SelectField title="Authenticity" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                <TextField title='Tags' placeHolder="eg : new, best" />
                <TextField title='Ad Price' placeHolder="Add a good price..." />
                <SelectField title="Negotiable" items={['Yes', 'Fixed']} />
                <ButtonGroup leftText='Cancel' rightText='Save & Next'
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => navigation.navigate('CreateAdScreenTwo')}
                />
            </View>

        </ScrollView>
    );
};

export default CreateAdScreenOne;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});
