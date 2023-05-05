import axios from "axios";
import { Memo } from "../types";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT_DEV;

export const postMemo = async (data: Omit<Memo, 'id' | 'createdAt' | 'updatedAt' | 'isDone'>) => {
  try {
    const res = await axios.post(ENDPOINT, data, { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const updateMemo = async (id: string, data: Omit<Memo, 'id' | 'createdAt' | 'updatedAt' | 'isDone'>) => {
  try {
    const res = await axios.patch(`${ENDPOINT}/${id}`, data, { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const updateIsDone = async (id: string, param: string) => {
  try {
    const res = await axios.patch(`${ENDPOINT}/${param}/${id}`, { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMemosByIds = async () => {
  try {
    const res = await axios.delete(`${ENDPOINT}`, { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error)
  }
}