import axios from "axios";
import { Memo } from "../types";

export const postMemo = async (data: Omit<Memo, 'id' | 'createdAt' | 'updatedAt' | 'isDone'>) => {
  try {
    const res = await axios.post('http://localhost:3000/memos', data, { headers: { 'Content-Type': 'application/json' } });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const updateMemo = async (id: string, data: Omit<Memo, 'id' | 'createdAt' | 'updatedAt' | 'isDone'>) => {
  try {
    const res = await axios.patch(`http://localhost:3000/memos/${id}`, data, { headers: { 'Content-Type': 'application/json' } });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const updateIsDone = async (id: string, endpoint: string) => {
  try {
    const res = await axios.patch(`${endpoint}${id}`, { headers: { 'Content-Type': 'application/json' } });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};