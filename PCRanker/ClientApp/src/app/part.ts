export interface PartType
{
    id: number,
    name: string,
    sortOrder: any
}
export interface Part 
{
    id: number,
    partType: PartType,
    typeID: 3,
    name: string,
    benchMarkScore: number,
    buildPart: null
}
export interface Build
{
    id: number,
    name: string
}
export interface BuildPart
{
    id: number,
    buildID: number,
    partID: number
}