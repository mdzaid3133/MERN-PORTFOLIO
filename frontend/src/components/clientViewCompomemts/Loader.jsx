import React from 'react'
import { Vortex } from 'react-loader-spinner'

function Loader() {
    return (
        <div class="w-full h-screen bg-gray-900 dark:bg-white flex items-center justify-center">

        <div
            class=" w-[10rem] h-[10rem] grid place-items-center [transition:all_400ms_ease] hover:-translate-y-[1rem]">
    
            <div class="w-[7rem] h-[7rem] absolute bg-yellow-600/30 rounded-lg animate-[spinIn_1s_linear_infinite]"></div>
            <div class="w-[8rem] h-[8rem] absolute bg-yellow-600/20 shadow-xl rounded-full"></div>
            <p
                class="bg-gradient-to-r from-sky-500 to-yellow-500/30 rounded-full text-center inline-flex items-center text-[#000e17] font-semibold w-[10rem] h-[10rem] flex justify-center animate-[spinOut_1s_linear_infinite]">
    
            <h3 class="absolute -rotate-[360deg] text-white text-sm font-serif font-semibold">LOADING ...</h3>
            </p>
        </div>
    </div>
    )
}

export default Loader