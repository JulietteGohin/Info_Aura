import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import ReactSearchBox from "react-search-box";

/* variables fixes*/
const IMAGE_NAMES = [
  "image0.png",
  "image1.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
];
let current_image_indice = 1;
let alternative_img_source = "/pictures/logo-AURA.png";
const Y_INDICATORS_LIST = [
  "DPE_CONSO",
  "DPE_GES",
  "hauteur",
  "ratio CO2/energie",
];
const X_INDICATORS_LIST = ["vitrage", "age batiment", "pas de corrélation"];

let Buildings_list = [];
/*fonction pour afficher les données du serveur" */

function Buildings_repr({ list }) {
  function openList() {
    var list = document.getElementById("ul_history");

    if (list.style.display == "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  }

  return (
    <div className={styles.history}>
      <button onClick={() => openList()} className={styles.ullist_title}>
        {" "}
        History :
      </button>
      <ul id="ul_history" className={styles.ul_history}>
        {list.map((item, index) => (
          <li key={index} className={styles.li_history}>
            <img src={item} className={styles.img_history}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}
function Option_chosen({ Xind, Yind, City }) {
  function openList2() {
    var list = document.getElementById("options");

    if (list.style.display == "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  }

  return (
    <div className={styles.option}>
      <button onClick={() => openList2()} className={styles.ullist_title}>
        {" "}
        Options Choisies :
      </button>
      <p id="options" className={styles.option_list}>
        X : {Xind}, Y : {Yind}, Ville: {City}
      </p>
    </div>
  );
}

function Locations_repr({ list }) {
  function openList1() {
    var list = document.getElementById("ullist");

    if (list.style.display == "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  }
  return (
    <div className={styles.list}>
      <button onClick={() => openList1()} className={styles.ullist_title}>
        {" "}
        Vous pouvez choisir à partir des locations ci-dessous
      </button>

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

  const [city_name, setCity_name] = useState<string>("Ville non chosie"); //nom de la ville
  const [YIndicator, setYIndicator] = useState<string>("rien"); //indicateur de l'ordonnée
  const [XIndicator, setXIndicator] = useState<string>("DPE G.E.S."); //indicateur de l'abscisse
  const [filteredCities, setFilteredCities] = useState<
    { id: number; nom: string; code_postal: string }[]
  >([]);

  const [imageSrc, setImageSrc] = useState<string>("/pictures/logo-AURA.png");

  const [data2, setData2] = useState([]);
  /*récupérons les données du serveur */
  /* d'abord les bâtiments */

  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 100); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const imageUrl = `${imageSrc}?timestamp=${timestamp}`;
  const imageUrl0 = `${Buildings_list[0]}?timestamp=${timestamp}`;
  const imageUrl1 = `${Buildings_list[1]}?timestamp=${timestamp}`;
  const imageUrl2 = `${Buildings_list[2]}?timestamp=${timestamp}`;
  const imageUrl3 = `${Buildings_list[3]}?timestamp=${timestamp}`;
  const imageUrl4 = `${Buildings_list[4]}?timestamp=${timestamp}`;

  /* pour barre de recherche maintenant*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/searchbar/list"
        );
        const jsonData = await response.json();
        setData2(jsonData);
        console.log("data2: ", data2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log("data2: ");
    console.log(data2);
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

    //sendData({ type: "filename", filename: selected.item.label });
    setCity_name(nom);
    console.log(
      X_INDICATORS_LIST[XIndicator],
      Y_INDICATORS_LIST[YIndicator],
      city_name
    );

    /*setImageSrc("/pictures/" + IMAGE_NAMES[current_image_indice]);
    current_image_indice = (current_image_indice + 1) % IMAGE_NAMES.length;
    console.log("imageSrc: ", imageSrc);*/
    /*sendData({
      city_name: city_name,
      XIndicator: X_INDICATORS_LIST[XIndicator],
      YIndicator: Y_INDICATORS_LIST[YIndicator],
      imageSrc: imageSrc,
    });*/
    // const nom_clean = nom.split("(")[0].trim(); //on enlève le code postal
  };
  const cityOptions = filteredCities.map((city) => ({
    value: `${city.nom} `, //(${city.code_postal})
    label: `${city.nom}`,
  }));

  const handleButtonClick = async () => {
    current_image_indice = (current_image_indice + 1) % 5;
    //await set_src();

    setImageSrc("/pictures/" + IMAGE_NAMES[current_image_indice]);
    alternative_img_source = "/pictures/" + IMAGE_NAMES[current_image_indice];
    sendData({
      city_name: city_name,
      XIndicator: X_INDICATORS_LIST[XIndicator],
      YIndicator: Y_INDICATORS_LIST[YIndicator],
      imageSrc: "/pictures/" + IMAGE_NAMES[current_image_indice],
    });

    console.log(
      "/pictures/" + IMAGE_NAMES[current_image_indice],
      "current_image_indice: ",
      current_image_indice
    );
    if (Buildings_list.length >= 5) {
      Buildings_list.pop();
      Buildings_list.unshift("/pictures/" + IMAGE_NAMES[current_image_indice]);
    } else {
      Buildings_list.unshift("/pictures/" + IMAGE_NAMES[current_image_indice]);
    }
  };
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
            <h2>Indicateur ordonnée</h2>
          </div>
          <div>
            <Menu
              items={Y_INDICATORS_LIST}
              activeItem={YIndicator}
              setActiveItem={setYIndicator}
            />
          </div>
          <div className={styles.sub_header}>
            <h2>Indicateur abscisse</h2>
          </div>
          <div>
            <Menu
              items={X_INDICATORS_LIST}
              activeItem={XIndicator}
              setActiveItem={setXIndicator}
            />
          </div>
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
              <Option_chosen
                Xind={X_INDICATORS_LIST[XIndicator]}
                Yind={Y_INDICATORS_LIST[YIndicator]}
                City={city_name}
              />
              <button onClick={handleButtonClick} className={styles.big_button}>
                Afficher graphe
              </button>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.right}>
              <div className={styles.graphe}>
                <h3 className={styles.title}> Graphe d'interprétations</h3>
                <img src={imageUrl} alt="Image" className={styles.image} />
                <p className={styles.texte}> source : {imageSrc}</p>
              </div>
            </div>
          </div>
        </div>

        <Buildings_repr list={Buildings_list} />

        <footer className={styles.footer}>
          <div className={styles.grid}>
            <div className={styles.item_footer}>
              <div className={styles.contact}>
                <h3>Contacts :</h3>
                <article className={styles.article}>
                  <div className={styles.left_footer}>
                    <p>Emile Chazot : </p>
                  </div>
                  <div className={styles.right_footer}>
                    <a
                      href="mailto: emile.chazot@etu.minesparis.psl.eu"
                      className={styles.icon_container}
                    >
                      <img
                        src="/envelope.png"
                        alt="envelope"
                        className={styles.icon}
                      ></img>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/emile-chazot-8abab5253/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.icon_container}
                    >
                      <img
                        src="/linkedin.png"
                        alt="linkedin"
                        className={styles.icon}
                      ></img>
                    </a>
                  </div>
                </article>
                <article className={styles.article}>
                  <div className={styles.left_footer}>
                    <p>Juliette Gohin: </p>
                  </div>
                  <div className={styles.right_footer}>
                    <a
                      href="mailto: juliette.gohin@etu.minesparis.psl.eu"
                      className={styles.icon_container}
                    >
                      <img
                        src="/envelope.png"
                        alt="envelope"
                        className={styles.icon}
                      ></img>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/juliette-gohin-7a7328254/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.icon_container}
                    >
                      <img
                        src="/linkedin.png"
                        alt="linkedin"
                        className={styles.icon}
                      ></img>
                    </a>
                  </div>
                </article>
                <article className={styles.article}>
                  <div className={styles.left_footer}>
                    <p>Tristan Montalbetti : </p>
                  </div>
                  <div className={styles.right_footer}>
                    <a
                      href="mailto: tristan.montalbetti@etu.minesparis.psl.eu"
                      className={styles.icon_container}
                    >
                      <img
                        src="/envelope.png"
                        alt="envelope"
                        className={styles.icon}
                      ></img>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/tristan-montalbetti-50b893249/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.icon_container}
                    >
                      <img
                        src="/linkedin.png"
                        alt="linkedin"
                        className={styles.icon}
                      ></img>
                    </a>
                  </div>
                </article>
                <article className={styles.article}>
                  <div className={styles.left_footer}>
                    <p>Jeanne Mirone : </p>
                  </div>
                  <div className={styles.right_footer}>
                    <a
                      href="mailto: jeanne.mirone@etu.minesparis.psl.eu"
                      className={styles.icon_container}
                    >
                      <img
                        src="/envelope.png"
                        alt="envelope"
                        className={styles.icon}
                      ></img>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jeanne-mirone-50601a271/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.icon_container}
                    >
                      <img
                        src="/linkedin.png"
                        alt="linkedin"
                        className={styles.icon}
                      ></img>
                    </a>
                  </div>
                </article>
              </div>
            </div>
            <div className={styles.item_footer}>
              <div className={styles.padding}>
                <h3>Sujet du projet</h3>
                <p>
                  Afin de connaître plus sur notre projet veuillez vous dirriger
                  sur notre site annexe. Le site se situe au lien suivant :
                  <a
                    href="http://localhost:3000/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.row}
                  >
                    {" "}
                    Lien vers le site
                  </a>
                </p>
              </div>
            </div>
            <div className={styles.item_footer_egg}>
              <div className={styles.egg}>
                <h2>Easter EGG</h2>
                <h3>Trouver l'œuf noir sur le site</h3>
                <a
                  href="https://findtheinvisiblecow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/black_egg.png"
                    alt="black_egg"
                    className={styles.egg_img}
                  ></img>
                </a>
              </div>
            </div>
            <div className={styles.item_footer}>
              <div className={styles.data_gouv_ensemble}>
                <h3>Lien des données d'orgine :</h3>
                <p>
                  Vous pouvez trouvez l'ensembles des données utilisées dans le
                  projet sur le site data.gouv.
                </p>
                <a
                  href="https://www.data.gouv.fr/fr/datasets/?q=dpe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/data_gouv.png"
                    alt="data_gouv"
                    className={styles.data_gouv}
                  ></img>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footer_bottom}>
            <p className={styles.copyright_text}>
              Copyright &copy; 2023 All Rights Reserved by Me{" "}
            </p>
            <p>
              Nous remercions chaleureusement Matthieu Denoux de nous avoir
              accompagné et aidé tout au long de ce projet.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
