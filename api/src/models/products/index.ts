import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeDb } from "../../config";
import { IProduct } from "../../types";

// Crie uma interface para os valores opcionais, já que o Sequelize lida com inserções de forma especial
interface IProductCreationAttributes extends Optional<IProduct, 'product_id'> { }

// Defina o modelo User, agora com tipagem correta, não precisam ser explicitamente definidas dentro do constructor porque o Sequelize cuida dessa parte para você quando você cria ou recupera registros do banco de dados.
export class Product extends Model<IProduct, IProductCreationAttributes> implements IProduct {
  public product_id?: number;
  public name!: string;
  public price!: number;
  public regidh!: Date;
  public regiusu!: number;
  public regadh?: Date;
  public regausu?: number;
}

export default Product.init(
  {
    product_id: {
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
    price: {
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
    tableName: "products",
    timestamps: false,
  }
);

