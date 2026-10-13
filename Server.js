const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Tumhari exact SQL Server configuration
const dbConfig = {
    user: 'Sohel',                   // Tumhara naya user
    password: '99887766',            // Tumhara naya password
    server: 'localhost\\SQLEXPRESS', // Tumhara SQL Express instance
    database: 'userForm',            // Tumhara NAYA database naam
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

app.post('/login', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);

        let user = req.body.userid;
        let pass = req.body.password;

        // Table aur columns tumhari SQL query ke hisaab se
        let result = await pool.request()
            .input('userId', sql.VarChar, user)
            .input('pwd', sql.VarChar, pass)
            .query("SELECT * FROM tbladminUser WHERE username = @userId AND upassword = @pwd");

        if (result.recordset.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.log("Database Error: ", err);
        res.json({ success: false });
    }
});



// --- Naya Project Save Karne Ka API ---
app.post('/add-project', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let { name, tech, github, status } = req.body;

        await pool.request()
            .input('pName', sql.NVarChar, name)
            .input('pTech', sql.NVarChar, tech)
            .input('pGit', sql.NVarChar, github)
            .input('pStatus', sql.NVarChar, status)
            .query("INSERT INTO tblProjects (projectName, techUsed, githubLink, projectStatus) VALUES (@pName, @pTech, @pGit, @pStatus)");

        res.json({ success: true });
    } catch (err) {
        console.log("Save Error: ", err);
        res.json({ success: false });
    }
});

// --- Saare Projects Dashboard Par Bhejne Ka API ---
app.get('/get-projects', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query("SELECT * FROM tblProjects ORDER BY id DESC"); // Naya project sabse upar

        res.json({ success: true, projects: result.recordset });
    } catch (err) {
        console.log("Fetch Error: ", err);
        res.json({ success: false });
    }
});

// --- 1. Project Delete Karne Ka API ---
app.delete('/delete-project/:id', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('pId', sql.Int, req.params.id)
            .query("DELETE FROM tblProjects WHERE id = @pId");
        res.json({ success: true });
    } catch (err) {
        console.log("Delete Error: ", err);
        res.json({ success: false });
    }
});

// --- 2. Edit Page Ke Liye Ek Project Fetch Karne Ka API ---
app.get('/get-project/:id', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('pId', sql.Int, req.params.id)
            .query("SELECT * FROM tblProjects WHERE id = @pId");
        res.json({ success: true, project: result.recordset[0] });
    } catch (err) {
        console.log("Fetch Single Error: ", err);
        res.json({ success: false });
    }
});

// --- 3. Project Update (Save) Karne Ka API ---
app.put('/update-project', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let { id, name, tech, github, status } = req.body;

        await pool.request()
            .input('pId', sql.Int, id)
            .input('pName', sql.NVarChar, name)
            .input('pTech', sql.NVarChar, tech)
            .input('pGit', sql.NVarChar, github)
            .input('pStatus', sql.NVarChar, status)
            .query("UPDATE tblProjects SET projectName=@pName, techUsed=@pTech, githubLink=@pGit, projectStatus=@pStatus WHERE id=@pId");

        res.json({ success: true });
    } catch (err) {
        console.log("Update Error: ", err);
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});