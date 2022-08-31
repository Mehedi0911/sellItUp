import { Entypo } from '@expo/vector-icons';
import { HStack, Icon, ScrollView, Text, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import AdCard from '../../components/Ads/AdCard';
import ComingSoon from '../../components/common/CommingSoon';
import ScreenHeader from '../../components/common/ScreenHeader';
import { AdContext } from '../../providers/ad';
import { AuthContext } from '../../providers/auth';
import { colors } from '../../theme/colors';

interface MyAdsProps { }

const MyAds = (props: MyAdsProps) => {
    const { allAds } = React.useContext(AdContext)
    const { user } = React.useContext(AuthContext)
    const [myAds, setMyAds] = React.useState([] as any)

    React.useEffect(() => {
        const filtered = allAds?.filter((ad: any) => ad?.userID === user?.userID)
        setMyAds(filtered)
        console.log(filtered?.length)
    }, [user])

    return (
        <View >
            <ScreenHeader title='My Ads' />
            {
                myAds?.length > 0 ?
                    <ScrollView style={styles.container}>
                        <HStack alignItems={'center'} flexWrap='wrap' p={5}>
                            {
                                myAds?.map((ad: any, index: number) => (
                                    <AdCard key={index} ad={ad} />
                                ))
                            }
                        </HStack>
                    </ScrollView> :
                    <View h={'100%'} justifyContent={"center"} alignItems="center">
                        <Icon as={Entypo} name="emoji-neutral" opacity={0.6} size="xl" color={colors.black} />
                        <Text fontSize={'xl'} fontWeight="bold" opacity={0.6}>You Don't have any ads</Text>
                    </View>

            }
        </View>
    );
};

export default MyAds;

const styles = StyleSheet.create({
    container: {}
});
