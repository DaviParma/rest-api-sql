const client = require('./connection.js')
var cors = require('cors')
const express = require('express')
const app = express()


app.use(cors())


const bodyParser = require('body-parser')
app.use(bodyParser.json());



app.get('/users', (req, res)=>{
    client.query(`Select * from users Order by id`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;

});

app.get('/users/check-email/:email', (req, res)=>{
    client.query(`Select * from users where email='${req.params.email}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;

});


app.get('/users/search/:query', (req, res)=>{
    client.query(`select * from users where name Like '%${req.params.query}%' or email Like '%${req.params.query}%'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;

});






app.post('/users', (req, res)=>{
    const user = req.body;
    let insertQuery = `insert into users(name, email, phone) 
                       values('${user.name}', '${user.email}', '${user.phone}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Successfully inserted')
        }
        else{ 
            console.log(err.message) 
        }
    })
    client.end;
    
});


app.put('/users/update/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set name = '${user.name}',
                       email = '${user.email}',
                       phone = '${user.phone}'
                       where id = ${req.params.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Successfully updated')
        }
        else{ 
            console.log(err.message) 
        }
    })
    client.end;
})

app.delete('/users/delete/:id', (req, res)=>{
    let deleteQuery = `delete from users where id=${req.params.id}`

    client.query(deleteQuery, (err, result)=>{
        if(!err){
            res.send('Successfully deleted')
        }
        else{
            console.log(err.message)
        }
    })
    client.end
});


app.listen(5500, ()=> {
    console.log("Server was started at Port 5500");
})

client.connect();
