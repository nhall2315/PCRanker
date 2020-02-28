export interface partType
{
    id: number,
    name: string,
    sortOrder: any
}
export interface Part 
{
    id: number,
    partType: partType,
    typeID: 3,
    name: string,
    benchMarkScore: number,
    buildPart: null
}
export interface build
{
    id: number,
    name: string
}
export interface buildPart
{
    id: number,
    buildID: number,
    partID: number
}