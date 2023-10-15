import { ReactElement, useEffect, useState } from "react";
import Card from "./components/Card";

//style
import "./style/app.css";
import "./style/card.css";

function App() {
  let [searchWord, setSearchWord] = useState([
    "Avengers",
    "Iron Man",
    "Black Panth Er",
    "Deadpool",
    "Captain Ame Rica",
    "Jessica Jone",
    "Ant-Man",
    "Captain Marvel",
    "Guardians Of The Galaxy",
    "Wolverine",
    "Luke Cage",
    "Black Panther",
  ]);

  let [cardList, setCardList] = useState([]);

  let [randomize, setRandomize] = useState(0);

  let [fail, setFail] = useState(false);

  let [score, setScore] = useState(0);

  useEffect(() => {
    let list: any = searchWord.map((value: any, index: number) => (
      <Card
        search={value}
        setRandomize={setRandomize}
        setScore={setScore}
        key={index}
        defaultClicked={false}
        setFail={setFail}
      ></Card>
    ));

    setCardList(list);
  }, []);

  useEffect(() => {
    if (fail) {
      setScore(0);
      setFail(false);
    }
    setCardList((previousCardList: any): any => [
      ...shuffleArray(previousCardList),
    ]);
  }, [randomize, fail]);

  return (
    <>
      <h1>Score:{score}</h1>
      {cardList}
    </>
  );
}

let shuffleArray = (array: any[]): any[] => {
  let setArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = setArray[i];
    setArray[i] = setArray[j];
    setArray[j] = temp;
  }
  return setArray;
};

export default App;
