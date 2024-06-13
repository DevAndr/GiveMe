// 'use client'

import React, {FC} from 'react';
import SignUpDialog from '@/components/dialog/SignUpDialog';
import SignInDialog from '@/components/dialog/SignInDialog';
import {getPokemons} from "@/api/PokemonService";

interface PageProps {

}

const Page: FC<PageProps> = async ({}) => {

    const pokemons = await getPokemons()

    console.log(pokemons)



    return (
        <div>
            <h1>wish lists</h1>
            <ul>
                {
                   // Array(100).fill(null).map((_, index) => (<li key={index}>{index}</li>))
                   //  pokemons.map(p => <li>{p.name}</li>)
                }
            </ul>
        </div>
    );
};

export default Page;