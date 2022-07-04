import { useEffect, useState } from "react";

function useFetch<T = any>(servise: Function, url?: string | null)  {
    const [data, setData] = useState<null | T>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const getData = async () => {
        setLoading(true)
      try {
        const res = await servise(url)
        setData(res)
      }
      catch (e: any) {
        setError(true);
        console.log(e.message)
      }
      finally {
        setLoading(false)
      }
    } 
    useEffect(() => {
        url && getData()
    }, [url])

    return {loading, error, data, getData}
}
export default useFetch;