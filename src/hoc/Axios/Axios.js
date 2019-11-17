import axios from "axios";

export const server = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com/",
  headers: {
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "0fa10af17amshce306c52ef2b5e3p171b79jsn22b4214764b7"
  }
});