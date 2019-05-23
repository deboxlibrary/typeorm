import { Brackets } from "../query-builder/Brackets";
import { SelectQueryBuilder } from "../query-builder/SelectQueryBuilder";

export interface Pagination {
    id: string;
    limit?: number;
    createAt?: number;
    isAscending?: boolean;
    isForward?: boolean;
}

interface Options {
    idName?: string;
    createdAtName?: string;
}

const optionsDefault = {
    idName: "id",
    createdAtName: "createdAt"
};

/**
 * create pagination query base SelectQueryBuilder.
 * @param alias table name alias
 * @param pagination Pagination @see Pagination
 * @param options Options @see Options
 */
export const paginationSelectQueryBuilder = <T>(
    select: SelectQueryBuilder<T>,
    pagination: Pagination,
    options: Options = optionsDefault
): SelectQueryBuilder<T> => {
    options.createdAtName = options.createdAtName || optionsDefault.createdAtName;
    options.idName = options.idName || optionsDefault.idName;
    const alias = select.alias;
    const op = !pagination.isForward ? ">" : "<";
    if (pagination.createAt) {
        if (pagination.id) {
            select
                .where(
                    new Brackets(qb =>
                        qb
                            .where(
                                new Brackets(qb1 =>
                                    qb1
                                        .where(`${alias}.${options.idName} = :createAt`, {
                                            createAt: pagination.createAt
                                        })
                                        .andWhere(`${alias}.${options.idName} = :id`, { id: pagination.id })
                                )
                            )
                            .andWhere(`${alias}.${options} ${op} :createAt`, { createAt: pagination.createAt })
                    )
                )
        }
        select.addOrderBy(options.createdAtName, pagination.isAscending ? "ASC" : "DESC")
            .addOrderBy(options.idName, pagination.isAscending ? "ASC" : "DESC");
    } else {
        if (pagination.id) {
            select
                .where(
                    new Brackets(qb => {
                        qb.where(`${alias}.${options.idName} ${op} :id`, { id: pagination.id });
                    })
                )
        }
        select.addOrderBy(options.idName, pagination.isAscending ? "ASC" : "DESC");
    }
    return select.limit(pagination.limit);
};
