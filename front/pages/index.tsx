 import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import ReactSearchBox from "react-search-box";
import data from "./data.json" assert { type: "json" };

/* variables fixes*/

const host_name = "http://localhost:5000/api/";
const site_name = "http://localhost:3000/";
const menuItems = ["A", "B", "C", "D","E","F"];

/*fonction pour afficher les données du serveur" */

function Buildings_repr({ list }) {
  return (
    <div className={styles.history}>
      <h2>History</h2>
      <ul>
        {list.map((building) => (
          <li key={building._id} className={styles.list} >
            Nom : {building.name} id : {building._id}
          </li>
        ))}
      </ul>
    </div>
  );
}

/*fonction pour envoyer les données */
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
  /*déclarons toutes les VARIABLES D ETAT dont nous aurons besoin */
  const [activeItem, setActiveItem] = useState<string>(""); //item actif dans le menu
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<
    { id: number; value: string; continent: string }[]
  >([]);

  const [selectedItem_city, setSelectedItem_city] = useState<{
    id: number;
    value: string;
    continent: string;
  }>({
    id: 0,
    value: "",
    continent: "",
  });

  const [buildings, setBuildings] = useState([]);
  const [imageSrc, setImageSrc] = useState("/pictures/ploted.png");

  /*récupérons les données du serveur */
  useEffect(() => {
    fetch("http://localhost:5000/api/buildings/list")
      .then((res) => res.json())
      .then((data) => {
        setBuildings(data.buildings ?? []);
      });
  }, []);

  /* barre de recherche maintenant*/

  const searchHandler = (value) => {
    const filteredItems = data.filter((item) =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const onSelect = (selected) => {
    // const figure = data.find((figure) => figure.id === selected.id);
    console.log("selected: ", selected.item.value);
    sendData(selected);
    setImageSrc("/pictures/" + selected.item.value + ".png");
  };

  return (
    <>
    <div>
      <Head>
        <title>Aura App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={styles.body}>
        <header className={styles.header}>
          <h1>Aura App</h1>
          <h2>Le site de comparateur</h2>
        </header>
        <main className={styles.main}>
          <div className={styles.sub_header}>
            <h2>Scrolling menu</h2>
          </div>
          <div>
            <Menu
              items={menuItems}
              activeItem={activeItem}
              setActiveItem={setActiveItem}  
              />
          </div>
          <div className={styles.grid_container}>
            <div className={styles.item}>
              <div className={styles.left}>
                <label>Search Bar:
                  <ReactSearchBox
                    placeholder="Search countries"
                    data={filteredData}
                    onSelect={onSelect}
                    onChange={(value) => {
                      searchHandler(value);
                    }}
                    onFocus={() => {
                      searchHandler("");
                    }}
                    autoFocus
                  />
                </label>
                <div>
                  <h3>Option chosen:</h3>
                  <li key={menuItems[activeItem]}>{menuItems[activeItem]}</li>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.right}>
                <div className={styles.graphe}>
                  <h3 className={styles.title}> Graphe d'interprétations</h3>
                  <img src={imageSrc} alt="Image" className={styles.image} />
                  <p className={styles.texte}>Ces statistiques sont prélevées sur des données</p>
                </div>
              </div>
            </div>           
          </div>
          <Buildings_repr list={buildings} />
        </main>
        <footer className={styles.footer}>
          <div className={styles.grid}>
            <div className={styles.item_footer}>
              <h6>About</h6>
            </div>
            <div className={styles.item_footer}>
              <h6>Quick Links</h6>
            </div>
            <div className={styles.item_footer}>
              <div className={styles.data_gouv_ensemble}>
                <p>Lien des données d'orgine</p>
                <a href="https://www.ecologie.gouv.fr/diagnostic-performance-energetique-dpe"> <img src="/data_gouv.png" alt="data_gouv" className={styles.data_gouv}></img> </a>
              </div>
            </div> 
            <div className="col">
              <p className={styles.copyright_text}>Copyright &copy; 2017 All Rights Reserved by </p>
            </div>  
          </div>
        </footer>
      </body>
    </div>
    </>
  );
}
