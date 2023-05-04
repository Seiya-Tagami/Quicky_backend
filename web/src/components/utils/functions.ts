import dayjs from "dayjs"

export const sleep = (miliSeconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), miliSeconds);
  });
};
/**
 * DBの日付データをフォーマットする用の関数
 * @param d 
 * @returns 
 */
export const formatDate = (d: string | Date) => {
  const result = dayjs(d).format('MM/DD');
  return result
}