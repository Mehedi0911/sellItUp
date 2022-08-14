import { View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import ButtonGroup from '../components/common/ButtonGroup';
import ScreenHeader from '../components/common/ScreenHeader';
import { TextField } from './createAdScreenOne';

interface CreateAdScreenTwoProps {
    navigation: any;
}

const CreateAdScreenTwo = ({ navigation }: CreateAdScreenTwoProps) => {
    return (
        <View style={styles.container}>
            <ScreenHeader title='Create Ad (2/3)' />
            <View p={6}>
                <TextField title='Description' placeHolder="description" numberOfLines={6} />
                <TextField title='Features' placeHolder="features" numberOfLines={6} />
            </View>
            <View style={styles.bottom}>
                <ButtonGroup leftText='Previous' rightText='Save & Next'
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => navigation.navigate('CreateAdScreenThree')}
                />
            </View>
        </View>
    );
};

export default CreateAdScreenTwo;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 5
    }
});
