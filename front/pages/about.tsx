import React from "react";
import Head from "next/head";
import styles from "@/styles/about.module.css";

const About = () => {
  return (
    <>
      <Head>
        <title>About Aura App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid_container}>
          <div className={styles.item_side}></div>
          <div className={styles.item}>
            <section id="26-«-Récupération,-agrégation,-visualisation-et-analyse-de-données-sur-le-parc-de-logements-de-la-région-Auvergne-Rhône-Alpes-»-de-AuRA">
              <h1>
                26 « Récupération, agrégation, visualisation et analyse de
                données sur le parc de logements de la région
                Auvergne-Rhône-Alpes » de AuRA
                <a
                  className={styles.headerlink}
                  href="#26-«-Récupération,-agrégation,-visualisation-et-analyse-de-données-sur-le-parc-de-logements-de-la-région-Auvergne-Rhône-Alpes-»-de-AuRA"
                  title="Permalink to this heading"
                >
                  
                </a>
              </h1>
              <p>
                <img
                  alt="3ab91dde437341158928e5a1e4e84565"
                  className={styles.no_scaled_link}
                  src="/AURA.png"
                />
              </p>
              <div className={styles.line_block}>
                <div className={styles.line}>
                  Langage: <strong>Python</strong>
                </div>
                <div className={styles.line}>
                  Librairies: <em>numpy</em>, <em>pandas</em>,{" "}
                  <strong>matplotlib</strong>
                </div>
                <div className={styles.line}>
                  Autres librairies: <strong>geopandas</strong>,{" "}
                  <strong>scikit-learn</strong>
                </div>
                <div className={styles.line}>
                  <em>Web-app</em>
                </div>
              </div>
              <section id="Porteur-du-projet">
                <h2>
                  Porteur du projet
                  <a
                    className={styles.headerlink}
                    href="#Porteur-du-projet"
                    title="Permalink to this heading"
                  >
                    
                  </a>
                </h2>
                <p>
                  Matthieu Denoux (P13) est chargé de mission{" "}
                  <em>Intelligence territoriale et Observatoires</em> à AURA-EE
                  qu’il rejoint en 2022 pour aider au développement de l’outil
                  TerriSTORY et participer à la consolidation et à
                  l’amélioration des infrastructures et du déploiement de
                  l’application.
                </p>
                <p>
                  Avant de rejoindre AURA-EE, Matthieu a soutenu une thèse de
                  doctorat aux Mines de Paris proposant une étude prospective de
                  l’évolution des villes sur le long terme, et a appliqué son
                  modèle à la métropole de Bordeaux.
                </p>
                <p>
                  Matthieu Denoux a participé à l’évolution et à l’enseignement
                  de l’informatique aux Mines (IC tronc commun, 1A). Il
                  apportera toute son aide au groupe dans sa découverte du sujet
                  et des techniques mises en oeuvre.
                </p>
              </section>
              <section id="Entreprise">
                <h2>
                  Entreprise
                  <a
                    className={styles.headerlink}
                    href="#Entreprise"
                    title="Permalink to this heading"
                  >
                    
                  </a>
                </h2>
                <p>
                  AURA-EE (Auvergne-Rhône-Alpes Énergie Environnement) est une
                  agence régionale au service des territoires en transition
                  énergétique et écologique. C’est un opérateur privilégié de la
                  Région, un partenaire de l’ADEME et de nombreux acteurs
                  régionaux et locaux. L’agence est également active sur la
                  scène nationale, européenne et internationale.
                </p>
                <p>
                  (AURA-EE) accompagne les territoires dans la définition et la
                  mise en œuvre de solutions et de stratégies locales de
                  transition, elle démultiplie ainsi les politiques régionales
                  de l’énergie et de l’environnement. Elle mène trois types
                  d’actions : - elle fournit des données, des analyses et des
                  scénarios de transition - elle apporte une expertise
                  technique, financière et réglementaire - et elle impulse,
                  développe et accompagne des projets et des filières.
                </p>
                <p>
                  AURA-EE est reconnue dans des domaines aussi variés que les
                  énergies renouvelables, l’efficacité énergétique dans le
                  bâtiment, l’adaptation au changement climatique, la mobilité
                  durable, les déchets, la commande publique durable, les
                  nouveaux modèles économiques et l’innovation sociétale.
                </p>
              </section>
              <section id="Contexte-du-projet">
                <h2>
                  Contexte du projet
                  <a
                    className={styles.headerlink}
                    href="#Contexte-du-projet"
                    title="Permalink to this heading"
                  >
                    
                  </a>
                </h2>
                <p>
                  <img
                    alt="69287eb2d2b64783a7a3c88267bc9355"
                    className={styles.no_scaled_link}
                    src="/terristory.png"
                  />
                </p>
                <p>
                  TerriSTORY® est un outil web partenarial open-source d’aide au
                  pilotage de la transition des territoires, créé par [AURA-EE]
                  et co-construit avec les territoires.
                </p>
                <p>
                  C’est une Interface de visualisation interactive de données
                  opendata multi-thématiques (énergie, climat, mobilité,
                  économie…).
                </p>
                <p>
                  TerriSTORY®: - facilite la compréhension d’un territoire,
                  l’identification de ses atouts et des leviers d’actions
                  prioritaires. - permet de simuler des scénarios prospectifs et
                  d’en mesurer les impacts socio-économiques et environnementaux
                  afin de construire une trajectoire territoriale à la hauteur
                  des enjeux et des objectifs.
                </p>
                <p>
                  Conçu comme un support pédagogique, il permet d’engager un
                  dialogue entre les différents acteurs d’un territoire et entre
                  les territoires.
                </p>
                <p>
                  Outil <em>“made in Auvergne-Rhône-Alpes”</em>, TerriSTORY® est
                  présent dans 6 régions et devient un outil de référence au
                  niveau national.
                </p>
                <p>
                  Le projet rassemble une vingtaine d’acteurs nationaux et
                  régionaux ayant une mission de service public ou d’intérêt
                  général.
                </p>
                <p>
                  L’outil est accessible librement sur le site 
                  <a
                    className={styles.reference_external}
                    href="https://terristory.fr/"
                  >
                    terristory.fr
                  </a>{" "}
                  et son code source est accessible sur{" "}
                  <a
                    className={styles.reference_external}
                    href="https://gitlab.com/terristory/terristory/"
                  >
                    gitlab.com/terristory/terristory/
                  </a>
                  .
                </p>
              </section>
              <section id="Description-du-projet">
                <h2>
                  Description du projet
                  <a
                    className={styles.headerlink}
                    href="#Description-du-projet"
                    title="Permalink to this heading"
                  >
                    
                  </a>
                </h2>
                <p>
                  Dans le but d’aider les territoires (communes, communautés de
                  communes, département…) dans les des actions à mettre en place
                  pour diminuer la consommation d’énergie des logements et
                  lutter contre les situations de précarité énergétique, AURA-EE
                  souhaite améliorer sa connaissance et la représentation du
                  parc immobilier dans TerriSTORY.
                </p>
                <p>
                  Pour cet objectif, plusieurs sources de données sont
                  mobilisables, dont notamment : -{" "}
                  <a
                    className={styles.reference_external}
                    href="https://www.data.gouv.fr/fr/datasets/base-de-donnees-nationale-des-batiments/"
                  >
                    La base de données nationale des bâtiments - BDNB
                  </a>{" "}
                  -{" "}
                  <a
                    className={styles.reference_external}
                    href="https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/"
                  >
                    Les demandes de valeurs foncières - DVF
                  </a>{" "}
                  - Les données de l’INSEE, disponibles par exemple{" "}
                  <a
                    className={styles.reference_external}
                    href="https://www.insee.fr/fr/statistiques/6543302"
                  >
                    ICI
                  </a>{" "}
                  ou
                  <a
                    className={styles.reference_external}
                    href="https://www.insee.fr/fr/statistiques/6454155?sommaire=6454268"
                  >
                    ICI
                  </a>{" "}
                  - Les données MAJIC (en accès limité) - Les données LOVAC
                  caractérisant la vacance d’un logement (en accès limité)
                </p>
                <div className={styles.line_block}>
                  <div className={styles.line}>
                    Le projet sera réalisé en plusieurs temps: 1. Tout d’abord,
                    s’approprier un sous-ensemble de ces données, les importer
                    et produire un récapitulatif à l’échelle régionale des
                    différentes informations 2. Ensuite, proposer un programme
                    ou une application web pour visualiser et pouvoir
                    caractériser plus finement le parc de logements. 3. Enfin,
                    proposer des analyses des données ainsi obtenues (soit via
                    l’interface développée soit statiquement)
                  </div>
                  <div className={styles.line}>
                    e.g. Identification de valeurs aberrantes, de corrélations
                    (entre paramètres et/ou localisation), regroupements des
                    bâtiments “<em>proches</em>” (clustering)  (selon
                    thématiques, localisation géographique…)
                  </div>
                </div>
                <p>
                  <img
                    alt="f939dc0ea4624878afac73dcd81112eb"
                    className={styles.no_scaled_link}
                    src="/carte-auraee.png"
                  />
                </p>
                <p>
                  <em>
                    Figure 1 : Visualisation des DPE à partir de la BDNB sur un
                    quartier de Lyon
                  </em>
                </p>
              </section>
              <section id="Technologies-à-utiliser">
                <h2>
                  Technologies à utiliser
                  <a
                    className={styles.headerlink}
                    href="#Technologies-à-utiliser"
                    title="Permalink to this heading"
                  >
                    
                  </a>
                </h2>
                <p>
                  Dans le cadre de ce projet, selon vos envies : - un
                  développement en Python serait suffisant - des développements
                  supplémentaires pour la réalisation d’une interface web
                  (javascript + html + css) sont bienvenus
                </p>
              </section>
            </section>
          </div>
          <div className={styles.item_side}></div>
        </div>
      </main>
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
                Afin de retourner à la page principal cliquez sur le lien
                suivant :
                <a
                  href="http://localhost:3000/"
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
            Nous aimerions remercier Matthieu Denoux de nous avoir accompagné et
            aidé tout au long de ce projet.
          </p>
        </div>
      </footer>
    </>
  );
};

export default About;
