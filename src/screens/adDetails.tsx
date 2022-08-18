import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Avatar, Button, Center, Divider, HStack, Icon, Image, Pressable, ScrollView, Text, View } from 'native-base';
import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { db } from '../../App';
import AdCard from '../components/Ads/AdCard';
import Chip from '../components/common/Chip';
import ComingSoon from '../components/common/CommingSoon';
import ScreenHeader from '../components/common/ScreenHeader';
import { AdContext } from '../providers/ad';
import { colors } from '../theme/colors';

interface AdDetailsProps {
}


const listItem = ({ item }: any) => {
    return (
        <HStack space={2} mb={1} alignItems={'center'}>
            <Icon as={AntDesign} name="check" size="sm" color={colors.green} />
            <Text>{item}</Text>
        </HStack>
    )
}

const AdDetails = ({ route }: any) => {
    const { allAds } = React.useContext(AdContext)
    const ad = route?.params?.ad
    const [selectedImage, setSelectedImage] = React.useState(ad?.images[0])
    const [phoneRevealed, setPhoneRevealed] = React.useState(false)
    const [adByUser, setAdByUser] = React.useState(null as any)

    React.useEffect(() => {
        const getAdUser = async () => {
            const q = query(collection(db, "users"), where("userID", "==", ad?.userID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setAdByUser(doc.data())
                console.log(doc.data())
            });
        }
        getAdUser()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader title='Ad Details' />
            <ScrollView p={4} >
                <HStack space={2} mb={3}>
                    <Chip title='featured' iconType='AntDesign'
                        iconName='checkcircle' bgColor={colors.orange}
                    />
                    <Chip title='member' iconType='MaterialCommunityIcons'
                        iconName='police-badge' bgColor={colors.blue}
                    />
                    <Chip title='verified seller' iconType='AntDesign'
                        iconName='checkcircle' bgColor={colors.green}
                    />
                </HStack>
                <Text fontSize='lg' color={colors.black} fontWeight='bold'>{ad?.title}</Text>
                <HStack mt={2} >
                    <Text opacity={0.6} py={1}><Icon as={Ionicons} name="time" size="sm" color={colors.black} />
                        {new Date().toLocaleString().slice(0, 11)}
                    </Text>
                    <Text opacity={0.6} py={1} ml={3}><Icon as={Ionicons} name="location" size="sm" color={colors.black} />{ad?.address}</Text>
                </HStack>
                <View flex={1} mt={4} bgColor={colors.grey} p={6} borderRadius={5}>
                    <Image h={400} w={'100%'} resizeMode="contain" source={{ uri: selectedImage }} alt="ad image" />
                </View>
                <HStack bgColor={colors.grey} justifyContent={'center'} flexWrap={'wrap'} alignItems={'center'} p={6} space={5}
                    borderWidth={2} borderColor={colors.grey} mt={6} borderRadius={5}>
                    {
                        ad?.images?.map((imgUrl: any) => (
                            <Center key={imgUrl} w={'20%'} position="relative">
                                <Pressable onPress={() => setSelectedImage(imgUrl)}>
                                    <Image h={70} w={70} resizeMode="contain" source={{ uri: imgUrl }} alt="logo" ml={2} />
                                </Pressable>
                            </Center>
                        ))
                    }
                </HStack>
                <HStack my={4} justifyContent="space-between" px={10} alignItems="center">
                    <Text fontSize="2xl">$ {ad?.price}</Text>
                    <Pressable>
                        <Icon as={AntDesign} name="heart" size="lg" color={colors.blue} mr={0.5} />
                    </Pressable>
                </HStack>
                <View bgColor={colors.grey} justifyContent={'center'} px={9} py={4} borderRadius={5}>
                    <Pressable onPress={() => setPhoneRevealed(!phoneRevealed)}>
                        <HStack alignItems="center">
                            <Icon as={MaterialIcons} name="smartphone" size="lg" color={colors.blue} />
                            {phoneRevealed ? <Text fontSize="2xl" ml={2} color={colors.blue}>{ad.phone}</Text> :
                                <Text fontSize="2xl" ml={2} color={colors.blue}>(+880) 1XXXXXXXXX</Text>
                            }
                        </HStack>
                        {!phoneRevealed && <Text fontSize="md" ml={2} opacity={0.6}>Click here to reveal the phone number</Text>}
                    </Pressable>
                </View>
                <Pressable bgColor={colors.green} py={2} my={4} borderRadius={4}>
                    <HStack justifyContent="center">
                        <Icon as={Ionicons} name="chatbox-ellipses" size="lg" color={colors.white} />
                        <Text color={colors.white} ml={2}>Send Message</Text>
                    </HStack>
                </Pressable>
                <Divider mb={5} />
                <View>
                    <HStack alignItems={'center'} space={2}>
                        <View>
                            <Avatar bg="green.500" source={{
                                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            }} />
                        </View>
                        <View>
                            <Text fontWeight={500} opacity={0.6}>Ad By:</Text>
                            <Text fontWeight={700} color={colors.black} opacity={0.8}>{adByUser?.fullName}</Text>
                        </View>
                    </HStack>
                    <HStack mt={4} mb={2}>
                        <Icon as={MaterialIcons} name="email" size="lg" color={colors.blue} />
                        <Text ml={2}>{adByUser?.email}</Text>
                    </HStack>
                    <HStack >
                        <Icon as={Ionicons} name="location-sharp" size="lg" color={colors.blue} />
                        <Text ml={2}>{ad?.address}, {ad?.city}, {ad?.state}</Text>
                    </HStack>
                    <Divider my={5} />
                </View>
                <View mb={5}>
                    <Text fontSize={'lg'} opacity={0.6} mb={2}>Overview</Text>
                    <HStack justifyContent={'space-between'}>
                        <Text >Condition:</Text>
                        <Text>{ad?.condition}</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <Text >Brand:</Text>
                        <Text>{ad?.brand}</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <Text >Model:</Text>
                        <Text>{ad?.model}</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <Text >Authenticity:</Text>
                        <Text>{ad?.authenticity}</Text>
                    </HStack>
                </View>
                <Divider />
                <View my={5}>
                    <Text fontSize={'lg'} opacity={0.6} mb={2}>Description</Text>
                    <Text>{ad?.description}</Text>
                </View>
                <Divider />
                <View my={5}>
                    <Text fontSize={'lg'} opacity={0.6} mb={2}>Features</Text>
                    <FlatList
                        data={ad?.features}
                        renderItem={listItem}
                        keyExtractor={(item: string, index: number) => item + index}
                    />
                </View>
                <Divider />
                <View my={5}>
                    <HStack space={2} alignItems={'center'} mb={2}>
                        <Icon as={AntDesign} name="sharealt" size="lg" color={colors.black} opacity={0.6} />
                        <Text fontSize={'lg'} fontWeight="bold" opacity={0.6}>Share Ad</Text>
                    </HStack>
                    <HStack space={2} alignItems={'center'}>
                        <Image h={8} w={8} source={require('../../assets/whatsapp.png')} alt="logo" ml={2} />
                        <Image h={8} w={8} source={require('../../assets/facebook.png')} alt="logo" ml={2} />
                        <Image h={8} w={8} source={require('../../assets/instagram.png')} alt="logo" ml={2} />
                        <Image h={8} w={8} source={require('../../assets/twitter.png')} alt="logo" ml={2} />
                        <Image h={8} w={8} source={require('../../assets/linkedin.png')} alt="logo" ml={2} />
                        <Image h={8} w={8} source={require('../../assets/pinterest.png')} alt="logo" ml={2} />
                    </HStack>
                </View>
                <Divider />
                <View my={5}>
                    <Text fontSize={'lg'} opacity={0.6} mb={2}>Similar Ads</Text>
                    <HStack>
                        {
                            allAds?.slice(0, 4)?.map((ad: any, index: number) => (
                                <AdCard key={index} ad={ad} />
                            ))
                        }
                    </HStack>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AdDetails;

const styles = StyleSheet.create({
    container: { flex: 1 }
});
