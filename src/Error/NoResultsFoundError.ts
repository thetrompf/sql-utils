import { UnexpectedNumberOfResultsError } from './UnexpectedNumberOfResultsError';

export class NoResultsFoundError extends UnexpectedNumberOfResultsError {
    public constructor(public sqlQuery: string, sqlParameters: ReadonlyArray<any> | null) {
        super('No results were found for the query. One or more results were expected.', sqlQuery, sqlParameters);
        Object.setPrototypeOf(this, NoResultsFoundError.prototype);
    }
}
