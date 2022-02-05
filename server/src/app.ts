import express from "express";
import { Request, Response } from "express"
import { join,resolve } from "path";
import { readFileSync,writeFile} from "fs";

const Port = 80;

const app = express();
app.get("/service-worker.js", (req, res) => {
  res.sendFile(resolve(__dirname, "../../", "service-worker.js"));
});
app.use('/Fonts', express.static(join(__dirname, "../../Fonts")))
app.use('/dist', express.static(join(__dirname, "../../dist")))
app.use('/Images', express.static(join(__dirname, "../../Images")))
app.use('/db', express.static(join(__dirname, "../../db")))
app.use('/Voice', express.static(join(__dirname, "../../Voice")))
app.use('/manifest.json', express.static(join(__dirname,"../../","manifest.json")))


app.use(express.urlencoded({ extended: true }));

app.post("/add_word", (req: Request, res: Response) => {
  const data = JSON.parse(readFileSync(join(__dirname, "../../db/Words.json"), 'utf8'));

  let topic: string = req.body.topic;

  for (const [key, value] of Object.entries(data)) {
    if (key === topic.split("-")[0]) {
      for (const [key, valu] of Object.entries(value)) {
        if (key === topic.split("-")[1]) {
          valu.push(req.body.word);
        }
      }
    }
  }

  writeFile(join(__dirname, "../../db/Words.json"),JSON.stringify(data),err=>{
    if(err){
      console.log(err);
    }
  })
  // console.log(Object.keys(data));
  res.redirect("/add_word")
})

app.use("*", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../../", "index.html"))
})


app.listen(Port, () => {
  console.log(`Server is Runing To Address http://localhost:${80}`);
})