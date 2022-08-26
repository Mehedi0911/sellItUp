import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useToast } from 'native-base';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { auth, db } from '../../App';
import ToastBox from '../components/common/ToastBox';
import { actions, notificationString } from '../constants/notificationActions';

export const AuthContext = React.createContext({} as any);

const AuthProvider: React.FunctionComponent = ({ children }) => {
    const toast = useToast()
    const [user, setUser] = React.useState(null as any)
    const [refreshUser, setRefreshUser] = React.useState(false)
    const [isAuthenticated, setAuthenticated] = React.useState(false)
    const [allNotifications, setAllNotifications] = React.useState([] as any)
    const [loading, setLoading] = React.useState(false)

    const signin = async (credentials: any) => {
        const { email, password } = credentials;
        try {
            setLoading(true)
            const res = await signInWithEmailAndPassword(auth, email, password);
            setAuthenticated(true)
            // const q = query(collection(db, "users"), where("userID", "==", res.user.uid));
            // const querySnapshot = await getDocs(q);
            // querySnapshot.forEach((doc) => {
            //     setUser({ ...doc.data(), id: doc.id })
            // });
            setLoading(false)
            toast.show({
                render: () => <ToastBox type='success' message={"Signed In Successfully"} />,
                placement: "top"
            })

        } catch (error) {
            toast.show({
                render: () => <ToastBox type='error' message={"Something went wrong!"} />,
                placement: "top"
            })
            setLoading(false)
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
                toast.show({
                    render: () => <ToastBox type='error' message={"Something Went Wrong creating Account"} />,
                    placement: "top"
                })
            }
            toast.show({
                render: () => <ToastBox type='success' message={"Signed Up Successfully"} />,
                placement: "top"
            })
            setLoading(false)
            navigation.navigate('Home')
            CreateNotification(actions.COMMENTED, user?.fullName, notificationString.ACCOUNT_CREATED, createdUser.user.uid)
        } catch (error: any) {
            toast.show({
                render: () => <ToastBox type='error' message={error?.message} />,
                placement: "top"
            })
            setLoading(false)
        }
    }

    const signOutUser = (navigation: any) => {
        signOut(auth)
        navigation.navigate('Home')
        toast.show({
            render: () => <ToastBox type='success' message={"Logged Out"} />,
            placement: "top"
        })
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
                signOutUser,
                isAuthenticated,
                setAuthenticated,
                refreshUser,
                setRefreshUser,
                CreateNotification, allNotifications
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

const styles = StyleSheet.create({
    container: {}
});
