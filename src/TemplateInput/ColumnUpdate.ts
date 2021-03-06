import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { Escaper } from '../Runtime/Escaper';
import { getColumnInputExpr } from '../Util/GetColumnInputExpr';
import { getColumnName } from '../Util/GetColumnName';
import { isForeignTable } from '../Util/IsForeignTable';
import { isReadOnly } from '../Util/IsReadOnly';
import { mapInputValue } from '../Util/MapInputValue';
import { prefixParamName } from '../Util/PrefixParamName';

export class ColumnUpdate {
    public constructor(
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(escape: Escaper, addParam: (paramName: string, value: any) => string): string {
        return Object.keys(this.map)
            .filter(column => !(isReadOnly(this.map[column]) || isForeignTable(this.map[column])))
            .map(column => {
                const columnMap = this.map[column];
                const columnName = escape.identifier(getColumnName(columnMap));
                const paramValue = mapInputValue(columnMap, this.value[column]);
                const paramName = addParam(prefixParamName(this.paramName, column), paramValue);
                const value = getColumnInputExpr(columnMap, paramName);

                return `${columnName} = ${value}`;
            })
            .join(',\n\t\t');
    }
}
