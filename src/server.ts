import express, { Request, Response } from 'express'
import cors from 'cors'
import { sample_foods } from './data';

const app = express();
//web url localhost:4200
//api url localhost:5000
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});

app.get("/api/foods", (req, res) => {
    res.send(sample_foods)
})

app.get("/api/foods/search", (req: Request<any, any, any, any>, res:Response<any>) => {
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(req.query.keyword.toLowerCase()));
    res.send(foods);
});

app.get("/api/foods/getFoodByFoodId/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId);
    res.send(food);
})