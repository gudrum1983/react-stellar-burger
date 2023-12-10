import {useState} from "react";


export function useValue() {
   const [value, useValue] = useState("")

  return [value, useValue]

}