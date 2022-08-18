import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useToast } from 'native-base';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { auth, db } from '../../App';
import ToastBox from '../components/common/ToastBox';

export const AuthContext = React.createContext({} as any);

const AuthProvider: React.FunctionComponent = ({ children }) => {
    const toast = useToast()
    const [user, setUser] = React.useState(null as any)
    const [isAuthenticated, setAuthenticated] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const signin = async (credentials: any) => {
        const { email, password } = credentials;
        try {
            setLoading(true)
            const res = await signInWithEmailAndPassword(auth, email, password);
            setAuthenticated(true)
            const q = query(collection(db, "users"), where("userID", "==", res.user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
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

    React.useEffect(() => {
        const subscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true)
                const getUser = async () => {
                    const q = query(collection(db, "users"), where("userID", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUser(doc.data())
                    });
                }
                getUser()
            } else {
                setUser(null);
                setAuthenticated(false)
            }
        })
        return subscription;
    }, [auth])

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
                setAuthenticated
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

const styles = StyleSheet.create({
    container: {}
});
