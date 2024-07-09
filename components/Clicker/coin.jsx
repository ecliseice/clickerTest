"use client"

import '@/styles/App.css';

import React, { useEffect, useState } from "react";
import { addClick, get } from "@/app/lib/db";

import { useSearchParams } from "next/navigation";

function Coin() {

    const [ clicks, setClicks ] = useState(null);

    const url     = useSearchParams();
    const user_id = url.get('user_id');

    const getData = async () => {
        await get(user_id).then((res) => setClicks(parseInt(res ?? "0")))
    }

    const onClick = async (e) => {
        setClicks(prevState => prevState + 1)

        const span     = document.createElement('span')
        span.innerText = "+1";

        span.style.cssText = `top:${ e.pageY - 80 }px;left:${ e.pageX }px;`;

        document.getElementById('numbers').appendChild(span)
        setTimeout(() => {
            span.remove();
        }, 500)
    }

    const saveClicks = async () => {
        if ( !user_id ) return;
        await addClick(user_id, clicks)
    }

    useEffect(() => {
        if ( clicks )
            saveClicks();
    }, [ clicks ]);

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="content">
            <div id="numbers"></div>
            <div style={ { height: 'fit-content' } }>
                <img src="/coin.png" alt=""
                     onClick={ onClick }
                />
                <div className="counter">{ clicks }</div>
            </div>
        </div>
    );
}

export default Coin;