const express=require('express');
const bodyParser = require('body-parser');
const app=express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


require('dotenv').config();

const port=process.env.PORT || 3000;

//Conexion a Base de Datos

const mongoose=require('mongoose');


const uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fq4zeah.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(uri,
   {useNewUrlParser:true, useUnifiedTopology:true}
)
.then(()=>console.log('Base de datos conectada'))
.catch(e=>console.log(e))


//Motor de Plantillas//
app.set('view engine','ejs');
app.set('views',__dirname + "/views");

app.use(express.static(__dirname + "/public"));

//Rutas Web//
app.use('/',require('./router/RutasWeb'));
app.use('/mascotas',require('./router/Mascotas'));

app.use((req,res,next)=>{
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Titulo del sitio web"
    })
})  


app.listen(port, ()=>{
    console.log('servidor a su servicio en el puerto',port)
})
