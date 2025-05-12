import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeDb } from "../../config";
import { IOrder, PaymentMethod } from "../../types";
import { Client } from "../clients";
import { Product } from "../products";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial
interface IOrderCreationAttributes extends Optional<IOrder, 'order_id'> { }

// Defina o modelo User, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class Order extends Model<IOrder, IOrderCreationAttributes> implements IOrder {
  public order_id!: number;
  public client_id!: number;
  public product_id!: number;
  public quantity!: number;
  public payment_method!: PaymentMethod;
  public delivry_date!: Date;
  public total!: number;
  public regidh!: Date;
  public regiusu!: number;
  public regadh?: Date;
  public regausu?: number;

  static associate() {
    Order.belongsTo(Client, {
      foreignKey: "client_id",
      as: "client",
    });

    Order.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

export default Order.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
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
    delivry_date: {
      type: DataTypes.DATE,
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
    sequelize: sequelizeDb, // Sua instância do Sequelize
    tableName: "orders",
    timestamps: false,
  }
);

