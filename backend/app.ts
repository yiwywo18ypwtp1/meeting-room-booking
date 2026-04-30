import express from "express";
import cors from "cors";

import authRouter from "./modules/routes/auth.router";
import roomsRouter from "./modules/routes/rooms.router";


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API working" });
});

app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});