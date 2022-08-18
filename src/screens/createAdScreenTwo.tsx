import { Center, Divider, HStack, Icon, IconButton, Image, Input, ScrollView, Text, View } from 'native-base';
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import { AdContext } from '../providers/ad';
import { TextField } from './createAdScreenOne';
import * as ImagePicker from 'expo-image-picker';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import { colors } from '../theme/colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../providers/auth';
interface CreateAdScreenTwoProps {
    navigation: any;
}


const CreateAdScreenTwo = ({ navigation }: CreateAdScreenTwoProps) => {
    const { user } = React.useContext(AuthContext)
    const { newAd, setNewAd, images, setImages } = React.useContext(AdContext)
    const [newFeature, setNewFeature] = React.useState('')
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            let imageId = new Date().getTime().toString()
            setImages([...images, { url: result.uri, imgId: `${user?.fullName}/image${imageId}` }])
            const storage = getStorage(); //the storage itself
            const r = ref(storage, `${user?.fullName}/image${imageId}`); //how the image will be addressed inside the storage

            //convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            await uploadBytes(r, bytes); //upload images
        }


    };


    const deleteImage = (imgId: string) => {
        const filteredImages = images.filter((img: any) => img.imgId !== imgId)
        setImages(filteredImages);
        const storage = getStorage();
        const imgRef = ref(storage, imgId);
        deleteObject(imgRef).then(() => {
        }).catch((error: any) => {
        });
    }

    const listItem = ({ item }: any) => {
        return (
            <HStack space={2} mb={1} alignItems={'center'}>
                <Text>{item}</Text>
                <Icon as={AntDesign} name="closesquare" size="sm" color={colors.secondary} onPress={() => {
                    const newFeatureList = newAd?.features?.filter((feature: string) => feature !== item)
                    setNewAd({ ...newAd, features: newFeatureList })
                }} />
            </HStack>
        )
    }

    return (
        <View style={styles.container}>
            <ScreenHeader title='Create Ad (2/3)' />
            <ScrollView>
                <View p={6}>
                    <TextField title='Description *' placeHolder="description" numberOfLines={6} onChangeText={(text: string) => setNewAd({ ...newAd, description: text })} />
                    <HStack space={2}>
                        <Input variant={'unstyled'} bgColor={colors.grey} flex={1} placeholder="Add Features" value={newFeature} onChangeText={(text: string) => setNewFeature(text)} />
                        <IconButton w={12} bgColor={colors.primary} borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color={colors.grey} />} onPress={() => {
                            newFeature && setNewAd({ ...newAd, features: [...newAd.features, newFeature] });
                            setNewFeature("");
                        }} />
                    </HStack>
                    {/* <TextField title='Features' placeHolder="features" numberOfLines={6} onChangeText={(text: string) => setNewAd({ ...newAd, description: text })} /> */}
                </View>
                <View px={6} >
                    {newAd?.features?.length > 0 && <Text fontWeight={'semibold'} mb={1} mt={-2} opacity={0.7}>Added Features</Text>}
                    <FlatList
                        data={newAd.features}
                        renderItem={listItem}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
                <HStack flexWrap={'wrap'} alignItems={'center'} p={6} mx={6} space={5}
                    borderWidth={2} borderColor={colors.grey} mt={6}>
                    {
                        images?.map((img: any) => (
                            <Center key={img.imgId} w={'18%'} position="relative">
                                <Icon zIndex={5} onPress={() => deleteImage(img.imgId)} as={AntDesign} name="closecircle" color={colors.red} size="sm" position={'absolute'} top={-5} right={-5} />
                                <Image h={70} w={70} resizeMode="contain" source={{ uri: img.url }} alt="logo" ml={2} />
                            </Center>
                        ))
                    }
                    {Boolean(images.length <= 3) &&
                        <TouchableHighlight onPress={pickImage} style={styles.imagePicker}>
                            <Icon as={MaterialCommunityIcons} name="image-plus" size="lg" />
                        </TouchableHighlight>}
                </HStack>
                <Text mx={6} mt={1} color={Boolean(images.length <= 3) ? 'grey' : colors.red}>{Boolean(images.length <= 3) ? `${4 - images.length} images left` : 'Max Limit reached'}</Text>

                <View style={styles.bottom}>
                    <ButtonGroup leftText='Previous' rightText='Save & Next'
                        onPressLeft={() => navigation.goBack()}
                        onPressRight={() => navigation.navigate('CreateAdScreenThree')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateAdScreenTwo;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 5
    },
    imagePicker: {
        backgroundColor: colors.grey,
        height: 70,
        width: 70,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
