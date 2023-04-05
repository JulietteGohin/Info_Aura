# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Building(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    height = db.Column(db.Integer())
    date_created = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"Buildings {self.name} with id equal to {self.id}"
    

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update_height(self, new_height):
        self.height = new_height

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def get_by_height(cls, height):
        return cls.query.filter_by(height=height).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['name'] = self.name
        cls_dict['height'] = self.height

        return cls_dict

    def toJSON(self):

        return self.toDICT()