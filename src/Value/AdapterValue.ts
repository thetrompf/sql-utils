import { DataAdapterMap } from '../Adapter/DataAdapters';
import { getAdapter } from '../Adapter/GetAdapter';

export function adapterValue<TAdapter extends keyof DataAdapterMap>(
    adapterName: TAdapter,
    value: string,
): DataAdapterMap[TAdapter][' valueType'] {
    return getAdapter(adapterName).fromSqlValue(value);
}
