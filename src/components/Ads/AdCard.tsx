import { Ionicons } from '@expo/vector-icons';
import { Avatar, Box, Button, Center, Divider, HStack, Icon, IconButton, Image, Input, Popover, Pressable, Text, useToast, View, VStack } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, deleteDoc, doc, FieldValue, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../providers/auth';
import { db } from '../../../App';
import ToastBox from '../common/ToastBox';
import { actions, notificationString } from '../../constants/notificationActions';
interface AdCardProps {
    ad?: any,
}

const screen = Dimensions.get("screen");

const AdCard = ({ ad }: AdCardProps) => {
    const toast = useToast()
    const { user, CreateNotification } = React.useContext(AuthContext)
    const navigation: any = useNavigation()
    const [comment, setComment] = React.useState('')

    const deleteAd = async (id: string) => {
        try {
            await deleteDoc(doc(db, "ads", id));
            CreateNotification(actions.AD_DELETED, user?.fullName, notificationString.HAS_BEEN_DELETED, ad?.userID)
            toast.show({
                render: () => { return <ToastBox type='success' message={"Ad Deleted"} /> },
                placement: "top"
            })
        } catch (error) {
            console.log(error);
        }
    }

    const AddComment = async () => {
        const docRef = doc(db, "ads", ad?.id);
        await updateDoc(docRef, {
            comments: [...ad?.comments, { userId: user?.userID, comment: comment, userName: user?.fullName, userImage: user?.photoUrl }]
        });
        if (user?.userID !== ad?.userID) {
            CreateNotification(actions.COMMENTED, user?.fullName, notificationString.ON_YOUR_POST, ad?.userID)
        }
        setComment('')
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('AdDetails', { ad: ad })}>
                <View>
                    <Image source={{ uri: ad?.images?.[0] }} alt={'car'} resizeMode="contain" height={170} />
                </View>
                <Text alignSelf={'center'} m={2} fontWeight="semibold">{ad?.title}</Text>
                <Divider />
                <HStack p={3} justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center">
                        <Icon as={Ionicons} name="location-outline" size="sm" color={colors.primary} />
                        <Text>{ad?.city}</Text>
                    </HStack>
                    <Text fontWeight={'bold'} color={colors.red}>$ {ad?.price}</Text>
                </HStack>
            </Pressable>
            {
                ad?.userId === user?.useId &&
                <HStack p={3} justifyContent='center' space={2}>
                    <Button bgColor={colors.blue} w={'50%'} onPress={() => navigation.navigate('EditAd', { ad: ad })}>Edit Ad</Button>
                    <Box w="50%">
                        <Popover trigger={triggerProps => {
                            return <Button {...triggerProps} bgColor={colors.red}>
                                Delete Ad
                            </Button>;
                        }}>
                            <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                                <Popover.Arrow />
                                <Popover.CloseButton />
                                <Popover.Header>Delete Ad</Popover.Header>
                                <Popover.Body>
                                    This will remove all data relating to This Ad. This action cannot be
                                    reversed. Deleted data can not be recovered.
                                </Popover.Body>
                                <Popover.Footer justifyContent="flex-end">
                                    <Button.Group space={2}>
                                        <Button colorScheme="coolGray" variant="ghost">
                                            Cancel
                                        </Button>
                                        <Button onPress={() => deleteAd(ad?.id)} bgColor={colors.red}>Delete</Button>
                                    </Button.Group>
                                </Popover.Footer>
                            </Popover.Content>
                        </Popover>
                    </Box>
                </HStack>
            }
            <View p={3}>
                <Text fontWeight={'bold'} opacity={0.6} mb={2}>{ad?.comments?.length} comments</Text>
                <View>
                    {
                        ad?.comments?.map((comment: any, index: number) => (
                            <HStack alignItems="flex-start" my={2} key={index}>
                                {!comment?.userImage ?
                                    <Center bgColor={colors.primary} h={9} w={9} borderRadius={18} mr={1.5}>
                                        <Text fontSize={'xl'} fontWeight={'bold'} color={colors.white}>{comment?.userName?.charAt(0)?.toUpperCase()}</Text>
                                    </Center> :
                                    <Avatar size={'sm'} bg="green.500" mr={2} source={{
                                        uri: comment?.userImage
                                    }} />}
                                <View mt={-0.5} w={260}>
                                    <Text fontWeight={'bold'} opacity={0.7} >{user?.userID === comment?.userId ? "You" : comment?.userName} </Text>
                                    <Text>{comment?.comment}</Text>
                                </View>
                            </HStack>
                        ))
                    }
                </View>
                <HStack space={2}>
                    <Input variant={'unstyled'} bgColor={colors.grey} flex={1} placeholder="Add Comments"
                        value={comment} onChangeText={(text: string) => setComment(text)} />
                    <IconButton disabled={!Boolean(comment)} w={12} bgColor={Boolean(comment) ? colors.primary : '#E0E0E0'} borderRadius="sm" variant="solid"
                        onPress={() => AddComment()}
                        icon={<Icon as={Ionicons} name="ios-send" size="sm" color={colors.grey} />}
                    />
                </HStack>
            </View>
        </View>
    );
};

export default AdCard;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: screen.width > 500 ? 5 : 0,
        width: screen.width < 500 ? '100%' : '48%',
    }
});
