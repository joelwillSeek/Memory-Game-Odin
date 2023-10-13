import { ReactNode, useEffect, useState } from "react";
import "./style/app.css";
import "./style/card.css";

function App() {
  let [randomize, setRandomize] = useState(0);

  let [score, setScore] = useState(0);

  let [cardList, setCardList]: any = useState([
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

  useEffect(() => {
    console.log("randomixe");
    setCardList((list: any) => [...shuffleArray(list)]);
  }, [randomize]);

  return (
    <>
      <h1 key={0}>Score:{score}</h1>
      {cardList.map((value: any, index: number) => (
        <Card
          key={index}
          search={value}
          setScore={setScore}
          setRandomize={setRandomize}
        />
      ))}
    </>
  );
}

let Card = (props: any) => {
  let objGif = getObjectOfNameAndUrl(props.search);
  let [clicked, setClicked] = useState(false);

  let handingClick = () => {
    if (clicked) props.setRandomize((perviousValue: any) => ++perviousValue);
    else {
      props.setScore((previousScore: any) => ++previousScore);
      setClicked(true);
    }
  };

  return (
    <div className="card" onClick={handingClick}>
      <img src={objGif.urlGif} alt="card" />
      <h5>{objGif.nameGif}</h5>
    </div>
  );
};

let shuffleArray = (array: string[]): any[] => {
  let setArray = array;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = setArray[i];
    setArray[i] = setArray[j];
    setArray[j] = temp;
  }
  return setArray;
};

let getObjectOfNameAndUrl = (search: string) => {
  let [urlGif, setUrlGif] = useState("");
  let [nameGif, setNameGif] = useState("");

  let apiKey = "HYiNlMpblM4FEfjah7kJ6txxXSRXS7JL";

  let getGif = async () => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=16&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

    let urlResponse = await fetch(url);
    let response = await urlResponse.json();
    let data = response.data[0].images.original.url;
    let name = response.data[0].title;

    setUrlGif(data);
    setNameGif(name);
  };

  useEffect(() => {
    getGif();
  }, []);

  return { urlGif, nameGif };
};

export default App;
