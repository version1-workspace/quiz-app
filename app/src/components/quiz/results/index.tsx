import { useEffect, useState } from "react";
import { Quiz } from "@/models/quiz";
import { Result } from "@/models/result";
import { fetchResults } from "@/services/api/result";

type Props = {
  data: Quiz;
};

export default function ResultsComponent({ data }: Props) {
  const [list, setList] = useState<Result[]>();
  useEffect(() => {
    const init = async () => {
      const res = await fetchResults(data.id);
      setList(res);
    };

    init();
  }, []);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {list?.map((it) => (
        <li key={it.id}>
          <div>{it.quiz.title}</div>
          <div>{it.pass}</div>
          <div>{it.total}</div>
        </li>
      ))}
    </ul>
  );
}
