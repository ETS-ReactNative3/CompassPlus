import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { Icon } from 'react-native-elements';

import { COLORS } from '../../constants/styles.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
    width: ${windowWidth};
    height: 40%;
    background-color: ${COLORS.SPACECADET};
    justify-content: space-evenly;
    align-items: center;
`;

const CardPlaceholder = styled.TouchableOpacity`
    width: 308px;
    height: 193px;
    border: 3px dashed ${COLORS.CAROLINABLUE};
    justify-content: space-evenly;
    align-items: center;
`;

const PlaceholderContent = styled.View`
    width: 200px;
    height: 90px;
    justify-content: space-between;
`;

const H1 = styled.Text`
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    position: relative;
    top: 15px;
`;

const H2 = styled.Text`
    color: ${COLORS.CAROLINABLUE};
    font-size: 18px;
    text-align: center;
`;


const HomeCompassCard = ({
    username = "User",
    onButtonPress = () => {}
}) => {
    return <Container>
        <H1>Hello {username}!</H1>
        <CardPlaceholder>
            <PlaceholderContent onPress={onButtonPress}>
                <Icon 
                    name='add'
                    type='material'
                    color={COLORS.CAROLINABLUE}
                    size={40}
                />
                <H2>Add your compass card or debit/credit card</H2>
            </PlaceholderContent>
        </CardPlaceholder>
    </Container>
}

export default HomeCompassCard;