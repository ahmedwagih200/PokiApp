import json
from typing import List
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services, schemas as _schemas



app = _fastapi.FastAPI()

@app.post("/api/users")
async def create_user(
    user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    db_user = await _services.get_user_by_name(user.name, db)
    if db_user:
        raise _fastapi.HTTPException(status_code=400, detail="Name already in use")

    user = await _services.create_user(user, db)

    return await _services.create_token(user)


@app.post("/api/token")
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    user = await _services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")

    return await _services.create_token(user)


@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user


@app.post("/api/pokemons", response_model=_schemas.Pokemon)
async def add_pokemon(
    pokemon: _schemas.PokemonCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.add_pokemon(user=user, db=db, pokemon=pokemon)


@app.get("/api/pokemons", response_model=List[_schemas.Pokemon])
async def get_pokemons(
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_pokemons(user=user, db=db)


@app.delete("/api/pokemons/{pokemon_id}")
async def remove_pokemon(
    pokemon_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.remove_pokemon(pokemon_id, user, db)
    return {"message", "Removed"}    