import geopandas as gpd
import pandas as pd
import fiona
import matplotlib.pyplot as plt
import pdb
import numpy as np

Y_INDICATORS = ["DPE_GES", "DPE_CONSO", "hauteur", "ratio CO2/energie"]
X_INDICATORS = ["vitrage", "age bat", "pas de corrélation"]


class Data:
    def __init__(self, file: str):
        self.file = file

    def layers(self):
        """
        Showing all the layers of a .gpkg file

        ---
        Output:
        list containing the name of all the layers
        """

        # Open the GeoPackage file with fiona to get a list of all the layers
        layer_names = fiona.listlayers(self.file)
        return layer_names

    def clear_data(self):
        """
        Deleting the uninteresting layers, keeping only 'batiment_groupe_compil'

        ---
        Output : light_data.gpkg
        """
        # OK but very long to run...The long step is to write in the new file...

        light_data = "Info_Aura\light_building.gpkg"

        with fiona.open(self.file, "r", layer="batiment_groupe_compile") as source:
            pdb.set_trace()
            print("reading original file")
            schema = source.schema
            with fiona.open(light_data, "w", driver="GPKG", schema=schema) as new_file:
                pdb.set_trace()
                for element in source:
                    new_file.write(element)
        return light_data

    def attributes(self, light_data):
        """
        Showing all the attributes of the layer

        ---
        Parameters:
        light_data : str

        Output:
        list containing the name of all the attributes
        """
        gdf = gpd.read_file(light_data)
        list_columns = []
        for col in gdf.columns:
            list_columns.append(col)
        return list_columns, len(list_columns)

    def minimal_data(self, light_data):
        """
        Keeping only the interesting attributes of the layer 'batiment_groupe_compil'

        ---
        Parameters:
        light_data : str

        Output:
        minimal_data.gpkg
        """
        minimal_data = "minimal_data.gpkg"
        gdf = gpd.read_file(light_data)
        gdf = gdf[
            [
                "batiment_groupe_id",
                "code_departement_insee",
                "s_geom_groupe",
                "code_iris",
                "code_commune_insee",
                "libelle_commune_insee",
                "code_epci_insee",
                "contient_fictive_geom_groupe",
                "cle_interop_adr_principale_ban",
                "libelle_adr_principale_ban",
                "nb_adresse_valid_ban",
                "fiabilite_cr_adr_niv_1",
                "fiabilite_cr_adr_niv_2",
                "argiles_alea",
                "bdtopo_bat_l_nature",
                "bdtopo_bat_l_usage_1",
                "bdtopo_bat_l_usage_2",
                "bdtopo_bat_l_etat",
                "bdtopo_bat_hauteur_mean",
                "bdtopo_bat_altitude_sol_mean",
                "bdtopo_equ_l_nature",
                "bdtopo_equ_l_nature_detaillee",
                "bdtopo_equ_l_toponyme",
                "bdtopo_zoa_l_nature",
                "bdtopo_zoa_l_nature_detaillee",
                "bdtopo_zoa_l_toponyme",
                "bpe_l_type_equipement",
                "dle_2020_elec_nb_pdl_res",
                "dle_elec_2020_nb_pdl_pro",
                "dle_elec_2020_nb_pdl_tot",
                "dle_elec_2020_conso_res",
                "dle_elec_2020_conso_pro",
                "dle_elec_2020_conso_tot",
                "dle_elec_2020_conso_res_par_pdl",
                "dle_elec_2020_conso_pro_par_pdl",
                "dle_elec_2020_conso_tot_par_pdl",
                "dle_gaz_2020_nb_pdl_res",
                "dle_gaz_2020_nb_pdl_pro",
                "dle_gaz_2020_nb_pdl_tot",
                "dle_gaz_2020_conso_res",
                "dle_gaz_2020_conso_pro",
                "dle_gaz_2020_conso_tot",
                "dle_gaz_2020_conso_res_par_pdl",
                "dle_gaz_2020_conso_pro_par_pdl",
                "dle_gaz_2020_conso_tot_par_pdl",
                "dle_reseaux_2020_nb_pdl_res",
                "dle_reseaux_2020_nb_pdl_pro",
                "dle_reseaux_2020_nb_pdl_tot",
                "dle_reseaux_2020_conso_res",
                "dle_reseaux_2020_conso_pro",
                "dle_reseaux_2020_conso_tot",
                "dle_reseaux_2020_conso_res_par_pdl",
                "dle_reseaux_2020_conso_pro_par_pdl",
                "dle_reseaux_2020_conso_tot_par_pdl",
                "dle_reseaux_2020_identifiant_reseau",
                "dle_reseaux_2020_type_reseau",
                "dpe_nb_classe_ener_a",
                "dpe_nb_classe_ener_b",
                "dpe_nb_classe_ener_c",
                "dpe_nb_classe_ener_d",
                "dpe_nb_classe_ener_e",
                "dpe_nb_classe_ener_f",
                "dpe_nb_classe_ener_g",
                "dpe_nb_classe_ener_nc",
                "dpe_nb_classe_ges_a",
                "dpe_nb_classe_ges_b",
                "dpe_nb_classe_ges_c",
                "dpe_nb_classe_ges_d",
                "dpe_nb_classe_ges_e",
                "dpe_nb_classe_ges_f",
                "dpe_nb_classe_ges_g",
                "dpe_nb_classe_ges_nc",
                "dpe_conso_ener_mean",
                "dpe_estim_ges_mean",
                "dpe_conso_ener_std",
                "dpe_estim_ges_std",
                "dpe_conso_ener_min",
                "dpe_estim_ges_min",
                "dpe_conso_ener_max",
                "dpe_estim_ges_max",
                "dpe_class_conso_ener_mean",
                "dpe_class_estim_ges_mean",
                "dpe_l_ch_gen_princ",
                "dpe_l_ecs_gen_princ",
                "dpe_logtype_dpe_id",
                "dpe_logtype_numero_dpe",
                "dpe_logtype_avancee_masque_max",
                "dpe_logtype_baie_fs",
                "dpe_logtype_baie_mat",
                "dpe_logtype_baie_orientation",
                "dpe_logtype_baie_remplissage",
                "dpe_logtype_baie_type_vitrage",
                "dpe_logtype_baie_u",
                "dpe_logtype_ch_gen_lib",
                "dpe_logtype_ch_gen_lib_appoint",
                "dpe_logtype_ch_gen_lib_princ",
                "dpe_logtype_ch_solaire",
                "dpe_logtype_ch_type_ener_corr",
                "dpe_logtype_ch_type_inst",
                "dpe_logtype_classe_conso_ener",
                "dpe_logtype_classe_estim_ges",
                "dpe_logtype_coherence_donnees_dpe",
                "dpe_logtype_conso_ener",
                "dpe_logtype_date_reception_dpe",
                "dpe_logtype_ecs_gen_lib",
                "dpe_logtype_ecs_gen_lib_appoint",
                "dpe_logtype_ecs_gen_lib_princ",
                "dpe_logtype_ecs_solaire",
                "dpe_logtype_ecs_type_ener",
                "dpe_logtype_ecs_type_inst",
                "dpe_logtype_enr",
                "dpe_logtype_estim_ges",
                "dpe_logtype_inertie",
                "dpe_logtype_methode_3cl",
                "dpe_logtype_traversant",
                "dpe_logtype_mur_ep_mat_ext",
                "dpe_logtype_mur_mat_ext",
                "dpe_logtype_mur_pos_isol_ext",
                "dpe_logtype_mur_u_ext",
                "dpe_logtype_nom_methode_dpe",
                "dpe_logtype_pb_mat",
                "dpe_logtype_pb_pos_isol",
                "dpe_logtype_pb_type_adjacence",
                "dpe_logtype_pb_u",
                "dpe_logtype_prc_s_vitree_ext",
                "dpe_logtype_periode_construction",
                "dpe_logtype_ph_mat",
                "dpe_logtype_ph_pos_isol",
                "dpe_logtype_ph_type_adjacence",
                "dpe_logtype_ph_u",
                "dpe_logtype_presence_balcon",
                "dpe_logtype_presence_climatisation",
                "dpe_logtype_s_hab",
                "dpe_logtype_type_batiment",
                "dpe_logtype_type_ventilation",
                "dpe_logtype_ratio_ges_conso",
                "ffo_bat_annee_construction",
                "ffo_bat_usage_niveau_1_txt",
                "ffo_bat_mat_mur_txt",
                "ffo_bat_mat_toit_txt",
                "ffo_bat_nb_log",
                "fiabilite_emprise_sol",
                "fiabilite_hauteur",
                "fiabilite_adresse",
                "croisement_geospx_reussi",
                "hthd_nb_pdl",
                "hthd_l_type_pdl",
                "hthd_l_nom_pdl",
                "merimee_distance_batiment_historique_plus_proche",
                "merimee_nom_batiment_historique_plus_proche",
                "qpv_nom_quartier",
                "radon_alea",
                "rnc_ope_numero_immat_principal",
                "rnc_ope_periode_construction_max",
                "rnc_ope_l_annee_construction",
                "rnc_ope_nb_lot_garpark",
                "rnc_ope_nb_lot_tot",
                "rnc_ope_nb_log",
                "rnc_ope_nb_lot_tertiaire",
                "rnc_ope_l_nom_copro",
                "geometry",
            ]
        ]
        gdf.to_file(minimal_data, driver="GPKG")
        return minimal_data


class Stats:
    def __init__(self, data: str):
        # data can be gpkg or csv

        self.data = data
        file_format = self.data.split(".")[-1]
        if file_format == "csv":
            self.gdf = pd.read_csv(self.data, low_memory=False)
            # Colonnes d'intérêt
        elif file_format == "gpkg":
            self.gdf = gpd.read_file(self.data)
            # Colonnes d'intérêt
        else:
            print("Format de fichier incompatible")
        self.gdf = self.gdf[
            [
                "batiment_groupe_id",
                "code_departement_insee",
                "code_iris",
                "code_commune_insee",
                "libelle_commune_insee",
                # now indicators
                "bdtopo_bat_l_nature",
                "bdtopo_bat_l_usage_1",
                "bdtopo_bat_l_usage_2",
                "bdtopo_bat_hauteur_mean",
                "dle_elec_2020_conso_res",
                "dle_elec_2020_conso_pro",
                "dle_elec_2020_conso_tot",
                "dle_gaz_2020_conso_res",
                "dle_gaz_2020_conso_pro",
                "dle_gaz_2020_conso_tot",
                "dpe_nb_classe_ener_a",
                "dpe_nb_classe_ener_b",
                "dpe_nb_classe_ener_c",
                "dpe_nb_classe_ener_d",
                "dpe_nb_classe_ener_e",
                "dpe_nb_classe_ener_f",
                "dpe_nb_classe_ener_g",
                "dpe_nb_classe_ener_nc",
                "dpe_nb_classe_ges_a",
                "dpe_nb_classe_ges_b",
                "dpe_nb_classe_ges_c",
                "dpe_nb_classe_ges_d",
                "dpe_nb_classe_ges_e",
                "dpe_nb_classe_ges_f",
                "dpe_nb_classe_ges_g",
                "dpe_nb_classe_ges_nc",
                "dpe_conso_ener_mean",
                "dpe_estim_ges_mean",
                "dpe_conso_ener_std",
                "dpe_estim_ges_std",
                "dpe_conso_ener_min",
                "dpe_estim_ges_min",
                "dpe_l_ch_gen_princ",
                "dpe_l_ecs_gen_princ",
                "dpe_logtype_dpe_id",
                "dpe_logtype_ch_gen_lib_princ",
                "dpe_logtype_ch_solaire",
                "dpe_logtype_ch_type_inst",
                "dpe_logtype_ecs_gen_lib_princ",
                "dpe_logtype_ecs_solaire",
                "dpe_logtype_ratio_ges_conso",
                "ffo_bat_annee_construction",
                "ffo_bat_nb_log",
            ]
        ]
        print(self.gdf)

    def chose_graph(self, X_label, Y_label):
        "function that choses which graph to display depending on the labels"
        # partie temporaire
        X = np.linspace(0, 2 * np.pi, 100)
        F = np.sin(X)
        fig = plt.Figure()
        ax = fig.subplots()
        ax.plot(X, F)
        ax.set_title(f"{X_label} en fonction de {Y_label}")
        return fig

    def city_list(self):
        """
        Return an array object with all the cities in the dataset
        """
        return self.gdf["code_commune_insee"].unique()

    def hist_height_city(self, postal_code):
        """
        Display the histogramme of the building's height in the chosen city (choice made by postal_code)

        ---
        Parameters:
        postal_code : str

        """
        gdf = self.gdf.groupby(by='code_commune_insee') 
        sub_gdf = gdf.get_group(postal_code) 
        sub_gdf.hist('bdtopo_bat_hauteur_mean', bins=20)
        plt.title(f"Histogramme de la hauteur des batiments de la ville {postal_code}")
        plt.xlabel("Hauteur des batiments (m)")
        plt.ylabel("Nombre de batiments")
        plt.show()

    def mean_height_city(self, postal_code):
        """
        Display the mean height of the buildings in the chosen city (choice made by postal_code)

        ---
        Parameters:
        postal_code : str

        Output:
        mean height of the buildings in the chosen city
        """
        gdf = self.gdf.groupby(by="code_commune_insee")
        sub_gdf = gdf.get_group(postal_code)
        mean_height = sub_gdf["bdtopo_bat_hauteur_mean"].mean()
        print(
            f"La hauteur moyenne des batiments de la ville {postal_code} est de {round(mean_height, 2)} m"
        )
        return mean_height

    def dpe_departement_city(self, postal_code):
        """
        Display the circular graphic of the DPE in the department and in the chosen city

        ---
        Parameters:
        postal_code : str

        Output:
        2 circular graphics
        """

        fig, ax = plt.subplots(2, 1, figsize=(5, 10))

        # Departement
        labels = "A", "B", "C", "D", "E", "F", "G"
        prop_dep = [
            self.gdf["dpe_nb_classe_ener_a"].sum(),
            self.gdf["dpe_nb_classe_ener_b"].sum(),
            self.gdf["dpe_nb_classe_ener_c"].sum(),
            self.gdf["dpe_nb_classe_ener_d"].sum(),
            self.gdf["dpe_nb_classe_ener_e"].sum(),
            self.gdf["dpe_nb_classe_ener_f"].sum(),
            self.gdf["dpe_nb_classe_ener_g"].sum(),
        ]

        ax[0].pie(prop_dep, labels=labels, autopct="%1.1f%%", shadow=True)
        ax[0].axis("equal")
        ax[0].set_title("Répartition des DPE dans le département")

        # City
        gdf_city = self.gdf.groupby(by="code_commune_insee")
        gdf_city = gdf_city.get_group(postal_code)
        prop_city = [
            gdf_city["dpe_nb_classe_ener_a"].sum(),
            gdf_city["dpe_nb_classe_ener_b"].sum(),
            gdf_city["dpe_nb_classe_ener_c"].sum(),
            gdf_city["dpe_nb_classe_ener_d"].sum(),
            gdf_city["dpe_nb_classe_ener_e"].sum(),
            gdf_city["dpe_nb_classe_ener_f"].sum(),
            gdf_city["dpe_nb_classe_ener_g"].sum(),
        ]

        ax[1].pie(prop_city, labels=labels, autopct="%1.1f%%", shadow=True)
        ax[1].axis("equal")
        ax[1].set_title(f"Répartition des DPE dans la ville {postal_code}")

        return fig

    def correlation_hauteur_annee(self):
        """
        Display the scatter plot of the mean height of the buildings in function of the year of construction by iris

        ---
        Output:
        scatter plot
        """
        gdf = self.gdf
        gdf_iris = gdf.groupby("code_iris")
        iris = list(gdf_iris.groups.keys())
        hauteur_moyenne = []
        annee_moyenne = []
        for iris_code in iris:
            h_moyenne_iris = gdf_iris.get_group(iris_code)[
                "bdtopo_bat_hauteur_mean"
            ].mean(axis=0)
            annee_moyenne_iris = gdf_iris.get_group(iris_code)[
                "ffo_bat_annee_construction"
            ].mean(axis=0)
            hauteur_moyenne.append(h_moyenne_iris)
            annee_moyenne.append(annee_moyenne_iris)
        hauteur_moyenne = np.array(hauteur_moyenne)
        annee_moyenne = np.array(annee_moyenne)

        fig, ax = plt.subplots()
        ax.scatter(annee_moyenne, hauteur_moyenne, marker="o")
        ax.set_title(
            "Correlation entre la hauteur moyenne des batiments et l'annee de construction, par iris"
        )
        ax.set_xlabel("Annee de construction")
        ax.set_ylabel("Hauteur moyenne des batiments (en m)")
        plt.show()

    def dpe_ges_city(self, postal_code):
        """
        Display the circular graphic of the GES indicator in the city

        ---
        Parameters:
        postal_code : str

        Output:
        plot circular graphic of the DPE in the city
        """
        gdf = self.gdf.groupby(by="code_commune_insee")
        gdf = gdf.get_group(postal_code)
        A = gdf["dpe_nb_classe_ges_a"].sum()
        B = gdf["dpe_nb_classe_ges_b"].sum()
        C = gdf["dpe_nb_classe_ges_c"].sum()
        D = gdf["dpe_nb_classe_ges_d"].sum()
        E = gdf["dpe_nb_classe_ges_e"].sum()
        F = gdf["dpe_nb_classe_ges_f"].sum()
        G = gdf["dpe_nb_classe_ges_g"].sum()
        dpe_gdf = pd.DataFrame(
            {"GES": [A, B, C, D, E, F, G]}, index=["A", "B", "C", "D", "E", "F", "G"]
        )
        dpe_gdf.plot.pie(
            y="GES",
            figsize=(5, 5),
            title=f"Répartition des indicateurs GES dans la ville {postal_code}",
        )

    def climatisation_rate(self, postal_code):
        """
        Compute the rate of buildings with air conditioning in the department and in the city of interest

        ---
        Parameters :
        postal_code

        Output:
        % of buildings with air conditioning in the department
        """
        gdf_clim = self.gdf[self.gdf["dpe_logtype_presence_climatisation"] == True]
        rate = len(gdf_clim) / len(self.gdf) * 100

        gdf_city = self.gdf[self.gdf["code_commune_insee"] == postal_code]
        gdf_city_clim = gdf_city[gdf_city["dpe_logtype_presence_climatisation"] == True]
        rate_city = len(gdf_city_clim) / len(gdf_city) * 100
        print(
            f"Le taux de batiments climatises est de {round(rate, 2)}% dans le departement, et de {round(rate_city, 2)} dans la ville d'interet"
        )
        return rate, rate_city


def main():
    minimal_data = "Info_Aura\light_building.gpkg"
    stats = Stats(minimal_data)
    stats.dpe_departement_city("69123")
    stats.correlation_hauteur_annee()
    # stats.dpe_city('69123') #Lyon
    # stats.hist_height_city('69123')
    # stats.mean_height_city('69123')
    # stats.climatisation_rate('69123')


main()
