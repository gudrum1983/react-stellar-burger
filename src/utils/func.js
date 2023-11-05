import {useParams} from "react-router-dom";


export function usePrintParams() {
  let params = useParams();
  console.log('params',params)
}