import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const[data,setData] = useState()
    const[isLodding,setIsLodding] = useState(true)
    const[error,setError] = useState(null)
    const[filterDatra,setFilterData] = useState(data)

    useEffect(_=>{
        fetch(url)
        .then(res=>{
            return res.json()
        })
        .then(quranData=>{
            setData(quranData)
            setFilterData(quranData)
            setIsLodding(false)
            setError(false)
        })
        .catch(err=>{
            setData(false)
            setIsLodding(false)
            setError(true)
        })
    },[url])

    return {data,isLodding,error, filterDatra, setFilterData}
}

export default useFetch
