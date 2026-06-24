import {Image, View, Text, ActivityIndicator, FlatList} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import useFetch from "../../../services/useFetch";
import {fetchMovies} from "../../../services/api";
import MovieCard from "@/components/movieCard";
import {useEffect, useState} from "react";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('')

    // fetch movie data with the custom hook
    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset
    }: {
        data: Movie[] | null;
        loading: boolean;
        error: Error | null;
        refetch: () => Promise<void>;
        reset: () => void
    } = useFetch(():Promise<Movie[]> => fetchMovies({ query: searchQuery }), false)

    useEffect(():() => void => {
        const timeoutID:number = setTimeout(async ():Promise<void> => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500);

        return ():void => clearTimeout(timeoutID);
    }, [searchQuery])

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode={"cover"} />
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <MovieCard
                        {...item}
                    />
                )}
                keyExtractor={(item:Movie):string => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent:'center',
                    gap: 16,
                    marginVertical: 16
                }}
                className={'px-5'}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                <>
                    <View className={'w-full flex-row justify-center mt-20 items-center'}>
                        <Image source={icons.logo} className={'w-12 h-10'} />
                    </View>
                    <View className={'my-5'}>
                        <SearchBar
                            placeholder={'Search Movies...'}
                            value={searchQuery}
                            onChangeText={(text: string):void => setSearchQuery(text)}
                        />
                    </View>
                    {loading && (
                        <ActivityIndicator
                            size='large'
                            color="#0000ff"
                            className={'my-3'}
                        />
                    )}

                    {error && (
                            <Text className={'text-red-500 px-5 my-3'}>
                                Error: {error?.message}
                            </Text>
                    )}

                    {!loading && !error && searchQuery.trim() && movies?.length > 0 &&
                        (
                            <Text className={'text-xl text-white font-bold'}>
                                Search Results For{" "}
                                <Text className={'text-accent'}>{searchQuery}</Text>
                            </Text>
                        )}
                </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className={'mt-10 px-5'}>
                            <Text className={'text-center text-gray-500'}>
                                {searchQuery.trim() ? 'No Movies Found' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
}
