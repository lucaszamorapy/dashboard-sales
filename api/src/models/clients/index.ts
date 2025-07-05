import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IClient } from "../../types";
import { Order } from "../orders";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial
interface IClientCreationAttributes extends Optional<IClient, 'client_id'> { }

// Defina o modelo User, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class Client extends Model<IClient, IClientCreationAttributes> implements IClient {
  public client_id?: number;
  public name!: string;
  public cep?: string;
  public street?: string;
  public neighborhood?: string;
  public tel?: string;
  public cel?: string;
  public regidh!: Date;
  public regiusu!: number;
  public regadh?: Date;
  public regausu?: number;

  static associate() {
    Client.hasMany(Order, {
      foreignKey: 'client_id',
      as: 'orders',
    });
  }
  static initModel(sequelize: Sequelize) {
    Client.init(
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
          allowNull: true,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        neighborhood: {
          type: DataTypes.STRING,
          allowNull: true,
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
        sequelize: sequelize, // Sua instância do Sequelize
        tableName: "clients",
        timestamps: false,
      }
    );

  }
}

