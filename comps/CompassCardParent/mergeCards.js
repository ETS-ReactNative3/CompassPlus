import React, { useState } from 'react';
import { Button, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Container = styled.View`
    width: 390px;
    height: 600px;
    background-color: #fff;
    border-radius: 30px;
    
    /* border-color: red;
    border-width: 2px; */
    
`;

const Notch = styled.View`
    width: 50px;
    height: 10px;
    background-color: #C4C4C4;
    margin: 20px 0px 0px;
    align-self: center;
    border-radius: 50px;
`;

const Title = styled.Text`
    font-size: 18px;
    color: #222222;
    align-self: center;
    margin: 20px 0px;
    font-weight: 700;
`;

const Divider = styled.View`
    width:100%;
    height:7px;
    background-color: #9BCCE0;
    margin: 0px 0px 30px 0px;
`;

const SettingCont = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:100%;
    /* border-width: 2px;
    border-color: red; */
    padding: 5px 15px;
    
`;

const SettingsContLeft = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* border-width: 2px;
    border-color: blue; */
`;

const SmallCardIcon = styled.Image`
    width:50px;
    height:50px;
    margin: 5px;
`;

const TextColumn = styled.View`
    width: 200px;
    margin-left:15px;
    /* border-color: red;
    border-width: 2px; */
`;

const SmallTitle = styled.Text`
    font-size: 10px;
    margin: 5px 0px;
`;

const Amount = styled.Text`
    font-size: 18px;
    color: #222222;
    align-self: flex-start;
    font-weight: 700;
`;

const Arrow = styled.Image`
    width:50px;
    height:50px;
    margin: 5px;
    align-self: flex-end;
    /* border-color: red;
    border-width: 2px; */
`;

const Line = styled.View`
    width:70%;
    height:2px;
    background-color: #c4c4c4;
    margin: 0px 20px 15px 50px;
    align-self: flex-end;
`;

const ButtonText = styled.Text`
    font-size: 18px;
    color: #fff;
    align-self: center;
    font-weight: 700;
`;





export default function MergeTab({
    fromAmount = '$10.00',
    toAmount = '$4.30',
    saveMerge = () => { },
}) {


    return (
        <Container>
            <Notch />
            <Title>Merge Tickets</Title>
            <Divider />

            {/* from this ticket: */}

            <SettingCont>
                <SettingsContLeft>
                    <SmallCardIcon
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }}
                    />
                    <TextColumn>
                        <SmallTitle>From this ticket</SmallTitle>
                        <Amount>{fromAmount}</Amount>
                    </TextColumn>
                </SettingsContLeft>
                <AntDesign name="down" size={30} color="#222222" />


            </SettingCont>

            <Line />

            {/* to ticket */}

            <SettingCont>
                <SettingsContLeft>
                    <SmallCardIcon
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }}
                    />
                    <TextColumn>
                        <SmallTitle>To this ticket</SmallTitle>
                        <Amount>{toAmount}</Amount>
                    </TextColumn>
                </SettingsContLeft>
                <AntDesign name="down" size={30} color="#222222" />


            </SettingCont>
            <Line />


            <TouchableOpacity
                onPress={saveMerge}
                style={styles.MergeButton}
            >
                <ButtonText>Merge</ButtonText>
            </TouchableOpacity>

        </Container>
    )

};



const styles = StyleSheet.create({
    MergeButton: {
        backgroundColor: '#009DDc',
        color: 'blue',
        width: 150,
        height: 55,
        borderRadius: 50,
        alignSelf: 'flex-end',
        right: 15,
        justifyContent: 'center',
        marginTop: 50,


    }
})