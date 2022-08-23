import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenHeader from '../components/common/ScreenHeader';
import { AuthContext } from '../providers/auth';

interface NotificationsProps { }

const Notifications = (props: NotificationsProps) => {
    const { allNotifications } = React.useContext(AuthContext)
    console.log({ allNotifications })
    return (
        <View style={styles.container}>
            <ScreenHeader title="Notifications" />
            <ScrollView>

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
