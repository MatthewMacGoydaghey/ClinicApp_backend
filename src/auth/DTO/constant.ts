import { SetMetadata } from "@nestjs/common"
import { Position } from "src/positions/DTO/position-entity"
import { Positions } from "src/users/DTO/get-users-by-position.dto"

export const SECRET = 'Pogodite, eto realno token?'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)



export const POSITIONS_KEY = 'positions'
export const RequiredPositions = (...positions: Positions[]) => SetMetadata(POSITIONS_KEY, positions)