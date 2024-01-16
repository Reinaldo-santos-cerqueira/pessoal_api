import AppError from "../../application/errors/AppError";
import AtividadeEntity from "../../domain/entity/atividade";
import { AtividadeRepository } from "../../domain/repository/atividade.repository";
import conn from "../config/database.config";

export default class AtividadePostgresRepository implements AtividadeRepository {
    async insert(input: AtividadeEntity): Promise<AtividadeEntity> {
        try {
            await conn.query("BEGIN");
            const atividade = await conn.query(`INSERT INTO ATIVIDADES(
          ATIVIDADE
      )VALUES(
        '${input.props.atividade}'
      ) RETURNING *`);
            await conn.query("COMMIT");
            return atividade.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, 500);
        }
    }

    async getAll(): Promise<AtividadeEntity[]> {
        try {
            const atividades = await conn.query(
                "SELECT ID, ATIVIDADE FROM ATIVIDADES",
            );

            return atividades.rows;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }

    async findById(id: number): Promise<number> {
        const cargo = (await conn.query(`SELECT * FROM ATIVIDADES WHERE ID = ${id}`)).rowCount;
        return cargo;
    }

    async update(id: number, input: AtividadeEntity): Promise<AtividadeEntity> {
        try {
            await conn.query("BEGIN");

            const atividade = await conn.query(
                `UPDATE ATIVIDADES SET ATIVIDADE = '${input.props.atividade}' WHERE ID = ${id} RETURNING *`,
            );

            await conn.query("COMMIT");
            return atividade.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, 500);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM ATIVIDADES WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, 500);
        }
    }
}
