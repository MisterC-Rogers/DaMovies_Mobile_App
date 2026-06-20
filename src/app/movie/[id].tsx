import React from 'react';
import {View, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

const movieDetails = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Text>Details Screen for {id}</Text>
        </View>
    );
};

export default movieDetails;