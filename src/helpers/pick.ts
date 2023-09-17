export const pick = (query: Record<string, any>, searchArr: string[]): Record<string, any> => {
    const modifiedQuery: Record<string, any> = {}
    for (const term of searchArr) {
        if (query.hasOwnProperty(term)) {
            modifiedQuery[term] = query[term];
        }
    }
    return modifiedQuery
};
