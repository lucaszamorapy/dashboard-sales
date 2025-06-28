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

// Objetivo: Essa interface (interface IOrderCreationAttributes extends Optional<IOrder, 'order_id'> { }) define os atributos que são opcionais na hora de criar um registro (como quando você faz um Order.create({...})).
// Aqui está dizendo que order_id é opcional ao criar um pedido, pois normalmente é gerado automaticamente pelo banco de dados (auto-incremento).
// Ela usa o helper Optional<T, K> do Sequelize/TypeScript, que transforma a chave K de T em opcional.

// export class Order extends Model<IOrder, IOrderCreationAttributes> implements IOrder, Order é uma classe que estende Model do Sequelize, com dois parâmetros de tipo:
// IOrder: define todos os campos que existem em um registro da tabela.
// IOrderCreationAttributes: define os campos necessários ao criar um novo registro.

// public order_id?: number;
// public client_id!: number;
// public payment_method!: PaymentMethod;
// !: = diz ao TypeScript que a propriedade sempre estará definida, mesmo sem inicializar no construtor. Isso é comum em modelos do Sequelize, pois quem "preenche" os dados é o próprio ORM.
// ?: = diz que a propriedade é opcional, usada para campos que podem não estar presentes (como order_id ao criar um novo pedido, ou delivery_time, que pode ser nulo).

// static associate() {
//   Order.belongsTo(Client, { ... });
//   Order.hasMany(OrderProducts, { ... });
//   Order.belongsToMany(Product, { ... });
// }
// Define os relacionamentos entre os modelos:
// Order pertence a um Client.
// Order tem muitos OrderProducts.
// Order tem muitos Product, via tabela intermediária OrderProducts.





