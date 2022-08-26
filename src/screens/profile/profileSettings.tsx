import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Button, Center, Divider, HStack, Icon, Spinner, Text, TextArea, View } from 'native-base';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ComingSoon from '../../components/common/CommingSoon';
import ScreenHeader from '../../components/common/ScreenHeader';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../../providers/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../App';
import { colors } from '../../theme/colors';
import { actions, notificationString } from '../../constants/notificationActions';
interface ProfileSettingsProps { }

const TextField = ({ title, value, onChangeText }: any) => {
    return (
        <View>
            <Text my={2}>{title}</Text>
            <TextArea
                value={value}
                onChangeText={onChangeText}
                autoCompleteType={"off"}
                h={10}
                variant={'unstyled'}
                bgColor={colors.grey}
            />
        </View>
    )

}

const ProfileSettings = (props: ProfileSettingsProps) => {
    const { user, refreshUser, setRefreshUser, CreateNotification } = React.useContext(AuthContext)
    const [editedUserInfo, setEditedUserInfo] = React.useState(
        {
            fullName: user?.fullName,
            phone: user?.phone ? user?.phone : '',
            address: user?.address ? user?.address : '',
            website: user?.website ? user?.website : ''
        }
    )
    const [loading, setLoading] = React.useState(false)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setLoading(true)
            const storage = getStorage(); //the storage itself
            const r = ref(storage, `${user?.fullName}/profilePhoto`); //how the image will be addressed inside the storage
            //convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();
            await uploadBytes(r, bytes); //upload images
            const reference = ref(storage, `${user?.fullName}/profilePhoto`);
            let url = await getDownloadURL(reference)
            try {
                const docRef = doc(db, "users", user?.id);
                await updateDoc(docRef, {
                    photoUrl: url
                });
                setRefreshUser(!refreshUser)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

    };

    const UpdateUser = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, "users", user?.id);
            await updateDoc(docRef, {
                fullName: editedUserInfo.fullName,
                phone: editedUserInfo.phone,
                address: editedUserInfo.address,
                website: editedUserInfo.website
            });
            CreateNotification(actions.PROFILE_UPDATED, user?.fullName, notificationString.HAS_BEEN_UPDATED, user?.userID)
            setRefreshUser(!refreshUser)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            <ScreenHeader title='Profile Settings' />
            <View justifyContent={'center'} p={6}>
                <HStack alignItems={'center'}>
                    {
                        !user?.photoUrl ?
                            <Center bgColor={colors.blue} h={75} w={75} borderRadius={37.5}>
                                <Text fontSize={'xl'} fontWeight={'bold'} color={colors.white}>{user?.fullName?.charAt(0)?.toUpperCase()}</Text>
                            </Center> :
                            <Avatar size={'xl'} bg="green.500" source={{
                                uri: user?.photoUrl
                            }} />
                    }
                    <View ml={4}>
                        <Text mb={2}>Upload Profile Photo</Text>
                        {loading ? <Spinner color={colors.orange} size={'lg'} /> : <Button bgColor={colors?.blue} onPress={pickImage} size={'sm'} startIcon={<Icon as={Ionicons} name="ios-cloud-upload" size="lg" />}>upload</Button>}
                    </View>
                </HStack>
                <Text fontWeight={'bold'} opacity={0.7} my={3}>Email: {user?.email}</Text>
            </View>
            <View px={6}>
                <TextField
                    title="Full Name"
                    value={editedUserInfo?.fullName}
                    onChangeText={(text: string) => setEditedUserInfo({ ...editedUserInfo, fullName: text })}
                />
                <TextField
                    title="Phone"
                    value={editedUserInfo?.phone}
                    onChangeText={(text: string) => setEditedUserInfo({ ...editedUserInfo, phone: text })}
                />
                <TextField
                    title="Address"
                    value={editedUserInfo?.address}
                    onChangeText={(text: string) => setEditedUserInfo({ ...editedUserInfo, address: text })}
                />
                <TextField
                    title="Website"
                    value={editedUserInfo?.website}
                    onChangeText={(text: string) => setEditedUserInfo({ ...editedUserInfo, website: text })}
                />
                {loading ? <Spinner color={colors.orange} size={'lg'} /> : <Button onPress={() => UpdateUser()} mt={3} alignSelf={'flex-end'} bgColor={colors?.blue} w={32} size={'sm'}>Save Changes</Button>}
            </View>
            <Divider my={6} />
            <View px={6} mt={1} mb={8}>
                <Text fontWeight={'600'} opacity={0.6} mb={3}>Delete Account</Text>
                <Text opacity={0.8}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatibus animi soluta modi natus! Cupiditate error consequuntur dicta provident eveniet illum aliquam ipsa vel molestias!</Text>
                {loading ? <Spinner color={colors.orange} size={'lg'} /> :
                    <Button borderColor={colors.red} variant={'outline'}
                        onPress={() => UpdateUser()} mt={3} px={2}
                        alignSelf={'flex-end'} w={40} size={'sm'}
                        leftIcon={<Icon as={MaterialIcons} name="delete" size="lg" color={colors.red} />}
                    >
                        <Text fontWeight={'600'} color={colors.red}>Delete Account</Text>
                    </Button>}

            </View>

        </ScrollView>
    );
};

export default ProfileSettings;

const styles = StyleSheet.create({
    container: {}
});
