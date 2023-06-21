import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import ReactSearchBox from "react-search-box";

/* variables fixes*/

const host_name = "http://localhost:5000/api/";
const site_name = "http://localhost:3000/";
const menuItems = ["Hauteur", "DPE", "Année construction", "superficie"];

/*fonction pour afficher les données du serveur" */

function Buildings_repr({ list }) {
  return (
    <div className={styles.history}>
      <h2>History</h2>
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
function Locations_repr({ list }) {
  return (
    <div>
      <h2>known locations </h2>
      <ul>
        {list.map((item) => (
          <li key={item.id}>Nom : {item.nom}</li>
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
  const [activeIndicator, setActiveIndicator] = useState<string>(""); //item actif dans le menu

  const [filteredCities, setFilteredCities] = useState<
    { id: number; nom: string; code_postal: string }[]
  >([]);

  const [buildings, setBuildings] = useState([]);

  const [imageSrc, setImageSrc] = useState("/pictures/ploted.png");

  /*récupérons les données du serveur */
  /* d'abord les bâtiments */

  useEffect(() => {
    fetch("http://localhost:5000/api/buildings/list")
      .then((res) => res.json())
      .then((data) => {
        setBuildings(data.buildings ?? []);
      });
  }, []);

  /* pour barre de recherche maintenant*/
  const [data2, setData2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/searchbar/list"
        );
        const jsonData = await response.json();
        setData2(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    //console.log("data2: ");
    //console.log(data2);
  }, []);
  // utilisation de la barre de recherche
  const searchHandler = (nom: string) => {
    // it triggers when input changes
    const filtered = data2.filter(
      (item: { id: number; nom: string; code_postal: string }) =>
        item.nom.includes(nom) //toLowercase() pour ignorer la casse
    );

    setFilteredCities(filtered);
  };
  const onSelect = (selected) => {
    // it is triggered when an item is selected from the search box
    console.log("selected: ", selected.item);
    const nom = selected.item.label;
    sendData(selected.item);
    setImageSrc("/pictures/" + nom + ".png");
  };
  const cityOptions = filteredCities.map((city) => ({
    value: `${city.nom} (${city.code_postal})`,
    label: `${city.nom}`,
  }));

  return (
    <>
      <div>
        <Head>
          <title>Aura App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.header}>
          <h1>Aura app</h1>
          <h2>Le site de plotting de data</h2>
        </div>
        <div>
          <h4>search bar</h4>
          <ReactSearchBox
            placeholder="Search city"
            data={cityOptions}
            onSelect={onSelect}
            onChange={(value) => {
              searchHandler(value);
            }}
            onFocus={() => {
              searchHandler("");
            }}
            autoFocus
          />
        </div>

        <div>
          <main className={styles.main}>
            <div className={styles.sub_header}>
              <h2>Scrolling menu</h2>
            </div>
            <div>
              <Menu
                items={menuItems}
                activeItem={activeIndicator}
                setActiveItem={setActiveIndicator}
              />
            </div>
            <div>
              <h3>Option chosen:</h3>
              <li key={menuItems[activeIndicator]}>
                {menuItems[activeIndicator]}
              </li>
            </div>
            <div className={styles.graphe}>
              <h3> Graphe d'interprétations</h3>
              <img src={imageSrc} alt="Image" className={styles.image} />
              <p>Ces statistiques sont prélevées sur des données</p>
            </div>
            <Locations_repr list={data2} />
            <Buildings_repr list={buildings} />
          </main>
        </div>
      </div>
    </>
  );
}
