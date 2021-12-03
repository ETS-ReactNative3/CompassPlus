import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { Icon, Divider, Header } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { getAuth } from '@firebase/auth';

import WhiteButton from '../../comps/Global/whiteButton.js';
import SavedTripsCard from '../../comps/TripPlanner/savedTripsCard.js';
import NavHome from '../../comps/NavBar/NavHome.js';

import {
    useFonts,
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';
import { COLORS } from '../../constants/styles.js';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Page = styled.View`
    width: ${windowWidth};
    height: ${windowHeight};
    justify-content: space-between;
    align-items: center;
    color: ${COLORS.ALICEBLUE};
`;

const TopBar = styled.View`
    width: 100%;
    height: 13%;
    background-color: ${COLORS.SPACECADET};
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 5%;
`;

const Content = styled.ScrollView`
    width: 100%;
    height: 100%;
    padding-top: 10%;
`;

const H1 = styled.Text`
    font-size: 24px;
    color: #fff;
`;

const Button = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
`;

const CardWrapper = styled.View`
    margin-bottom: 10px;
`;

// const BottomCont = styled.View`
//     width: ${windowWidth};
//     height: 162px;
//     justify-content: space-between;
//     align-items: center;
// `;

const Para = styled.Text`
    font-size: 16px;
    color: ${COLORS.DAVYSGREY};
    width: 326px;
    height: 50px;
`;

const fakeData = [
    {
        name: "Home",
        location: "1529 West Pender Street"
    },
    {
        name: "Work",
        location: "Richmond Center"
    },
    {
        name: "School",
        location: "Vancouver Canada"
    }
];

const SavedTrips = ({
    navigation = useNavigation()

}) => {
    /* 🪓🪓🪓🪓🪓🪓🪓🪓🪓 AXIOS STUFF 🪓🪓🪓🪓🪓🪓🪓🪓🪓 */
    const GetLocations = async () => {
        const associateAuth = getAuth();
        const fb_uid = associateAuth.currentUser.uid;
        console.log(fb_uid);
        const result = await axios.get('/saved_locations.php', { params: { fb_uid: fb_uid } });
        console.log(result.data);
        setLocations(result.data);
    }

    useFocusEffect(
        React.useCallback(() => {
            GetLocations();
        }, [])
    )

    const DeleteLocation = async (id) => {
        await axios.delete('/saved_locations.php', { data: { id: id } });
        await GetLocations();
    }

    const [locations, setLocations] = useState([]);
    /* 🪓🪓🪓🪓🪓🪓🪓🪓🪓 AXIOS STUFF END 🪓🪓🪓🪓🪓🪓🪓🪓🪓 */


    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_300Light_Italic,
        Ubuntu_400Regular,
        Ubuntu_400Regular_Italic,
        Ubuntu_500Medium,
        Ubuntu_500Medium_Italic,
        Ubuntu_700Bold,
        Ubuntu_700Bold_Italic,
    });


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return <Page>
            <Header
                leftComponent={{
                    icon: 'arrow-back',
                    color: 'white',
                    size: 30,
                    onPress: () => { navigation.goBack() },
                    iconStyle: { color: '#fff' }

                }}
                centerComponent={{
                    text: 'Saved Locations',
                    style: {
                        color: '#fff',
                        fontFamily: 'Ubuntu_700Bold',
                        fontSize: 24
                    }
                }}
                rightComponent={{
                    icon: 'add',
                    color: 'white',
                    size: 30,
                    onPress: () => { navigation.navigate('AddSavedLocation') },
                    iconStyle: { color: '#fff' }
                }}
                containerStyle={{
                    backgroundColor: COLORS.SPACECADET,
                    height: 100,
                    borderBottomWidth: 0,
                }}
            />
            <Content contentContainerStyle={styles.scroll_cont}>
                {
                    locations.map((o, i) => (
                        <CardWrapper key={i}>
                            <SavedTripsCard
                                name={o.name}
                                location={o.location}
                                onDeletePress={() => DeleteLocation(o.id)}
                            />
                        </CardWrapper>
                    )
                    )
                }
            </Content>
            <NavHome />
        </Page>
    }
}

export default SavedTrips;

const styles = StyleSheet.create({
    scroll_cont: {
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});