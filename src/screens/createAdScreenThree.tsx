import { Center, HStack, View } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import { SelectField, TextField } from './createAdScreenOne';

interface CreateAdScreenThreeProps {
    navigation: any
}

const CreateAdScreenThree = ({ navigation }: CreateAdScreenThreeProps) => {
    return (
        <ScrollView style={styles.container}>
            <ScreenHeader title='Create Ad (3/3)' />
            <View p={6}>
                <TextField title='Phone' placeHolder="phone number" />
                <TextField title='Email' placeHolder="email" />
                <SelectField title="Country" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                <HStack space={3}>
                    <SelectField width={150} title="City" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                    <SelectField width={150} title="State(optional)" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
                </HStack>
                <SelectField title="Location" items={['Mobile', 'Electronics', 'Home Supply', 'Garments']} />
            </View>
            <View mb={3}>
                <ButtonGroup leftText='Previous' rightText='Publish Ad'
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => navigation.navigate('CreateAdSuccess')}
                />
            </View>
        </ScrollView>
    );
};

export default CreateAdScreenThree;

const styles = StyleSheet.create({
    container: {}
});
