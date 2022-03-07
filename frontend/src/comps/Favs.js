import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const Favs = () => {

    const [token] = useContext(UserContext);
    const [favs, setFavs] = useState([]);

    const getFavs = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("/api/pokemons", requestOptions);
        if (!response.ok) {
            console.log("Something went wrong. Couldn't load tfs");
        } else {
            const data = await response.json();
            setFavs(data)
        }
    };

    useEffect(() => {

        getFavs();
    }, []);



    const add_favs = async (name) => {

        console.log(name)

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                name: name

            }),
        };
        const response = await fetch("/api/pokemons", requestOptions);
        if (!response.ok) {
            console.log("failed to remove fav")
        } else {

            getFavs()
        }
    }

    const remove_favs = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch(`/api/pokemons/${id}`, requestOptions);
        if (!response.ok) {
            console.log("Failed to delete fav");
        } else { getFavs() }
    };

    return (

        <div style={{ padding: '50px', margin: "25px" }} class="d-flex flex-wrap ">
            {favs.map((poki) => {
                return (
                    <div style={{ padding: '40px', margin: "25px" }} class="card">

                        <h4>Pokemon Name : {poki.name}</h4>

                        {!favs.some(item => poki.name === item.name)
                            && <button style={{ margin: "10px" }} type="button" class="btn btn-secondary"
                                onClick={() => add_favs(poki.name)}>Add to favs</button>}

                        {favs.some(item => poki.name === item.name)
                            && <button style={{ margin: "10px" }} type="button" class="btn btn-secondary"
                                onClick={() => remove_favs(poki.id)}>remove from favs </button>}

                    </div>
                )
            })}
        </div>

    );
};
export default Favs;
