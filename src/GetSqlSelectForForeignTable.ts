import { ColumnMap } from './ColumnMap';
import { mapForeignSqlSelect } from './MapForeignSqlSelect';

const cache: Map<ColumnMap, Map<string, Map<string, Map<string, string>>>> = new Map();

export function getSqlSelectForForeignTable(
    tableName: string,
    tableAlias: string,
    columnMap: ColumnMap,
    prefix: string = '',
): string {
    let cachedOuterMapResults = cache.get(columnMap);

    if (cachedOuterMapResults == null) {
        cachedOuterMapResults = new Map<string, Map<string, Map<string, string>>>();
        cache.set(columnMap, cachedOuterMapResults);
    }

    let cachedForeignResults = cachedOuterMapResults.get(tableName);
    if (cachedForeignResults == null) {
        cachedForeignResults = new Map<string, Map<string, string>>();
        cachedOuterMapResults.set(tableName, cachedForeignResults);
    }

    let cachedMapResults = cachedForeignResults.get(tableAlias);

    if (cachedMapResults == null) {
        cachedMapResults = new Map<string, string>();
        cachedForeignResults.set(tableAlias, cachedMapResults);
    }

    const cached = cachedMapResults.get(prefix);

    if (cached == null) {
        const result = mapForeignSqlSelect(tableName, tableAlias, columnMap, prefix);
        cachedMapResults.set(prefix, result);
        return result;
    } else {
        return cached;
    }
}
