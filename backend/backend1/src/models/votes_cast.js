import { DataTypes } from "sequelize";
import sequelize from "../config/sequalize.js";

const VoteCast = sequelize.define(
  "VoteCast",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    votation_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "votes_cast",
    timestamps: false,
  }
);

export default VoteCast;
