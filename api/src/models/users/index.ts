import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelizeDb } from "../../config";
import { IUser } from "../../types";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial
interface IUserCreationAttributes extends Optional<IUser, 'user_id'> { }

// Defina o modelo User, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class User extends Model<IUser, IUserCreationAttributes> implements IUser {
  public user_id?: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public regidh!: Date;
  public regiusu!: number;
  public regadh?: Date;
  public regausu?: number;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        user_id: {
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
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
        tableName: "users",
        timestamps: false,
      }
    );


  }
}

