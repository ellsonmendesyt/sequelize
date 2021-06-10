const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())

///conectaar
require('./database/conexao');

const Email = require('./models/Email');
const Usuario = require('./models/Usuario');
const sequelize = require('./database/conexao');

Usuario.hasMany(Email, {as: "MeusEmails", foreignKey:'usuarioId'}); 
Email.belongsTo(Usuario, {as:"Dono", foreignKey:'usuarioId'});
sequelize.sync();

// ============ USUARIOS ====================

app.post('/usuarios', async(req,res)=>{
    const {nome,email, senha}= req.body;
    
    try{
        const usuario =  await Usuario.create({nome,email,senha});
        return res.status(200).json(usuario);
    }catch(erro){
      console.log(erro);
      return res.status(500).json({erro:'erro ao criar'});
    }
})



app.get('/usuarios', async (req,res)=>{
    try{
        
        const usuarios= await Usuario.findAll();
        return res.status(200).json(usuarios)
    }catch(erro){
        console.error(erro);
        return res.status(500).json({erro:'algo deu errado'});
    }
})


async function mandarEmail(remetente,destinatario,mensagem,usuarioId){
    try{
        const usuario = await Usuario.findOne({where:{id:usuarioId}})
        if(usuario){  
            const email = await Email.create({
                remetente:remetente,
                destinatario:destinatario, 
                mensagem:mensagem,
                usuarioId:usuario.get('id')})
        }
    }catch(erro){
        console.log(erro);
    }
}
    


///PUXAR OS EMAILS ATRAVES DO MODEL DO USUARIO
app.get('/usuario/:id', async (req,res)=>{

    const id= req.params.id;

    try{
        
        const usuarios= await Usuario.findAll({where:{id}, include:[{model:Email, as: "MeusEmails"}]});
        return res.status(200).json(usuarios)
    }catch(erro){
        console.error(erro);
        return res.status(500).json({erro:'algo deu errado'});
    }
})



// ====================================


///============ EMAILS ========
app.post('/email', async(req,res)=>{
    const {remetente,destinatario,mensagem,usuarioId}= req.body;
    
    try{
        ///pega o id o usurio no banco de dados   -> usuario.get('id') our usuario.id
        const email =  await Email.create({remetente,destinatario,mensagem,usuarioId});
        return res.status(200).json(email);
    }catch(erro){
      console.log(erro);
      return res.status(500).json({erro:'erro ao criar'});
    }
})


app.get('/emails', async (req,res)=>{
    try{
        
        const emails= await Email.findAll();
        return res.status(200).json(emails)
    }catch(erro){
        console.error(erro);
        return res.status(500).json({erro:'algo deu errado'});
    }
})
    
    
// PUXAR O USUARIO APATIR DO EMAIL
app.get('/email/:id', async (req,res)=>{

    const id= req.params.id;

    try{
        
        const emails= await Email.findAll({where:{id}, include:[{model:Usuario, as: "Dono"}]});
        return res.status(200).json(emails)
    }catch(erro){
        console.error(erro);
        return res.status(500).json({erro:'algo deu errado'});
    }
})
    
    
    
    app.listen(3001,()=>{
        console.log('seridor ativo ...');
})


