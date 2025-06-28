import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IOrder, PaymentMethod, Status } from "../../types";
import { Client } from "../clients";
import { OrderProducts } from "../orderProducts";
import { Product } from "../products";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial
interface IOrderCreationAttributes extends Optional<IOrder, 'order_id'> { }

// Defina o modelo Order, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class Order extends Model<IOrder, IOrderCreationAttributes> implements IOrder {
  public order_id?: number;
  public client_id!: number;
  public payment_method!: PaymentMethod;
  public delivery_date!: Date;
  public delivery_time?: string;
  public status!: Status;
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

    Order.hasMany(OrderProducts, {
      foreignKey: "order_id",
      as: "order_products",
    });

    Order.belongsToMany(Product, {
      through: OrderProducts,
      foreignKey: "order_id",
      otherKey: "product_id",
      as: "products",
    });

  }
  static initModel(sequelize: Sequelize) {
    Order.init(
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
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(Status)),
          allowNull: false,
        },
        total: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        obs: {
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
        tableName: "orders",
        timestamps: false,
      }
    );
  }
}


