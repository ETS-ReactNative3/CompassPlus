import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TextInput, Dimensions, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { COLORS } from '../../constants/styles.js';

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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Page = styled.View`
    width: ${windowWidth};
    height: ${windowHeight};
    background-color: ${COLORS.ALICEBLUE};
    align-items: center;
`;

const Container = styled.View`
    width: 320px;
    height: 440px;
    justify-content: space-between;
    align-items: flex-end;
    top: 170px;
`;

const TextCont = styled.View`
    width: 300px;
    height: 252px;
    justify-content: space-between;
`;


const H1 = styled.Text`
    font-family: 'Ubuntu_400Regular';
    font-size: 40px;
    color: #fff;
    align-self: flex-start;
`;

const Button = styled.TouchableOpacity`
    background-color: #fff;
    width: 244px;
    height: 58px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`;

const CreateAccount = () => {
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
        <Container>
            <H1>
                Create an Account
            </H1>
            <TextCont>
            <TextInput
                style={styles.text_input}
                placeholderTextColor='616161'
                placeholder="Name ..."
            />
            <TextInput
                style={styles.text_input}
                placeholderTextColor='616161'
                placeholder="Email ..."
            />
            <TextInput 
                style={styles.text_input}
                placeholderTextColor="616161"
                placeholder="Password ..."
                secureTextEntry={true}
                autoCorrect={false}
            />
            <TextInput
                style={styles.text_input}
                placeholderTextColor='616161'
                placeholder="Compass Card (Optional)"
            />
            </TextCont>
            <Button/>
        </Container>
    </Page>
    }
}
export default CreateAccount;

const styles = StyleSheet.create({
    text_input: {
        height: 55,
        width: 300,
        borderWidth: 2,
        borderColor: '#009DDC',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        fontSize: 20
    }
});