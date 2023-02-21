import axios from "axios";
import { setWallpaper } from "wallpaper";
import fs from "fs";
import * as dotenv from 'dotenv';

dotenv.config()

const APOD_KEY = process.env.APOD_KEY;

axios
  .get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}`)
  .then((res) => {
    const imgUrl = res.data.hdurl;
    const imgFile = imgUrl.split("/").pop();

    axios.get(imgUrl, { responseType: "stream" }).then((res) => {
      const stream = res.data;
      const file = fs.createWriteStream(imgFile);

      stream.pipe(file);
      file.on("finish", () => {
        setWallpaper(imgFile).then(console.log("Done"));
      });
    });
  })
  .catch((err) => console.log(err));
