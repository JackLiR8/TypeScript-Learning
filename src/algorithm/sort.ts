+(() => {

  let arr: number[] = [2, 4, 7, 1, 6, 9, 3, 0, 5, 8];

  /**
   * 冒泡排序
   * @param data 要排序的数组
   */
  function bubbleSort(data:number[]): number[] {
    let a: number[] = [...data];

    for (let i: number = 0; i < a.length - 1; i++) {

      for (let j: number = 0; j < a.length - i - 1; j++) {
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]]
        }
      }
    }

    return a
  }

  console.log(bubbleSort(arr));

  /**
   * 快速排序
   * @param data 要排序的数组
   */
  function quickSort(data: Array<number>) {
    if (data.length <= 1) {
      return data
    }

    let a: number[] = [...data];
    let [left, right] = [[], []];
    let base: number = a.shift();

    for (const v of a) {
      if (v < base) {
        left.push(v)
      } else {
        right.push(v)
      }
    }

    return [...quickSort(left), base, ...quickSort(right)]
  }

  console.log(quickSort(arr), arr);

})()