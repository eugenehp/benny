const comparator = (n:number, m:number) => n < m ? -1 : 1;

export const median = (data:number[]) => {
  data.sort(comparator);
  if (data.length % 2 === 0) {
    return (data[data.length / 2 - 1] + data[data.length / 2]) / 2;
  }
  return data[Math.floor(data.length / 2)];
}
