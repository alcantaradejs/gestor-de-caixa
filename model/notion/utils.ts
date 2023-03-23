export function getRelationID(relations:{id:string}[]) {
    if (relations.length == 1) {
        return relations[0].id
    }
    return relations.map(relation => relation.id)
}