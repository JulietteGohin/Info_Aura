# -*- encoding: utf-8 -*-


from flask import request, Flask
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields
from .models import Building
from flask import jsonify, render_template, make_response

 ### name of the domain where the app is displayed
site_domain_name = "http://localhost:3000"

app = Flask(__name__)
#cors = CORS(app, resources={r"/api/receive": {"origins": site_domain_name}})
CORS(app)
rest_api = Api(app, version='1.0', title='Building Height API',
               description='A simple API to manage building heights')



#cors = CORS(rest_api, resources={r"/api/*": {"origins": domain_name}})

"""
    Flask-Restx models for api request and response data
"""

building_model = rest_api.model('BuildingModel', {"name": fields.String(required=True, min_length=2, max_length=32),
                                              "height": fields.Integer(required=True, min=0, max=1000)})

building_edit_model = rest_api.model('BuildingEditModel', {"height": fields.Integer(required=True)})
 



@rest_api.route('/api/receive') 
@cross_origin(origin=site_domain_name, headers=['Content-Type', 'Authorization'])
class Receive(Resource):
    def post(self):
        data = request.form.get('data')
        print(data)
        # Process the received data
        # ...
        return jsonify({'status': 'success', 'message': 'Data received'})
    def get(self):
        return make_response(render_template('index.html')  )
   


@rest_api.route('/api/buildings/list')
class ListBuildings(Resource):
    """
       Returns a list of all buildings
    """

    def get(self):

        buildings = Building.query.all()

        return {"success": True,
                "buildings": [building.toJSON() for building in buildings]}, 200


@rest_api.route('/api/buildings/register')
class RegisterBuilding(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(building_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _name = req_data.get("name")
        _height = req_data.get("height")
        print(_name, _height)
        building_exists = Building.get_by_name(_name)
        if building_exists:
            return {"success": False,
                    "msg": "name already taken"}, 400

        new_building = Building(name=_name, height=_height)
        new_building.save()

        return {"success": True,
                "buildingID": new_building.id,
                "msg": "The building was successfully registered"}, 200


@rest_api.route('/api/buildings/<int:building_id>')
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

