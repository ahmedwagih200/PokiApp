import pydantic as _pydantic


class _UserBase(_pydantic.BaseModel):
    name: str


class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True


class User(_UserBase):
    id: int

    class Config:
        orm_mode = True


class _PokemonBase(_pydantic.BaseModel):
    name: str
    

class PokemonCreate(_PokemonBase):
    pass


class Pokemon(_PokemonBase):
    id: int
    user_id: int
    

    class Config:
        orm_mode = True