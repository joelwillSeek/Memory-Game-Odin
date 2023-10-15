import { useState, useEffect } from "react";

//style
import "../style/card.css";

let Card = ({
  search,
  setRandomize,
  setScore,
  defaultClicked,
  setFail,
}: any) => {
  let searchResult = getObjectOfNameAndUrl(search);

  let [clicked, setClicked] = useState(defaultClicked);

  let handleClick = () => {
    if (clicked) {
      setFail(true);
      setClicked(false);
    } else {
      setRandomize((previousValue: number) => ++previousValue);
      setClicked(true);
      setScore((previousValue: number) => ++previousValue);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={searchResult.urlGif} alt="" />
      <h6>{searchResult.nameGif}</h6>
    </div>
  );
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

export default Card;
