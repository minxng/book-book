interface BookItem {
  itemId: string;
  title: string;
}

interface PageProps {
  params: {
    keyword: string;
  };
}

async function searchKeyword(keyword: string) {
  const response = await fetch(
    `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbskmnjng2132001&Query=${keyword}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101`
  );
  const json = await response.json();
  return json;
}

export default async function List({ params }: PageProps) {
  const { keyword } = await params;
  const data = await searchKeyword(keyword);
  console.log(data);
  return (
    <div className="bg-amber-200">
      {data.item.map((book: BookItem) => (
        <li key={book.itemId}>{book.title}</li>
      ))}
    </div>
  );
}
