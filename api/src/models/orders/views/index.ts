import { DataTypes, Model, Sequelize } from "sequelize";
import { IVwOrder, PaymentMethod } from "../../../types";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial

// Defina o modelo User, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class VwOrder extends Model<IVwOrder> implements IVwOrder {
  public order_id?: number;
  public client_name!: string;
  public product_name!: string;
  public quantity!: number;
  public payment_method!: PaymentMethod;
  public delivery_date!: Date;
  public delivery_time?: string;
  public total!: number;
  public regidh!: Date;
  public regiusu!: number;
  public regadh?: Date;
  public regausu?: number;

  static initModel(sequelize: Sequelize) {
    VwOrder.init(
      {
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        client_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        product_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        payment_method: {
          type: DataTypes.ENUM(...Object.values(PaymentMethod)),
          allowNull: false,
        },
        delivery_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        delivery_time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        total: {
          type: DataTypes.NUMBER,
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
        tableName: "vworders",
        timestamps: false,
      }
    );
  }
}


