import axios from "axios";
import { Memo } from "../types";

export const postMemo = async (data: Omit<Memo, 'id' | 'createdAt' | 'updatedAt' | 'isDone'>) => {
  try {
    const res = await axios.post('http://localhost:3000/memos', data, { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const updateMemo = async (id: string, data: Omit<Memo, 'id' | 'createdAt' | 'updatedAt' | 'isDone'>) => {
  try {
    const res = await axios.patch(`http://localhost:3000/memos/${id}`, data, { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const updateIsDone = async (id: string, param: string) => {
  try {
    const res = await axios.patch(`http://localhost:3000/memos/${param}/${id}`, { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMemosByIds = async () => {
  try {
    const res = await axios.delete('http://localhost:3000/memos/', { headers: { 'Content-Type': 'application/json' } });
    //DEV: console.log(res);
  } catch (error) {
    console.log(error)
  }
}