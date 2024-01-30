function extractDataUrlImages(inputString) {
  // 정규식을 사용하여 Data URL 형식 찾기
  const regex = /!\[image\.png\]\(data:image\/png;base64,([^)]*)\)/g;
  const matches = inputString.match(regex);

  if (matches) {
      // 매치된 부분들 반환
      const imageDataArray = matches.map(match => match.replace(regex, '$1'));
      return imageDataArray;
  } else {
      // 매치되는 부분이 없으면 빈 배열 반환
      return [];
  }
}

// 함수 호출
const inputString = 'Some text ![image.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADqCAYAAABk+DOYAAAgAElEQVR4Aey8Z3AU5/rt2zM9PT09sSdqlLNQHkUUQEgEAQJJZETOGUTOJmNsA8KB5ICJxoAtMJicBSaLnHMyGWPAabvuh//9XUv73E+nat/zP2ffT9uqmqpRqJp6n7fXE9Zajw) Some more text ![image.png](data:image/png;base64,ABC123XYZ)';
const result = extractDataUrlImages(inputString);
console.log(result);



