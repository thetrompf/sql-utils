import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { Escaper } from '../Runtime/Escaper';
import { getForeignTableName } from './GetForeignTableName';
import { mapPrefixedOutputColumnSqlExpr } from './MapPrefixedOutputColumnSqlExpr';

export function mapForeignSqlSelect(
    escape: Escaper,
    tableName: string,
    tableAlias: string,
    columnMap: ColumnMap,
    prefix: string,
): string {
    const properties = Object.keys(columnMap).filter(e => getForeignTableName(columnMap[e]) === tableName);
    const sqlPrefix = tableAlias == null ? '' : `${escape.identifier(tableAlias)}.`;

    return properties
        .map(prop => {
            const res = columnMap[prop];
            const selectExpr = mapPrefixedOutputColumnSqlExpr(escape, sqlPrefix, res);

            return `${selectExpr} as ${escape.identifier(prefix + prop)}`;
        })
        .join(', ');
}
