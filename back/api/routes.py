from flask import request
from flask_restx import Resource, fields, Api
from .models import Building
from flask import jsonify
from graph_generator import graph
from .functions import *
import pathlib


rest_api = Api(version="1.0", title="miniprojet API")
host_name = "http://localhost:5000/api/"
site_name = "http://localhost:3000/"

### loading the data
p = pathlib.Path(__file__).parent.absolute()
parent_path = p.parent.parent.absolute()
module_path = parent_path / "data_viz.py"

import importlib.util

print("loading data...")
# Load the module from the file path
spec = importlib.util.spec_from_file_location("your_module", module_path)

data_viz = importlib.util.module_from_spec(spec)
spec.loader.exec_module(data_viz)


data = data_viz.Stats(parent_path / "light_building.gpkg")
city_list = edit_city_list(data.city_list())
print(city_list)
"""
    Flask-Restx models for api request and response data
"""

building_model = rest_api.model(
    "BuildingModel",
    {
        "name": fields.String(required=True, min_length=2, max_length=32),
        "height": fields.Integer(required=True, min=0, max=1000),
    },
)

building_edit_model = rest_api.model(
    "BuildingEditModel", {"height": fields.Integer(required=True)}
)


"""
    Flask-Restx routes
"""


@rest_api.route("/api/receive")
class Receive(Resource):
    def post(self):
        data = request.json
        d = dict(data)
        keys = list(d.keys())
        if "filename" in keys:
            filename = d["filename"]
            graph(filename)

        return jsonify({"status": "success", "message": "Data received"})


@rest_api.route("/api/searchbar/list")
class ListBuildings(Resource):
    """
    Returns a list of all cities
    """

    data = city_list

    def get(self):
        return jsonify(self.data)


@rest_api.route("/api/buildings/list")
class ListBuildings(Resource):
    """
    Returns a list of all buildings
    """

    def get(self):
        buildings = Building.query.all()

        return {
            "success": True,
            "buildings": [building.toJSON() for building in buildings],
        }, 200


@rest_api.route("/api/buildings/register")
class RegisterBuilding(Resource):
    """
    Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(building_model, validate=True)
    def post(self):
        req_data = request.get_json()

        _name = req_data.get("name")
        _height = req_data.get("height")

        building_exists = Building.get_by_name(_name)
        if building_exists:
            return {"success": False, "msg": "name already taken"}, 400

        new_building = Building(name=_name, height=_height)
        new_building.save()

        return {
            "success": True,
            "buildingID": new_building.id,
            "msg": "The building was successfully registered",
        }, 200


@rest_api.route("/api/buildings/<int:building_id>")
class EditBuilding(Resource):
    """
    Edits User's username or password or both using 'user_edit_model' input
    """

    def get(self, building_id):
        building = Building.get_by_id(building_id)
        return building.toJSON(), 200

    @rest_api.expect(building_edit_model)
    def put(self, building_id):
        building = Building.get_by_id(building_id)
        req_data = request.get_json()

        _new_height = req_data.get("height")

        if _new_height:
            building.update_height(_new_height)
            building.save()

        return {"success": True}, 200
