"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://tinyurl.com/demo-cupcake"

def connect_db(app):
    '''Connects Database to Flask'''

    db.app = app
    db.init_app(app)





# # # # # # # # # # # # # # # # MODELS # # # # # # # # # # # # # # # # # # # # # # # # 

class Cupcake(db.Model):
    '''DatabaseModel for Cupcakes'''

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

    def serialize(self):
        '''Serialized Cupcake to dict for JSON'''

        return {
            'id': self.id,
            'flavor': self.flavor,
            'rating': self.rating,
            'size': self.size,
            'image': self.image,
        }