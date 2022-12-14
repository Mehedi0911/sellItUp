import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useToast } from 'native-base';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { auth, db } from '../../App';
import { actions, notificationString } from '../constants/notificationActions';

export const AuthContext = React.createContext({} as any);

const AuthProvider: React.FunctionComponent = ({ children }) => {
    const toast = useToast()
    const [user, setUser] = React.useState(null as any)
    const [refreshUser, setRefreshUser] = React.useState(false)
    const [isAuthenticated, setAuthenticated] = React.useState(false)
    const [allNotifications, setAllNotifications] = React.useState([] as any)
    const [notificationCount, setNotificationCount] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const signin = async (credentials: any) => {
        const { email, password } = credentials;
        try {
            setLoading(true)
            const res = await signInWithEmailAndPassword(auth, email, password);
            setAuthenticated(true)
            setLoading(false)
            return [true, 'Logged in successfully']

        } catch (error) {
            setLoading(false)
            return [false, 'Logged in failed']
        }
    }

    const signUpUserWithEmail = async (newUser: any, navigation: any) => {
        const { email, password } = newUser;
        try {
            setLoading(true)
            const createdUser = await createUserWithEmailAndPassword(auth, email, password)
            const profile = await addDoc(collection(db, 'users'), {
                fullName: newUser.fullName,
                email: newUser.email,
                userID: createdUser.user.uid,
                photoUrl: '',
                type: 'member'
            })
            if (!profile) {
                return [false, 'Something went wrong']
            }
            setLoading(false)
            navigation.navigate('Home')
            CreateNotification(actions.COMMENTED, user?.fullName, notificationString.ACCOUNT_CREATED, createdUser.user.uid)
            return [true, 'Account Created Successfully']
        } catch (error: any) {
            setLoading(false)
            return [false, 'Something went wrong']
        }
    }

    const signOutUser = (navigation: any) => {
        signOut(auth)
        navigation.navigate('Home')
        return [true, 'Logged Out']
    }

    const resetPassword = async (newPass: string, navigation: any) => {
        const u = auth.currentUser
        try {
            if (u !== null) {
                let res = await updatePassword(u, newPass)
                navigation?.navigate('Home')
                return [true, 'Password Reset Success']
            }
        } catch (error) {
            return [false, 'Something went wrong']
        }

    }

    const CreateNotification = async (action: string, actionTaker: string, notificationString: string, forWhom: string,) => {
        try {
            await addDoc(collection(db, 'notifications'), {
                status: 'new',
                action: action,
                actionTaker: actionTaker,
                notificationString: notificationString,
                redirectTo: 'someLink',
                forWhom: forWhom,
                time: new Date()
            })
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        const subscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true)
                const getUser = async () => {
                    const q = query(collection(db, "users"), where("userID", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUser({ ...doc.data(), id: doc.id })
                    });
                }
                getUser()
            } else {
                setUser(null);
                setAuthenticated(false)
            }
        })
        return subscription;
    }, [auth, refreshUser])

    React.useEffect(() => {
        if (user) {
            const q = query(collection(db, 'notifications'), where('forWhom', '==', user.userID))
            const notificationsListenerSubscription = onSnapshot(q, (querySnapshot) => {
                let notificationsList: any = [];
                querySnapshot.forEach(snapshot => {
                    notificationsList.push({ ...snapshot.data(), id: snapshot.id })
                })
                setAllNotifications(notificationsList)
                const newNotifications = notificationsList?.filter((notification: any) => notification?.status !== 'read')
                setNotificationCount(newNotifications?.length)
            })
            return notificationsListenerSubscription;
        }
    }, [user])
    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                setUser,
                signin,
                signUpUserWithEmail,
                signOutUser, resetPassword,
                isAuthenticated,
                setAuthenticated,
                refreshUser,
                setRefreshUser,
                CreateNotification, allNotifications,
                notificationCount, setNotificationCount
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

const styles = StyleSheet.create({
    container: {}
});
