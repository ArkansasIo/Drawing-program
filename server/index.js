import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app=express();
const port=Number(process.env.PORT||3000);
app.use(cors());
app.use(express.json({limit:"20mb"}));

const pool=mysql.createPool({
 host:process.env.DB_HOST||"127.0.0.1",
 port:Number(process.env.DB_PORT||3306),
 user:process.env.DB_USER||"drawing_app",
 password:process.env.DB_PASSWORD||"",
 database:process.env.DB_NAME||"drawing_program",
 waitForConnections:true,
 connectionLimit:10
});

app.get("/api/health",async(_req,res)=>{
 try{const [rows]=await pool.query("SELECT 1 AS db");res.json({ok:true,service:"drawing-program-api",database:rows[0].db===1})}
 catch(e){res.status(503).json({ok:false,service:"drawing-program-api",database:false,error:e.message})}
});

app.get("/api/library",async(_req,res)=>{
 const [rows]=await pool.query("SELECT id,category,title,description,guide_json FROM library_items WHERE published=1 ORDER BY category,title");
 res.json(rows);
});

app.get("/api/projects",async(req,res)=>{
 const owner=String(req.query.owner||"");
 const [rows]=await pool.query("SELECT id,name,description,updated_at FROM projects WHERE owner=? ORDER BY updated_at DESC",[owner]);
 res.json(rows);
});

app.post("/api/projects",async(req,res)=>{
 const {owner,name,description=""}=req.body||{};
 if(!owner||!name)return res.status(400).json({error:"owner and name are required"});
 const [result]=await pool.execute("INSERT INTO projects(owner,name,description) VALUES(?,?,?)",[owner,name,description]);
 res.status(201).json({id:result.insertId,owner,name,description});
});

app.listen(port,()=>console.log(`Drawing Program API listening on :${port}`));
