const {Router} = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../node-firebase-ejemplo-62ef1-firebase-adminsdk-6dpir-626e6a1562.json");

//realiza la conexion al servicio de firebase y a la bd
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-ejemplo-62ef1.firebaseio.com/'
});

//accedemos a la base de datos
const db = admin.database();

router.get('/', (req, res) =>{
    db.ref('contacts').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.render('index', {contacts: data});

    })
  
})

router.post('/new-contact', (req, res) =>{
    console.log(req.body);

    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }

    db.ref('contacts').push(newContact);
    res.send('received')
})

module.exports = router;