import React, {useEffect, useRef, useState} from "react";
import closeTag from '@/assets/img/tag-close.svg'
import "./index.scss";


const Tag=(props)=>{
    const {closeTagAction,value,index,inputOnchange,onFocus,onblur} = props;
    const [readOnly,setReadOnly]=useState(value!==undefined&&value!=='')

    const inputRef=useRef()

    const onKeyDown = (event) => {
        const keyCode = event.keyCode || event.which || event.charCode;
        if (keyCode === 13) {
            onblur?.(inputRef.current.value,index)
            if(inputRef.current.value.trim()!==''){
                setReadOnly(true);
            }
        }
    }

    useEffect(()=>{
        if (!value){
            inputRef.current.focus()
        }
    },[])

    const fillterAllSpace = (str) => {
        return str.replaceAll(" ", "")
    }
    return(
        <div className='tag-body'>
            <span>{inputRef?.current?.value?inputRef?.current?.value:(value? value : 'n')}</span>
            <input
                ref={inputRef}
                readOnly={readOnly}
                defaultValue={value}
                type={"text"}
                onFocus={(e)=>{
                    if(!readOnly){
                        onFocus?.()
                    }
                }}
                onBlur={(e)=>{
                    if(!readOnly){
                        onblur?.(e.target.value,index)
                        if(e.target.value.trim()!==''){
                            setReadOnly(true);
                        }
                    }
                }}
                onKeyDown={(e)=>{onKeyDown(e)}}
                onInput={(e)=>{
                    const tempWidth=fillterAllSpace(inputRef.current.value).length
                    if(tempWidth>25){
                        inputRef.current.value =  inputRef.current.value.slice(0,25);
                        if(!readOnly){
                            onblur?.(inputRef.current.value,index)
                            if(inputRef.current.value.trim()!==''){
                                setReadOnly(true);
                            }
                            inputOnchange?.(0)
                        }
                        return
                    }
                    inputOnchange?.(fillterAllSpace(inputRef.current.value).length)
                }}
            />
            {
                readOnly&&
                <img src={closeTag} alt={''} onClick={()=>{closeTagAction?.(index)}}/>
            }
        </div>
    )
}
export default Tag