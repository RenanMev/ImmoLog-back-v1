import { v4 as uuidv4 } from "uuid";
import { sql } from "../db.js";

export class RegisterImmobile {
  async register(imovel) {
    try {
      const idImovel = uuidv4().replace(/-/g, '');
      const {bairro, cep, cidade, img, iptu, name, number, rent, rua, uf,broker } = imovel;
      const result = await sql`
        INSERT INTO Imoveis(idImovel, propertyName, cep, street, number, neighborhood, city, state, rent, property_tax, img, broker, status)
        VALUES (${idImovel}, ${name}, ${cep}, ${rua}, ${number}, ${bairro}, ${cidade}, ${uf}, ${rent}, ${iptu}, ${img}, ${broker}, ${"venda"});
      `;
      return { idImovel: idImovel, ...imovel };
    } catch (error) {
      console.error("Erro ao registrar imóvel:", error);
      throw error;
    }
  }
  
  async deleteImovel(Idimovel) {
    const idImovel = Idimovel.replace(/'/g, ''); 
  
    try {
      const result = await sql`
        DELETE FROM Imoveis WHERE idimovel = ${idImovel}
      `;
      console.log("Linha excluída com sucesso:", idImovel);
      return result;
    } catch (error) {
      console.error("Erro ao excluir linha:", error);
      throw error;
    }
  }
  
  

  async list() {
    try {
      const result = await sql`SELECT * FROM Imoveis`;
      return result;
    } catch (error) {
      console.error("Error listing properties:", error);
      throw error;
    }
  }
}
