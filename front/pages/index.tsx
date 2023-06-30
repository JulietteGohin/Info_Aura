import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import ReactSearchBox from "react-search-box";

/* variables fixes*/

const menuItems = ["A", "B", "C", "D","E","F"];
let Buildings_list= []
/*fonction pour afficher les données du serveur" */

function Buildings_repr({ list }) {
  
  function openList() {
    var list = document.getElementById("ul_history");

    if (list.style.display == "none"){
      list.style.display = "block";
    }
    else{
      list.style.display = "none";
    }
  }

  return (
    <div className={styles.history}>
      <button onClick={() => openList()} className={styles.ullist_title}> History :</button>
      <ul id="ul_history" className={styles.ul_history}>
        {list.map((item, index) => (
          
          <li key={index} className={styles.li_history} >
            <img src={item} className={styles.img_history}></img>
          </li>
          
        ))}  
      </ul>
    </div>
  );
}

function Locations_repr({ list }) {
  function openList1() {
    var list = document.getElementById("ullist");

    if (list.style.display == "none"){
      list.style.display = "block";
    }
    else{
      list.style.display = "none";
    }
  }
  return (
    <div className={styles.list}>
      <button onClick={() => openList1()} className={styles.ullist_title}> Locations to choose from :</button>
      
      <ul id="ullist" className={styles.ullist}>
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
    sendData({ type: "filename", filename: selected.item.label });

    setImageSrc("/pictures/" + nom + ".png");
   
    if (Buildings_list.length >= 5 ){
      Buildings_list.shift();
      Buildings_list.push("/pictures/" + nom + ".png");
    } 
    else{
      Buildings_list.push("/pictures/" + nom + ".png");
    }
  };
  const cityOptions = filteredCities.map((city) => ({
    value: `${city.nom} (${city.code_postal})`,
    label: `${city.nom}`,
  }));

  return (
      <>
        <Head>
          <title>Aura App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1>Aura App</h1>
            <h2>Le site de comparateur</h2>
          </div>
          <div className={styles.body}>
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
            <div className={styles.grid_container}>
              <div className={styles.item}>
                <div className={styles.left}>
                  <label className={styles.search}>Search Bar :</label>
                  <div className={styles.search_bar}>
                    <ReactSearchBox
                      placeholder="Search Cities"
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
                  <Locations_repr list={data2} />
                  <div> 
                    <h3>Option chosen:</h3>
                    <li key={menuItems[activeIndicator]}>{menuItems[activeIndicator]}</li>
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
            <Buildings_repr list={Buildings_list} />
          </div>
          <footer className={styles.footer}>
            <div className={styles.grid}>
              <div className={styles.item_footer}>
                <h3>Authors :</h3>
                <ul>
                  <li>Emile Chazot</li>
                  <li>Juliette Gohin</li>
                  <li>Tristan Montalbetti</li>
                  <li>Jeanne Mirone</li>
                </ul>
                
              </div>
              <div className={styles.item_footer}>
                <h3>Quick Links</h3>
                <p>Please visit our other page for more information concerning the project</p>
              </div>
              <div className={styles.item_footer}>
                <div className={styles.data_gouv_ensemble}>
                  <p>Lien des données d'orgine</p>
                  <a href="https://www.ecologie.gouv.fr/diagnostic-performance-energetique-dpe"> <img src="/data_gouv.png" alt="data_gouv" className={styles.data_gouv}></img> </a>
                </div>
              </div> 
              <div className="col">
                <p className={styles.copyright_text}>Copyright &copy; 2017 All Rights Reserved by </p>
                <p>We would like to thank Mr for helping us during this project</p>
              </div>  
            </div>
          </footer>
        </main>
      </>
  );
}
