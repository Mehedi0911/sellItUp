import { doc, updateDoc } from 'firebase/firestore';
import { Center, HStack, Text, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../App';
import ScreenHeader from '../components/common/ScreenHeader';
import { actions } from '../constants/notificationActions';
import { AuthContext } from '../providers/auth';
import { colors } from '../theme/colors';

interface NotificationsProps { }

const Notifications = (props: NotificationsProps) => {
    const { allNotifications, notificationCount, setNotificationCount } = React.useContext(AuthContext)
    React.useEffect(() => {
        if (notificationCount > 0) {
            for (let i = 0; i < allNotifications.length; i++) {
                const notification = allNotifications[i];
                const MarkAsRead = async () => {
                    const docRef = doc(db, "notifications", notification?.id);
                    await updateDoc(docRef, {
                        status: 'read',
                    });
                }
                MarkAsRead();
            }
            setNotificationCount(0)
            console.log('calling');
        }
    }, [])
    return (
        <View style={styles.container}>
            <ScreenHeader title="Notifications" />
            <ScrollView>
                <View>
                    {
                        allNotifications?.map((notification: any) => (
                            <HStack key={notification?.id} p={2} bgColor={notification?.status === 'new' ? colors.grey : colors.white} alignItems={'center'} borderBottomWidth={1} borderBottomColor={'#E0E0E0'}>
                                <Center bgColor={colors.primary} h={7} w={7} borderRadius={14} mr={1.5}>
                                    <Text fontSize={'md'} fontWeight={'semibold'} color={colors.white}>{notification?.actionTaker?.charAt(0)?.toUpperCase()}</Text>
                                </Center>
                                <Text fontWeight={'bold'}>{notification?.action === actions.COMMENTED ? notification?.actionTaker : "Your"} </Text>
                                <Text>
                                    {
                                        notification?.action === actions.COMMENTED ? "commented " :
                                            notification?.action === actions.PROFILE_UPDATED ? "profile " :
                                                notification?.action === actions.AD_EDITED || notification?.action === actions.AD_DELETED || notification?.action === actions.AD_PUBLISHED ? "ad " :
                                                    "account "
                                    }
                                </Text>
                                <Text>{notification?.notificationString}</Text>

                            </HStack>
                        ))
                    }
                </View>

            </ScrollView>
        </View>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {}
});

const notificationObj = {
    status: 'new',
    action: 'commented',
    actionTaker: 'some user, self, app',
    notificationString: '',
    redirectTo: 'someLink',
    for: 'userID'
}

// someone commented
// ad posted
// profile updated
// post edited
// post deleted
