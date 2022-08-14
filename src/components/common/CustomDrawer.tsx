import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Divider, HStack, Icon, Text, View, VStack } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import AppBar from './AppBar';

interface CustomDrawerProps {

}

const CustomDrawer = (props: any) => {
    return (
        <ScrollView style={styles.container}>
            <AppBar showToolBar minimal />
            <HStack p={5} bgColor={colors.grey} alignItems="center">
                <Avatar bg="green.500" source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }} />
                <VStack ml={3}>
                    <Text fontSize={'md'} fontWeight='bold'>Mehedi Mosh</Text>
                    <Text>Member</Text>
                </VStack>
            </HStack>
            <Divider />
            <DrawerContentScrollView {...props} style={{ backgroundColor: colors.white }} >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <Divider />
            <VStack py={4} px={4} ml={0.5}>
                <HStack alignItems="center" my={3}>
                    <Icon as={Ionicons} name="ios-information-circle" size="lg" />
                    <Text ml={2}>About</Text>
                </HStack>
                <HStack alignItems="center" my={3}>
                    <Icon as={MaterialIcons} name="card-membership" size="lg" />
                    <Text ml={2}>Get Membership</Text>
                </HStack>
                <HStack alignItems="center" my={3}>
                    <Icon as={Ionicons} name="pricetags" size="lg" />
                    <Text ml={2}>Pricing Plans</Text>
                </HStack>
                <HStack alignItems="center" my={3}>
                    <Icon as={Ionicons} name="md-call-outline" size="lg" />
                    <Text ml={2}>Contact</Text>
                </HStack>
                <HStack alignItems="center" my={3}>
                    <Icon as={AntDesign} name="questioncircle" size="lg" />
                    <Text ml={2}>FAQs</Text>
                </HStack>
                <HStack alignItems="center" my={3} bgColor={colors.dark} borderRadius={5} p={1}>
                    <Icon as={Ionicons} name="log-out" size="xl" mt={1} color={colors.white} />
                    <Text ml={2} color={colors.white} fontWeight="bold">Log Out</Text>
                </HStack>

            </VStack>
        </ScrollView >
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white }
});
