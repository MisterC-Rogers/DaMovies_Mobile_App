import React from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native";
import {Link} from "expo-router";
import {icons} from "@/constants/icons";

const MovieCard = ({id, poster_path, title, vote_average, release_date, original_language}: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className={'w-[30%]'}>
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className={'rounded-lg w-full h-52'}
                    resizeMode={'cover'}
                />
                <Text className={'text-sm font-bold text-white mt-2'} numberOfLines={1}>{title}</Text>
                <View className={"flex-row items-center justify-start gap-x-1"}>
                    <Image source={icons.star} className={"size-4"}/>
                    <Text className={'text-sm font-bold text-white uppercase'}>{Math.round(vote_average / 2)}</Text>
                </View>
                <View className={"flex-row items-center justify-between"}>
                    <Text className={'text-sm text-light-200 font-medium mt-1'}>{release_date?.split('-')[0]}</Text>

                    {/*
                        Find a way to add a tiny flag for the original_language
                        <Text className={'text-sx text-light-300 font-medium'}>Lang: {original_language}</Text>
                    */}
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;