import { Center, HStack, Spinner, View } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import SelectField from '../components/common/SelectField';
import TextField from '../components/common/TextField';
import { AdContext } from '../providers/ad';
import { AuthContext } from '../providers/auth';
import { colors } from '../theme/colors';

interface CreateAdScreenThreeProps {
    navigation: any
}

const CreateAdScreenThree = ({ navigation }: CreateAdScreenThreeProps) => {
    const { newAd, setNewAd, saveAd } = React.useContext(AdContext)
    const { user } = React.useContext(AuthContext)
    const [errorField, setErrorField] = React.useState(null as any)
    const [loading, setLoading] = React.useState(false)
    return (
        <ScrollView style={styles.container}>
            <ScreenHeader title='Create Ad (3/3)' />
            <View p={6}>
                <TextField error={errorField?.name === 'phone' && errorField?.error} title='Phone' placeHolder="phone number" onChangeText={(text: string) => setNewAd({ ...newAd, phone: text })} />
                <TextField title='Email' value={user.email} disabled />
                <SelectField error={errorField?.name === 'category' && errorField?.error} title="Country" items={['Bangladesh', 'India', 'USA']} sub onValueChange={(item: string) => setNewAd({ ...newAd, country: item })} />
                <HStack space={2} justifyContent='center'>
                    <Center w={'49%'}>
                        <TextField error={errorField?.name === 'city' && errorField?.error} placeHolder='city' title='City' onChangeText={(text: string) => setNewAd({ ...newAd, city: text })} />
                    </Center>
                    <Center w={'49%'}>
                        <TextField error={errorField?.name === 'state' && errorField?.error} placeHolder='state' title='State' onChangeText={(text: string) => setNewAd({ ...newAd, state: text })} />
                    </Center>
                </HStack>
                <TextField error={errorField?.name === 'address' && errorField?.error} placeHolder='address' title='Address' onChangeText={(text: string) => setNewAd({ ...newAd, address: text })} />

            </View>
            {!loading ? <View mb={3}>
                <ButtonGroup leftText='Previous' rightText='Publish Ad'
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={async () => {
                        setLoading(true)
                        const ad = await saveAd({ ...newAd, userID: user?.userID })
                        console.log(ad)
                        setLoading(false)
                        navigation.navigate('CreateAdSuccess')

                    }}
                />
            </View> : <Spinner color={colors.orange} size='lg' />}
        </ScrollView>
    );
};

export default CreateAdScreenThree;

const styles = StyleSheet.create({
    container: {}
});
