import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IOrder, IOrderProduct, PaymentMethod } from "../../types";
import { Client } from "../clients";
import { Product } from "../products";
import { Order } from "../orders";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial
interface IOrderCreationAttributes extends Optional<IOrderProduct, 'order_product_id'> { }

// Defina o modelo User, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class OrderProducts extends Model<IOrderProduct, IOrderCreationAttributes> implements IOrderProduct {
  public order_product_id?: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public regidh!: Date;
  public regiusu!: number;
  public regadh?: Date;
  public regausu?: number;

  static associate() {
    OrderProducts.belongsTo(Order, {
      foreignKey: "order_id",
      as: 'order',
    });
    OrderProducts.belongsTo(Product, {
      foreignKey: "product_id",
      as: 'product',
    });
  }

  static initModel(sequelize: Sequelize) {
    OrderProducts.init(
      {
        order_product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        order_id: {
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
        tableName: "orders_products",
        timestamps: false,
      }
    );
  }
}


