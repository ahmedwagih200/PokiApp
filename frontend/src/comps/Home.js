import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

    const [token] = useContext(UserContext);
    const [pokis, setPokis] = useState([]);
    const [favs, setFavs] = useState([]);
    
    const fetchData = () => {
        axios.get("https://pokeapi.co/api/v2/pokemon/")
            .then((res) => {
                console.log(res.data.results);
                setPokis(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
        fetchData();
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
        }else{getFavs()}
    };

    return (

        <div style={{ padding: '50px', margin: "25px" }} class="d-flex flex-wrap ">
            {pokis.map((poki) => {
                let fav_id = 0
                return (
                    <div style={{ padding: '40px', margin: "25px" }} class="card">

                        <h4>Pokemon Name : {poki.name}</h4>

                        {!favs.some(item => poki.name === item.name)
                            && <button style={{ margin: "10px" }} type="button" class="btn btn-secondary"
                                onClick={() => add_favs(poki.name)}>Add to favs</button>}

                        {favs.some(function (e) {
                            if (e.name === poki.name) {
                                fav_id = e.id
                                return true;
                            }
                        })
                            && <button style={{ margin: "10px" }} type="button" class="btn btn-secondary"
                                onClick={() => remove_favs(fav_id)}>Remove from favs</button>}


                    </div>
                )
            })}
        </div>

    );
};
export default Home;
