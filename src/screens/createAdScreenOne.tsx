import { CheckIcon, HStack, Select, Text, TextArea, View, VStack } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import SelectField from '../components/common/SelectField';
import TextField from '../components/common/TextField';
import { categories } from '../constants/data';
import { AdContext } from '../providers/ad';
import { colors } from '../theme/colors';
import { ValidateAdScreenOne } from '../utils/formValidators';

interface CreateAdScreenOneProps {
    navigation: any;
}

const CreateAdScreenOne = ({ navigation }: CreateAdScreenOneProps) => {
    const { newAd, setNewAd } = React.useContext(AdContext)
    const [subCategories, setSubCategories] = React.useState([] as any)
    const [brands, setBrands] = React.useState([] as any)
    const [errorField, setErrorField] = React.useState(null as any)

    React.useEffect(() => {
        const subs = categories.find((category) => category.name.toLowerCase() === newAd.category)
        setSubCategories(subs?.subCategories)
        setBrands(subs?.brands)
    }, [newAd.category])

    return (
        <ScrollView style={styles.container}>
            <ScreenHeader title='Create Ad (1/3)' />
            <View p={6}>
                <TextField error={errorField?.name === 'title' && errorField?.error} title='Ad Name *' placeHolder="Ad Name" onChangeText={(text: string) => setNewAd({ ...newAd, title: text })} />
                <SelectField error={errorField?.name === 'category' && errorField?.error} title="Category *" items={categories} onValueChange={(item: string) => setNewAd({ ...newAd, category: item })} />
                <SelectField error={errorField?.name === 'subCategory' && errorField?.error} title="Sub-Category *" items={subCategories} sub onValueChange={(item: string) => setNewAd({ ...newAd, subCategory: item })} />
                <SelectField error={errorField?.name === 'brand' && errorField?.error} title="Brand *" items={brands} sub onValueChange={(item: string) => setNewAd({ ...newAd, brand: item })} />
                <TextField error={errorField?.name === 'model' && errorField?.error} title='Model *' placeHolder="model name" onChangeText={(text: string) => setNewAd({ ...newAd, model: text })} />
                <SelectField error={errorField?.name === 'condition' && errorField?.error} title="Condition *" items={['New', 'Used', 'Reconditioned', 'Damaged']} sub onValueChange={(item: string) => setNewAd({ ...newAd, condition: item })} />
                <SelectField error={errorField?.name === 'authenticity' && errorField?.error} title="Authenticity *" items={['Original', 'Copy']} sub onValueChange={(item: string) => setNewAd({ ...newAd, authenticity: item })} />
                <TextField title='Tags *' placeHolder="eg : new, best" onChangeText={(text: string) => setNewAd({ ...newAd, tags: text })} />
                <TextField error={errorField?.name === 'price' && errorField?.error} title='Ad Price *' placeHolder="Add a good price..." onChangeText={(text: any) => setNewAd({ ...newAd, price: text })} />
                <SelectField error={errorField?.name === 'negotiable' && errorField?.error} title="Negotiable *" items={['Negotiable', 'Fixed']} sub onValueChange={(item: string) => setNewAd({ ...newAd, negotiable: item })} />
                <ButtonGroup leftText='Cancel *' rightText='Save & Next'
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => {
                        let err = ValidateAdScreenOne(newAd)
                        if (err) {
                            setErrorField(err)
                            return
                        } else {
                            setErrorField(null)
                        }
                        navigation.navigate('CreateAdScreenTwo')
                    }}
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
