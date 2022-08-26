import { AntDesign, Feather } from '@expo/vector-icons';
import { async } from '@firebase/util';
import { doc, updateDoc } from 'firebase/firestore';
import { Button, FlatList, HStack, Icon, IconButton, Input, Spinner, Text, useToast, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../App';
import ScreenHeader from '../components/common/ScreenHeader';
import TextField from '../components/common/TextField';
import ToastBox from '../components/common/ToastBox';
import { actions, notificationString } from '../constants/notificationActions';
import { AuthContext } from '../providers/auth';
import { colors } from '../theme/colors';

interface EditAdProps {

}

const EditAd = ({ route }: any) => {
    const toast = useToast()
    const { user, CreateNotification } = React.useContext(AuthContext)
    const ad = route?.params?.ad
    const [newFeature, setNewFeature] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [editedAd, setEditedAd] = React.useState({
        title: ad?.title,
        description: ad?.description,
        features: ad?.features,
        price: ad?.price?.toString(),
        tags: ad?.tags,
    })

    console.log({ ad })

    const listItem = ({ item }: any) => {
        return (
            <HStack space={2} mb={1} alignItems={'center'}>
                <Text>{item}</Text>
                <Icon as={AntDesign} name="closesquare" size="sm" color={colors.secondary} onPress={() => {
                    const newFeatureList = editedAd?.features?.filter((feature: string) => feature !== item)
                    setEditedAd({ ...editedAd, features: newFeatureList })
                }} />
            </HStack>
        )
    }

    const UpdateAd = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, "ads", ad?.id);
            await updateDoc(docRef, {
                title: editedAd.title,
                description: editedAd.description,
                features: editedAd.features,
                price: parseFloat(editedAd.price),
                tags: editedAd.tags
            });
            CreateNotification(actions.AD_EDITED, user?.fullName, notificationString?.HAS_BEEN_UPDATED, user?.userID)
            toast.show({
                render: () => { return <ToastBox type='success' message={"Updated Successfully"} /> },
                placement: "top"
            })
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <ScrollView>
            <ScreenHeader title="Edit Ad" />
            <View p={4}>
                <TextField value={editedAd.title} title='Ad Name *' placeHolder="Ad Name" onChangeText={(text: string) => setEditedAd({ ...editedAd, title: text })} />
                <TextField h={32} value={editedAd.description} title='Description *' placeHolder="description" onChangeText={(text: string) => setEditedAd({ ...editedAd, description: text })} />
                <View p={6}>
                    <HStack space={2}>
                        <Input variant={'unstyled'} bgColor={colors.grey} flex={1} placeholder="Add Features" value={newFeature} onChangeText={(text: string) => setNewFeature(text)} />
                        <IconButton w={12} bgColor={colors.primary} borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color={colors.grey} />} onPress={() => {
                            newFeature && setEditedAd({ ...editedAd, features: [...editedAd.features, newFeature] });
                            setNewFeature("");
                        }} />
                    </HStack>
                </View>
                <View >
                    {editedAd?.features?.length > 0 && <Text fontWeight={'semibold'} mb={1} mt={-2} opacity={0.7}>Added Features</Text>}
                    <FlatList
                        data={editedAd?.features}
                        renderItem={listItem}
                        keyExtractor={(item: any, index) => item + index}
                    />
                </View>
                <TextField value={editedAd.price} title='Price *' placeHolder="price" onChangeText={(text: string) => setEditedAd({ ...editedAd, price: text })} />
                <TextField value={editedAd.tags} title='Tags' placeHolder="eg : new, best" onChangeText={(text: string) => setEditedAd({ ...editedAd, tags: text })} />
                {loading ? <Spinner color={colors.secondary} size={'lg'} /> :
                    <Button bgColor={colors.green} w={'100%'}
                        onPress={() => UpdateAd()}
                    >Update</Button>}
            </View>
        </ScrollView>
    );
};

export default EditAd;

const styles = StyleSheet.create({
    container: {}
});
