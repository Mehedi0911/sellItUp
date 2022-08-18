import { Center, HStack, View } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import { AdContext } from '../providers/ad';
import { AuthContext } from '../providers/auth';
import { SelectField, TextField } from './createAdScreenOne';

interface CreateAdScreenThreeProps {
    navigation: any
}

const CreateAdScreenThree = ({ navigation }: CreateAdScreenThreeProps) => {
    const { newAd, setNewAd, saveAd } = React.useContext(AdContext)
    const { user } = React.useContext(AuthContext)
    return (
        <ScrollView style={styles.container}>
            <ScreenHeader title='Create Ad (3/3)' />
            <View p={6}>
                <TextField title='Phone' placeHolder="phone number" onChangeText={(text: string) => setNewAd({ ...newAd, phone: text })} />
                <TextField title='Email' value={user.email} disabled />
                <SelectField title="Country" items={['Bangladesh', 'India', 'USA']} sub onValueChange={(item: string) => setNewAd({ ...newAd, country: item })} />
                <HStack space={2} justifyContent='center'>
                    <Center w={'49%'}>
                        <TextField placeHolder='city' title='City' onChangeText={(text: string) => setNewAd({ ...newAd, city: text })} />
                    </Center>
                    <Center w={'49%'}>
                        <TextField placeHolder='state' title='State' onChangeText={(text: string) => setNewAd({ ...newAd, state: text })} />
                    </Center>
                </HStack>
                <TextField placeHolder='address' title='Address' onChangeText={(text: string) => setNewAd({ ...newAd, address: text })} />

            </View>
            <View mb={3}>
                <ButtonGroup leftText='Previous' rightText='Publish Ad'
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => {
                        navigation.navigate('CreateAdSuccess')
                        saveAd({ ...newAd, userID: user?.userID })
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default CreateAdScreenThree;

const styles = StyleSheet.create({
    container: {}
});
