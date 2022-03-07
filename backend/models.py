import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash
from sqlalchemy import Column, Integer, String, Table, ForeignKey

import database as _database



class User(_database.Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    pokemons = _orm.relationship("Pokemon", back_populates='user')

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)



class Pokemon(_database.Base):
    __tablename__ = "pokemons"
   
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    name = _sql.Column(_sql.String,index=True)

    user = _orm.relationship("User", back_populates="pokemons")
