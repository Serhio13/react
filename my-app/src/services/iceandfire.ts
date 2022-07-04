import { Book, Character } from "../types/type";

const path = "https://www.anapioficeandfire.com/api/";

//запрос к серверу за данными 
export async function getData(url: string): Promise<any> {
  
  const res = await fetch(`${path}${url}`);
  if (!res.ok) new Error(`Could not fetch ${url}` + `, received ${res.status}`)
  return res.json();
}
export async function getDataLink(url: string): Promise<any> {
  const res = await fetch(`${url}`);
  if (!res.ok) new Error(`Could not fetch ${url}` + `, received ${res.status}`)
  return res.json();
}

//запрос с пагинацией page-к какой странице запрос, pageSize-сколько элементов на странице
export default class IceandfireApi {
  static async getBooks(page: number, pageSize: number): Promise<Book[]> {
    return await getData(`/books?page=${page}&pageSize=${pageSize}`);
  }
  static async getCharacters(page?: number, pageSize?: number): Promise<Character[]> {
    const params = page && pageSize ? `?page=${page}&pageSize=${pageSize}` : ''
    return await getData(`/characters${params}`);
  }
  static async getCharterInfo(url: string): Promise<Character> {
    return await getDataLink(url);
  }
}

