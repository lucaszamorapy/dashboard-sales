import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeDb } from "../../config";
import { IClient } from "../../types";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial
interface IClientCreationAttributes extends Optional<IClient, 'client_id'> { }

// Defina o modelo User, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class Client extends Model<IClient, IClientCreationAttributes> implements IClient {
  public client_id?: number;
  public name!: string;
  public cep!: string;
  public street!: string;
  public neighborhood!: string;
  public tel?: string;
  public cel?: string;
  public regidh!: Date;
  public regiusu!: number;
  public regadh?: Date;
  public regausu?: number;


}

export default Client.init(
  {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    regidh: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    regiusu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    regadh: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    regausu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeDb, // Sua instância do Sequelize
    tableName: "clients",
    timestamps: false,
  }
);

