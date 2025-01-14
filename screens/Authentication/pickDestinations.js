import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components/native";
import { View, Modal, TextInput, Dimensions, StyleSheet, Text, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { Icon, Header } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapStyleAub } from '../../googlemaps/mapStyle.js';
import axios from 'axios';

import { COLORS } from '../../constants/styles.js';
import BusProgressBar from '../../comps/SignUp/busProgressBar.js';
import SignUpInput from '../../comps/SignUp/signUpInput.js';
import SignUpTransitCardScroll from '../../comps/SignUp/signUpTransitCardScroll.js';
import WhiteButton from '../../comps/Global/whiteButton.js';
import PickDestModal from '../../comps/SignUp/pickDestModal.js';
import { getAuth } from '@firebase/auth';

import Skip from '../../comps/SignUp/skip.js';

import { Video, AVPlaybackStatus } from 'expo-av';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Page = styled.View`
    width: ${windowWidth};
    height: ${windowHeight};
    background-color: ${COLORS.CAROLINABLUE};
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    width: 90%;
    height: 89%;
    justify-content: space-between;
    align-items: center;
`;

const BotContainer = styled.View`
    width: auto;
    position: relative;
    top: -5%;
    height: 700px;
    justify-content: space-between;
    align-items: center;
`;

const SkipCont = styled.View`
    flex-direction: row;
    width: 98%;
    justify-content: space-between;
    height: 50px;
`;

// const Skip = styled.TouchableOpacity`
//     font-family: 'Ubuntu_700Bold';
//     align-self: center;
// `;

const H1 = styled.Text`
    font-size: 38px;
    font-family: 'Ubuntu_400Regular';
    text-align: center;
    color: #fff;
`;

const H3 = styled.Text`
    font-size: 18px;
    font-family: 'Ubuntu_400Regular_Italic';
    color: #fff;
    top:-4%;
    position: relative;
    text-align: center;
`;

const MapContainer = styled.View`
     width: 100%;
    min-height: 325px;
    height:50%;
    padding: 5px;
    justify-content: center;
    align-items: center;
    /* top:-5%; */
    background-color: rgba(0, 105, 164, 0.65);
    border-radius: 10px;
    /* border:2px solid blue; */
`;

const SearchBar = styled.View`
    width: ${windowWidth / 1.25};
    position: absolute;
    top: 22%;
    z-index: 2;
`;


const PickDestinations = ({
    navigation = useNavigation()
}) => {
    const ref = useRef();

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

    //Modal

    //changing heading and subheading
    const [heading, setHeading] = useState();
    const [subheading, setSubheading] = useState();

    //set bus position
    const [busPosition, setBusPosition] = useState(0);

    //counter state that increments and changes page content 4 times
    const [pageCounter, setPageCounter] = useState(0);

     /* 🪓🪓🪓🪓🪓🪓🪓🪓🪓 AXIOS STUFF 🪓🪓🪓🪓🪓🪓🪓🪓🪓 */
    const [label, setLabel] = useState("");
    const AddCardToDb = async()=>{
        const associateAuth = getAuth();
        const fb_uid = associateAuth.currentUser.uid;
        const addressText = ref.current?.getAddressText();
        await axios.post('/saved_locations.php', {
            fb_uid: fb_uid,
            name: label,
            location: addressText
        });
    }
    /* 🪓🪓🪓🪓🪓🪓🪓🪓🪓 AXIOS STUFF END 🪓🪓🪓🪓🪓🪓🪓🪓🪓 */

    useEffect(()=>{
        //rules to change heading and subheading
        if (pageCounter === 0) {
            setHeading("Where do you live?");
            setSubheading("Get home quick and safely! Here are some of the fastest ways home!");
            setBusPosition(0);
            setLabel("Home");
            AddCardToDb();
        } else if (pageCounter === 1) {
            setHeading("Where is school?");
            setSubheading("Don't be late to class! Catch the fastest rides to school below!");
            setBusPosition('30%');
            ref.current?.clear();
            setLabel("School");
            AddCardToDb();
        } else if (pageCounter === 2) {
            setHeading("Where do you work?");
            setSubheading("Punch in to work on time! Catch these rides to help you get there faster!");
            setBusPosition('60%');
            ref.current?.clear();
            setLabel("Work");
            AddCardToDb();
        } else if (pageCounter === 3) {
            setHeading("Another place to go?");
            setSubheading("Time is money! Get there faster using these rides below!");
            setBusPosition('90%');
            ref.current?.clear();
            setLabel("Other");
            AddCardToDb();
        }
        RouteToApp;
    }, [pageCounter]);

    const RouteToApp = () => {
        navigation.navigate('Home');
    }

    const IncrementCount = () => {
        if (pageCounter < 3) {
            setPageCounter(prevState => prevState + 1);
        } else if (pageCounter === 3) {
            RouteToApp();
        } else {
            setPageCounter(0);
        }
    }

    //Back Button
    const DecrementCount = () => {
        if (pageCounter > 0) {
            setPageCounter(prevState => prevState - 1);
        } else {
            setPageCounter(3);
        }
    }

    //Map Search Bar State
    const [region, setRegion] = useState({
        latitude: 49.246292,
        longitude: -123.116226,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    //Map marker State
    const [markerDisplay, setMarkerDisplay] = useState(0);

    const [openModal, setOpenModal] = useState(false);

    const OpenModal = () => {
        setOpenModal(true);
    }

    const CloseModal = () => {
        setOpenModal(false);
    }

    const PressYes = () => {
        setOpenModal(false);
        navigation.navigate('Home');

    }



    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return <Page>
            <Skip
                openModal={openModal}
                onNoPress={CloseModal}
                onYesPress={PressYes}
                onClosePress={CloseModal}
            />
            <Header
                leftComponent={{
                    icon: 'arrow-back',
                    color: 'white',
                    size: 30,
                    onPress: DecrementCount,
                    iconStyle: { color: '#fff' }

                }}
                rightComponent={{
                    text: 'Skip',
                    onPress: OpenModal,
                    style: {
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: 'Ubuntu_500Medium_Italic'
                    }

                }}
                centerComponent={{
                    text: 'Pick Locations',
                    style: {
                        color: '#fff',
                        fontSize: 24,
                        fontFamily: 'Ubuntu_700Bold'
                    }
                }}
                containerStyle={{
                    backgroundColor: 'transparent',
                    height: 100,
                    borderBottomWidth: 0,
                    position: 'absolute',
                    top: 0,
                    zIndex: 10
                }}
            />
            <ImageBackground source={require("../../assets/pickdest_bg.png")} resizeMode="cover" style={styles.image}>
                <Container>
                    <BusProgressBar position={busPosition} />
                    <BotContainer>
                        <H1 style={styles.text_down}>{heading}</H1>
                        <H3>{subheading}</H3>
                        <SearchBar>
                            <GooglePlacesAutocomplete
                                ref={ref}
                                placeholder='Search Address'
                                fetchDetails={true}
                                GooglePlacesSearchQuery={{
                                    rankby: "distance"
                                }}
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    // console.log(data, details);
                                    setRegion({
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    });
                                    setMarkerDisplay(1);
                                }}
                                query={{
                                    key: 'AIzaSyAf9zPTlsgPwAuzcHvBFAaSVvD28CCAM7U',
                                    language: 'en',
                                    components: "country:can",
                                    // types: "establishments",
                                    radius: 40000,
                                    location: `${region.latitude}, ${region.longitude}`
                                }}
                            />
                        </SearchBar>
                        <MapContainer>
                            <MapView
                                provider="google"
                                initialRegion={{
                                    latitude: 49.246292,
                                    longitude: -123.116226,
                                    latitudeDelta: 1,
                                    longitudeDelta: 1,
                                }}
                                style={styles.map}
                                customMapStyle={MapStyleAub}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: region.latitude,
                                        longitude: region.longitude,
                                    }}
                                    pinColor={COLORS.CAROLINABLUE}
                                    opacity={markerDisplay}
                                />
                            </MapView>
                        </MapContainer>
                        <View style={{ top: '-6%' }}>
                            <WhiteButton
                                text="Continue"
                                onButtonPress={IncrementCount}
                            />
                        </View>
                    </BotContainer>
                </Container>
            </ImageBackground>
        </Page>
    }

}

export default PickDestinations;

const styles = StyleSheet.create({
    text_bold_white: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16

    },
    text_down: {
        position: 'relative',
        top: 30
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth
    },
    modal_center: {
        marginTop: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -2,
        borderRadius: 10
    }
});