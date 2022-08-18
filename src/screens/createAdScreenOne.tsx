import { CheckIcon, HStack, Select, Text, TextArea, View, VStack } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import { categories } from '../constants/data';
import { AdContext } from '../providers/ad';
import { colors } from '../theme/colors';

interface CreateAdScreenOneProps {
    navigation: any;
}

export const TextField = ({ title, placeHolder, onChangeText, numberOfLines, value, disabled }: any) => {
    return (
        <VStack mb={3}>
            <Text mb={2}>{title}</Text>
            <TextArea
                isRequired={true}
                isDisabled={disabled}
                value={value}
                numberOfLines={numberOfLines}
                h={12}
                p={4}
                w={'100%'}
                bgColor={colors.grey}
                variant='unstyled'
                autoCompleteType={"off"}
                placeholder={placeHolder}
                onChangeText={onChangeText}
            />
        </VStack>
    )
}

export const SelectField = ({ title, items, width, onValueChange, sub }: any) => {
    return (
        <VStack mb={3}>
            <Text mb={2}>{title}</Text>
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
        </VStack>
    )
}

const CreateAdScreenOne = ({ navigation }: CreateAdScreenOneProps) => {
    const { newAd, setNewAd } = React.useContext(AdContext)
    const [subCategories, setSubCategories] = React.useState([] as any)
    const [brands, setBrands] = React.useState([] as any)


    React.useEffect(() => {
        const subs = categories.find((category) => category.name.toLowerCase() === newAd.category)
        setSubCategories(subs?.subCategories)
        setBrands(subs?.brands)
    }, [newAd.category])

    return (
        <ScrollView style={styles.container}>
            <ScreenHeader title='Create Ad (1/3)' />
            <View p={6}>
                <TextField title='Ad Name *' placeHolder="Ad Name" onChangeText={(text: string) => setNewAd({ ...newAd, title: text })} />
                <SelectField title="Category *" items={categories} onValueChange={(item: string) => setNewAd({ ...newAd, category: item })} />
                <SelectField title="Sub-Category *" items={subCategories} sub onValueChange={(item: string) => setNewAd({ ...newAd, subCategory: item })} />
                <SelectField title="Brand *" items={brands} sub onValueChange={(item: string) => setNewAd({ ...newAd, brand: item })} />
                <TextField title='Model *' placeHolder="model name" onChangeText={(text: string) => setNewAd({ ...newAd, model: text })} />
                <SelectField title="Condition *" items={['New', 'Used', 'Reconditioned', 'Damaged']} sub onValueChange={(item: string) => setNewAd({ ...newAd, condition: item })} />
                <SelectField title="Authenticity *" items={['Original', 'Copy']} sub onValueChange={(item: string) => setNewAd({ ...newAd, authenticity: item })} />
                <TextField title='Tags *' placeHolder="eg : new, best" onChangeText={(text: string) => setNewAd({ ...newAd, tags: text })} />
                <TextField title='Ad Price *' placeHolder="Add a good price..." onChangeText={(text: any) => setNewAd({ ...newAd, price: text })} />
                <SelectField title="Negotiable *" items={['Negotiable', 'Fixed']} sub onValueChange={(item: string) => setNewAd({ ...newAd, negotiable: item })} />
                <ButtonGroup leftText='Cancel *' rightText='Save & Next'
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => {
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
