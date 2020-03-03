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
    typeID: number,
    rank: number,
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
    build: Build,
    partID: number,
    part: Part
}