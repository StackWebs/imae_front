import React, {useEffect} from "react";
import {SelectSingle} from "./single";
import {SelectMultiple} from "./multiple";


export function Select(props:any) {
    const type = props.type

    if(type === "single") return <SelectSingle {...props}/>;
    if(type === "multiple") return <SelectMultiple {...props}/>;


    return null;
}
