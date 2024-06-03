import fastify from "fastify";
import fastifyCors from "@fastify/cors"; 
import { RegisterImmobile } from "./class/registeImmobile.js";
import { RegisterUser } from "./class/registerUser.js";


const server = fastify();
const userRegistration = new RegisterUser();
const immobileRegistration = new RegisterImmobile();

server.register(fastifyCors);

server.post("/registerUser", async (request, reply) => {
  try {
    const { email, senha, username } = request.body;
  const register = await userRegistration.register({ email, senha, username });
    reply.send(register); 
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    reply.status(500).send("Erro ao registrar usuário"); 
  }
});

server.post("/registerImmobile", async (request, reply) => {
  try {
    const {  bairro, cep, cidade, img, iptu, name, number, rent, rua, uf, broker } = request.body;

    await immobileRegistration.register({ bairro, cep, cidade, img, iptu, name, number, rent, rua, uf, broker });
    reply.status(201).send(); 
  } catch (error) {
    console.error("Error registering property:", error);
    reply.status(500).send("Error registering property"); 
  } 
})

server.post("/deleteImmobile", async (resquest, reply) =>{
  try{
    const {id} = resquest.body
    const result = await immobileRegistration.deleteImovel(id)
    reply.status(200).send(result)
  } catch(error){
    console.error("Error listing properties:", error);
    reply.status(500).send("Error listing properties");
  }
})


server.post("/listImmobile", async (request, reply) => {
  try {
    const immobiles = await immobileRegistration.list();
    reply.status(200).send(immobiles);
  } catch (error) {
    console.error("Error listing properties:", error);
    reply.status(500).send("Error listing properties");
  }
});




server.post("/login", async (request, reply) => {
  try {
    const { email, password } = request.body;
    const loginReturn = await userRegistration.login(email, password)
    console.log("Tentativa de login com email:", email, password);
    reply.status(200).send(loginReturn)
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    reply.status(500).send("Erro ao fazer login");
  }
});

// Iniciar o servidor
const PORT = 3333;
const HOST = '127.0.0.1';
server.listen(PORT, HOST, (err, address) => {
  if (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
