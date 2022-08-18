import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { db } from '../../App';
import { AuthContext } from './auth';



export const AdContext = React.createContext({} as any);

const initialNewAd = {
    title: '',
    category: '',
    subCategory: '',
    brand: '',
    model: '',
    condition: '',
    authenticity: '',
    tags: '',
    price: 0,
    isNegotiable: false,
    description: '',
    features: [],
    phone: '',
    email: '',
    country: '',
    city: '',
    state: '',
    address: '',
    images: [],
    userID: '',
}

const AdProviders: React.FunctionComponent = ({ children }) => {
    const [newAd, setNewAd] = React.useState(initialNewAd)
    const [allAds, setAllAds] = React.useState([] as any)
    const [images, setImages] = React.useState([] as any)

    const saveAd = async (data: any) => {
        let imgUrls: any = []
        for (let i = 0; i < images?.length; i++) {
            const image = images[i];
            const storage = getStorage();
            const reference = ref(storage, image.imgId);
            await getDownloadURL(reference).then((x) => {
                imgUrls.push(x)
            })
        }

        try {
            await addDoc(collection(db, 'ads'), {
                ...data,
                images: imgUrls,
            })
            setNewAd(initialNewAd)
            setImages([])
        } catch (error) {
        }
    }
    React.useEffect(() => {
        const q = query(collection(db, 'ads'))
        const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
            let adList: any = [];
            querySnapshot.forEach(snapshot => {
                adList.push({ ...snapshot.data(), id: snapshot.id })
            })
            setAllAds(adList)
        })

        return notesListenerSubscription;
    }, [])

    return (
        <AdContext.Provider
            value={{
                newAd,
                setNewAd,
                allAds,
                setAllAds,
                saveAd,
                images,
                setImages
            }}>
            {children}
        </AdContext.Provider>
    )
};

export default AdProviders;

