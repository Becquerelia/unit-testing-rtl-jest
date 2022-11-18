import axios from "axios"

export const callEndpoint = () => {
    return axios.get("https://pokeapi.co/api/v2/pokemon/mew").then(response => response.data);
}