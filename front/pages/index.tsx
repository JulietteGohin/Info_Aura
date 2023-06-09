import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import ReactSearchBox from "react-search-box";
import data from "./data.json" assert { type: "json" };

const host_name = "http://localhost:5000/api/";
const site_name = "http://localhost:3000/";

function Buildings_repr({ list }) {
  return (
    <div>
      <h2>known Buildings </h2>
      <ul>
        {list.map((building) => (
          <li key={building._id}>
            Nom : {building.name} id : {building._id}
          </li>
        ))}
      </ul>
    </div>
  );
}
/*fonction pour envoyer les données au serveur" */
const sendData = async (data) => {
  console.log("Sending Chat: " + JSON.stringify(data, null));
  const response = await fetch("http://localhost:5000/api/receive", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      sec_fetch_site: "cross-site",
    },

    body: JSON.stringify(data),
  });
};

export default function Home() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/buildings/list")
      .then((res) => res.json())
      .then((data) => {
        setBuildings(data.buildings ?? []);
      });
  }, []);
  const menuItems = ["Hauteur", "DPE", "Année construction", "superficie"];
  const [activeItem, setActiveItem] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  /*pour la barre de recherche maintenant*/

  const onSelect = (selected) => {
    const figure = data.find((figure) => figure.id === selected.id);

    sendData(selected);
  };

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };
  const filteredFigures = data.filter((figure) =>
    figure.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {" "}
      <Head>
        <title>Aura App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Buildings_repr list={buildings} />

        <h2>scrolling menu</h2>
        <div>
          <Menu
            items={menuItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>
        <h3>option chosen: </h3>
        <li key={menuItems[activeItem]}>{menuItems[activeItem]}</li>
        <h4>search bar</h4>
        <ReactSearchBox
          placeholder="rechercher pays"
          data={data}
          onSelect={onSelect}
          onChange={handleSearchInputChange}
        />
        <ul>
          {filteredFigures.map((figure) => (
            <li key={figure.id}>
              {figure.value} ({figure.continent})
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}