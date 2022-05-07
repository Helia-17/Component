let searchInput = document.querySelector(".SearchInput__input");

const checkInput = () => {
  const beforeInput = searchInput.value.toLowerCase();
  timer(beforeInput);
};

const timer = (beforeInput) => {
  setTimeout(() => {
    if (searchInput.value === beforeInput) {
      // console.log("입력멈춤");
      getResult(searchInput.value); // 0.5초 내에 입력창이 변했다면 데이터 로드
      checkInput();
    } else {
      // console.log("입력변함");
      checkInput();
    }

    if (searchInput.value === "") {
      // 입력창이 비었다면 추천 검색어 리스트 숨김
      // console.log('EMPTY')
    }
    //   relContainer.classList.add("hide");
    // } else {
    //   relContainer.classList.remove("hide");
    // }
  }, 800);
};

const getResult = async (query) => {
  let cache = "";
  if (cache === query)
    return; // 이전에 부른 데이터랑 다를 때만 fetch로 데이터를 새로 불러온다.
  else {
    cache = query;
    try {
      const response = await fetch(
        `https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${query}`
      );
      const results = await response.json();
      // console.log(results);
      renderNodes(results, query);
    } catch (error) {
      console.log(error);
    }
  }

  function makeNode(result, query) {
    const queryIndex = result.toLowerCase().indexOf(query);

    // 일치하는 부분 노드 생성
    const match = result.substring(queryIndex, queryIndex + query.length);

    const $matchNode = document.createElement("span");
    const $matchtextNode = document.createTextNode(match);
    $matchNode.appendChild($matchtextNode);
    $matchNode.classList.add("Suggestion__item--matched");

    const $node = document.createElement("li");

    let part;
    // 매치 쿼리가 앞에 위치
    if (queryIndex == 0) {
      part = result.substring(queryIndex + query.length);
      $node.appendChild($matchNode);

      const $textNode = document.createTextNode(part);
      $node.appendChild($textNode);

      //  매치 쿼리가 뒤에 위치
    } else if (queryIndex + query.length == result.length) {
      part = result.substring(0, queryIndex);
      const $textNode = document.createTextNode(part);
      $node.appendChild($textNode);

      $node.appendChild($matchNode);
      // 매치 쿼리가 사이에 위치
    } else {
      const textParts = [
        result.substring(0, queryIndex),
        result.substring(queryIndex + query.length),
      ];
      console.log(textParts);
      const $firstTextNode = document.createTextNode(textParts[0]);
      $node.appendChild($firstTextNode);

      $node.appendChild($matchNode);

      const $secondTextNode = document.createTextNode(textParts[0]);
      $node.appendChild($secondTextNode);
    }

    return $node;
  }

  function renderNodes(results, query) {
    const $Suggenstion = document.querySelector(".Suggestion");

    const $oldList = document.querySelector(".Suggestion ul");
    const $newList = document.createElement("ul");
    results.forEach((result) => {
      const node = makeNode(result, query);
      $newList.appendChild(node);
    });
    $Suggenstion.replaceChild($newList, $oldList);
  }
};
