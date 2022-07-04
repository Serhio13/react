import React, { FC, useEffect, useState } from "react";
import IceandfireApi from "../services/iceandfire";
import { Character } from "../types/type";


//не обязательные параметры
type TFilter = {
  page?: number;
  pageSize?: number;
}

/*КАСТОМНЫЙ ХУК useCharters
ПРИНИМАЕТ: initPage, initPageSize 
(необязательные аргументы, т.е если не передаём рендярятся все герои; ЗАПРОС ИДЕТ ПО:&{path}/characters)*/
const useCharters = ({ initPage, initPageSize }: { initPage?: number, initPageSize?: number }) => {
  const [characters, setCharacters] = useState<null | Character[]>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [filter, setFilter] = useState<TFilter>({
    page: initPage,
    pageSize: initPageSize,
  })

  //запрос на список героев 
  const getCharcters = async () => {
    //если при вызове useCharters аргументы передавались: запрос пойдёт по &{path}?page=${page}&pageSize=${pageSize}
    // не передавались: &{path}/characters
    const value = initPage && initPageSize ? filter : undefined
    setLoading(true)
    try {
      const res = await IceandfireApi.getCharacters(value?.page, value?.pageSize)
      setCharacters(res)
    } catch (e: any) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handlerPage = (type: "left" | "right") => (_e: any) => {
    //если аргументов не было, кнопки не рендерим, выходим из функции
    if (!initPage && !initPageSize) return;

    if (type === "left" && filter?.page && filter?.page > 1) {
      setFilter({ ...filter, page: filter?.page - 1 });
    } else if (filter?.page) setFilter({ ...filter, page: filter?.page + 1 });
  };

  useEffect(() => {
    //запрос за героями при каждой смене filtr.page
    getCharcters();
  }, [filter.page])

  //ВОЗВРАЩЕТ: error, loading, characters, filter, handlerPage
  return { loading, error, characters, filter, handlerPage }
}
export { useCharters };