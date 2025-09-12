const BASE_URL = "http://www.aladin.co.kr/ttb/api";
const API_KEY = process.env.NEXT_PUBLIC_ALADIN_KEY;

export async function getBestSeller(page?: number, categoryId?: number) {
  const response = await fetch(
    `${BASE_URL}/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&CategoryId=${
      categoryId ?? 0
    }&MaxResults=10&start=${page}&SearchTarget=Book&output=JS&Cover=Big&Version=20131101`
  );
  const json = await response.json();
  return json;
}

export async function getNewBooks(page?: number) {
  const response = await fetch(
    `${BASE_URL}/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewSpecial&MaxResults=10&start=${page}&SearchTarget=Book&output=JS&Cover=Big&Version=20131101`
  );
  const json = await response.json();
  return json;
}

export async function getRecommendBooks(page?: number) {
  const response = await fetch(
    `${BASE_URL}/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemEditorChoice&MaxResults=10&start=${page}&SearchTarget=Book&CategoryId=50930&output=JS&Cover=Big&Version=20131101`
  );
  const json = await response.json();
  return json;
}

export async function getBookDetail(id: string) {
  const response = await fetch(
    `${BASE_URL}/ItemLookUp.aspx?ttbkey=${API_KEY}&itemIdType=isbn13&ItemId=${id}&output=JS&Version=20131101`
  );
  const json = await response.json();
  return json.item[0];
}

export async function getSearchKeyword(page: number, keyword: string) {
  const response = await fetch(
    `${BASE_URL}/ItemSearch.aspx?ttbkey=${API_KEY}&Query=${keyword}&QueryType=Title&MaxResults=10&start=${page}&SearchTarget=Book&Cover=Big&output=JS&Version=20131101`
  );
  const json = await response.json();
  return json;
}
