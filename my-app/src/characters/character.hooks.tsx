import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import IceandfireApi from "../services/iceandfire";
import { Character } from "../types/type";


const useCharacter = (url?: string | null) => {
  const {data, getData, loading, error} = useFetch<Character>(IceandfireApi.getCharterInfo, url)
  

  useEffect(() => {
    url && getData();
  }, [url])

  return { data, loading, error  }
}

export { useCharacter };