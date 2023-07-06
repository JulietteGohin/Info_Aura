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


class Stats:
    def __init__(self, filepath):
        # data can be gpkg or csv

        self.data = str(filepath)
        file_format = self.data.split(".")[-1]
        if file_format == "csv":
            self.gdf = pd.read_csv(self.data, low_memory=False)
        elif file_format == "gpkg":
            self.gdf = gpd.read_file(self.data)
        else:
            print("Format de fichier incompatible")
        self.gdf = self.gdf[
            [
                "batiment_groupe_id",
                "code_departement_insee",
                "code_iris",
                "code_commune_insee",
                "libelle_commune_insee",
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
                "dpe_logtype_baie_type_vitrage",
            ]
        ]

    def chose_graph(self, X_label, Y_label, city_name):
        """
        function that choses which graph to display depending on the labels
        """

        fig = None

        if X_label == "pas de corrélation":
            if Y_label == "DPE_GES":
                fig = self.dpe_ges_city(city_name)
            elif Y_label == "DPE_CONSO":
                fig = self.dpe_departement_city(city_name)
            else:
                fig = self.hist_city(city_name, Y_label)

        elif X_label == "vitrage":
            if Y_label == "ratio CO2/energie":
                fig = self.conso_ges_selon_vitrage()

            else:
                fig = self.create_empty_graph(X_label, Y_label)

        elif X_label == "age batiment":
            if Y_label == "hauteur" or Y_label == "ratio CO2/energie":
                fig = self.correlation_indicateur_annee(Y_label)
            else:
                fig = self.create_empty_graph(X_label, Y_label)

        return fig

    def show_graph(self, fig):
        """
        Display the chosen graph

        ---
        Parameter:
        fig : returned by the function 'chose_graph'
        """
        if fig is not None:
            fig.show()
        else:
            print("Pas de graphique disponible")

    def city_list(self):
        """
        Return an array object with all the cities in the dataset
        """
        return self.gdf["libelle_commune_insee"].unique()

    def hist_city(self, city_name, indicateur):
        """
        Display the histogramme of the building's height in the chosen city

        ---
        Parameters:
        city_name : str
        indicateur : str, can be 'hauteur' or 'ratio CO2/energie'

        ---
        Output:
        fig containing histogramme
        """
        gdf = self.gdf.groupby(by="libelle_commune_insee")
        sub_gdf = gdf.get_group(city_name)

        fig, ax = plt.subplots()

        if indicateur == "hauteur":
            ax.hist(sub_gdf["bdtopo_bat_hauteur_mean"], bins=20)
            ax.set_title(
                f"Histogramme de la hauteur des batiments de la ville {city_name}"
            )
            ax.set_xlabel("Hauteur des batiments (m)")
            ax.set_ylabel("Nombre de batiments")
        elif indicateur == "ratio CO2/energie":
            ax.hist(sub_gdf["dpe_logtype_ratio_ges_conso"], bins=20)
            ax.set_title(
                f"Histogramme du ratio CO2/energie des batiments de la ville {city_name}"
            )
            ax.set_xlabel("Ratio CO2/energie")
            ax.set_ylabel("Nombre de batiments")
        return fig

    def mean_height_city(self, city_name):
        """
        Display the mean height of the buildings in the chosen city

        ---
        Parameters:
        city_name : str

        Output:
        mean height of the buildings in the chosen city
        """
        gdf = self.gdf.groupby(by="code_commune_insee")
        sub_gdf = gdf.get_group(city_name)
        mean_height = sub_gdf["bdtopo_bat_hauteur_mean"].mean()
        print(
            f"La hauteur moyenne des batiments de la ville {city_name} est de {round(mean_height, 2)} m"
        )
        return mean_height

    def dpe_departement_city(self, city_name):
        """
        Display the circular graphic of the DPE in the department and in the chosen city

        ---
        Parameters:
        city_name : str

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
        ax[0].set_title("Répartition des DPE conso énergie dans departement ")

        # City
        gdf_city = self.gdf.groupby(by="libelle_commune_insee")
        gdf_city = gdf_city.get_group(city_name)
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
        ax[1].set_title(f"Répartition des DPE conso énergie dans {city_name}")

        return fig

    def conso_ges_selon_vitrage(self):
        """
        Display boxplot of the ratio conso/ges with type_vitrage in abscisse

        ---
        Parameters:
        indicateur : str

        ---
        Output:
        fig containing boxplot
        """

        df = self.gdf[
            ["dpe_logtype_baie_type_vitrage", "dpe_logtype_ratio_ges_conso"]
        ].dropna()

        # Créer un dictionnaire pour stocker les données de chaque catégorie
        category_data = {}
        for category, group in df.groupby("dpe_logtype_baie_type_vitrage"):
            if type(category) == str:
                category_data[category] = group["dpe_logtype_ratio_ges_conso"]

        # Créer une liste de valeurs pour chaque catégorie (y compris les valeurs manquantes)
        values = [
            category_data.get(category, np.array([]))
            for category in self.gdf["dpe_logtype_baie_type_vitrage"].dropna().unique()
        ]

        fig, ax = plt.subplots()
        ax.boxplot(
            values, labels=self.gdf["dpe_logtype_baie_type_vitrage"].dropna().unique()
        )
        ax.set_ylabel("Ratio émission/consommation")
        ax.set_xlabel("Type de vitrage")
        return fig

    def correlation_indicateur_annee(self, indicateur):
        """
        Display the scatter plot of the mean height of the buildings in function of the year of construction by iris
        ---
        Parameters:
        indicateur : str, can be 'hauteur' or 'ratio CO2/energie'

        ---
        Output:
        fig containing scatter plot
        """
        gdf = self.gdf
        gdf_iris = gdf.groupby("code_iris")
        iris = list(gdf_iris.groups.keys())
        if indicateur == "hauteur":
            col = "bdtopo_bat_hauteur_mean"
        elif indicateur == "ratio CO2/energie":
            col = "dpe_logtype_ratio_ges_conso"
        indicateur_moyen = []
        annee_moyenne = []
        for iris_code in iris:
            indic_moyen_iris = gdf_iris.get_group(iris_code)[col].mean(axis=0)
            annee_moyenne_iris = gdf_iris.get_group(iris_code)[
                "ffo_bat_annee_construction"
            ].mean(axis=0)
            indicateur_moyen.append(indic_moyen_iris)
            annee_moyenne.append(annee_moyenne_iris)
        indicateur_moyen = np.array(indicateur_moyen)
        annee_moyenne = np.array(annee_moyenne)

        fig, ax = plt.subplots()
        ax.scatter(annee_moyenne, indicateur_moyen, marker="o")
        ax.set_title(
            "Hauteur moyenne des batiments fonction de leur age dans departement"
        )
        ax.set_xlabel("Annee de construction")
        ax.set_ylabel("Hauteur moyenne des batiments (en m)")
        return fig

    def dpe_ges_city(self, city_name):
        """
        Display the circular graphic of the GES indicator in the city

        ---
        Parameters:
        city_name : str

        Output:
        plot circular graphic of the DPE in the city
        """
        fig, ax = plt.subplots(2, 1, figsize=(5, 10))

        # Departement
        labels = "A", "B", "C", "D", "E", "F", "G"
        prop_dep = [
            self.gdf["dpe_nb_classe_ges_a"].sum(),
            self.gdf["dpe_nb_classe_ges_b"].sum(),
            self.gdf["dpe_nb_classe_ges_c"].sum(),
            self.gdf["dpe_nb_classe_ges_d"].sum(),
            self.gdf["dpe_nb_classe_ges_e"].sum(),
            self.gdf["dpe_nb_classe_ges_f"].sum(),
            self.gdf["dpe_nb_classe_ges_g"].sum(),
        ]

        ax[0].pie(prop_dep, labels=labels, autopct="%1.1f%%", shadow=True)
        ax[0].axis("equal")
        ax[0].set_title("Répartition des DPE conso énergie dans departement ")

        # City
        gdf_city = self.gdf.groupby(by="libelle_commune_insee")
        gdf_city = gdf_city.get_group(city_name)
        prop_city = [
            gdf_city["dpe_nb_classe_ges_a"].sum(),
            gdf_city["dpe_nb_classe_ges_b"].sum(),
            gdf_city["dpe_nb_classe_ges_c"].sum(),
            gdf_city["dpe_nb_classe_ges_d"].sum(),
            gdf_city["dpe_nb_classe_ges_e"].sum(),
            gdf_city["dpe_nb_classe_ges_f"].sum(),
            gdf_city["dpe_nb_classe_ges_g"].sum(),
        ]

        ax[1].pie(prop_city, labels=labels, autopct="%1.1f%%", shadow=True)
        ax[1].axis("equal")
        ax[1].set_title(f"Répartition des DPE GES dans {city_name}")

        return fig

    def create_empty_graph(self, XIndicator, YIndicator):
        """Create an empty figure with a title
        ---
        Parameters:
        XIndicator : str
        YIndicator : str
        ---
        Output:
        fig containing empty graph

        """
        fig, ax = plt.subplots()
        ax.set_title(f"Correlation entre {XIndicator} et {YIndicator} n'existe pas")
        ax.axis("off")  # Turn off axis display
        return fig


"""def main():
    data = "light_building.gpkg"
    stats = Stats(data)
    stats.show_graph(stats.chose_graph("pas de corrélation", "DPE_CONSO", "Lyon"))"""
