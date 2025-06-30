import { DataTypes } from "sequelize";
import sequelize from "../config/sequalizeVote.js";

const Vote = sequelize.define(
  "Vote",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    votation_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "votationId",
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "candidateId",
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    firma: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    public_key: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "publicKey",
    },
  },
  {
    tableName: "votes",
    timestamps: false,
  }
);

export default Vote;
