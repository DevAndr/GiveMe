import axiosInstance from "@/axios/axiosInstance";

export const getPokemons = async () => {
    const data = await axiosInstance.get('https://pokeapi.co/api/v2/pokemon')

    return data.data.results
}