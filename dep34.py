import geopandas as gpd
import pandas as pd
import fiona
import matplotlib as plt
import json

class Data:

    def __init__(self, file):
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
        
        light_data = 'light_data.gpkg'

        with fiona.open(self.file, 'r', layer='batiment_groupe_compile') as source:
            with fiona.open(light_data, 'w', driver='GPKG') as new_file:
                for element in source:
                    new_file.write(element)
        return light_data





class Plot:

    def __init__(self, data):
        #data is light_data returned by clear_data
        self.data = data



    def plot_height_city(self, postal_code):
        """
        Display the histogramme of the building's height in the chosen city (choice made by postal_code)

        ---
        Parameters: 
        postal_code : str 
        
        """
        gdf = gpd.read_file(self.data)
        gdf = gdf.groupby(by='code_commune_insee')
        sub_gdf = gdf.get_group(postal_code) 
        sub_gdf.hist('hauteur', bins=10, legend = True)
        plt.show()
        


