import dayjs from "dayjs"

/**
 * 処理を待つ関数
 * @param milliSeconds 
 * @returns 
 */
export const sleep = (milliSeconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliSeconds);
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