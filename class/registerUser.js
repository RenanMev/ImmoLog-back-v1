import { v4 as uuidv4 } from "uuid"; 
import { sql } from "../db.js";

export class RegisterUser {
  async register(user) {
    try {
      const userId = uuidv4().replace(/-/g, '');
      const { username, email, senha } = user;
      
      const existingUser = await sql`SELECT * FROM usuario WHERE email = ${email}`;
      if (existingUser.length > 0) {
        return {
          status: 205,
          message: "E-mail já cadastrado"
        };
      }
      
      const result = await sql`
        INSERT INTO usuario (id, username, email, senha, broker)
        VALUES (${userId}, ${username}, ${email}, ${senha}, 1)
        RETURNING *;
      `;
      
      return {
        status: 201,
        result: result[0]
      };
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);
      throw error;
    }
  }

  async validLogin(id){
    try{
      const idAsth = id
      const query = await sql`SELECT id, email, username FROM usuario WHERE id = ${idAsth.id}`
      if(query){
        return query
      } else{
        console.error("Erro ao fazer login:", error.message);
        throw error;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  }
  
  async login(email, password) {
    try {
      const result = await sql`SELECT * FROM usuario WHERE email = ${email}`;
      const user = result[0];
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      
      if (user.senha !== password) {
        return{
          status: 205,
          mensage: "Senha invalida"
        }
      }
      
      // Retornar o usuário se a autenticação for bem-sucedida
      return {
        status: 200,
        mensage: user
      };
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  }
}
