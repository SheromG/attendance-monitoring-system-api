import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken, allowRoles } from "./middlewares/authMiddleWare.js";
import teacherRoutes from './routes/teacherRoutes.js'
import studentRoutes from './routes/studentRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", verifyToken, (req, res) => {
    res.send("Server is running!");
});

app.post("/login", async (req, res) => {
    const { userName, password } = req.body;

    const user = await db
        .selectFrom("users")
        .select([
            "id",
            "user_id",
            "username",
            "password",
            "firstname as firstName",
            "lastname as lastName",
            "email",
            "role"
        ])
        .where("username", "=", userName)
        .executeTakeFirst();

    if(!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    
    const token = jwt.sign( 
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h"} 
    );

    return res.json({
        message: "Login successful",
        user: {
            id: user.id,
            user_id: user.user_id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        },
        token
    });
});

const teacher = "teacher"

const student = "student"

app.use(`/${teacher}`, verifyToken, allowRoles(teacher), teacherRoutes);

app.use(`/${student}`, verifyToken, allowRoles(student), studentRoutes);

app.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`); });