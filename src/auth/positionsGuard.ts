import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Position } from "src/positions/DTO/position-entity";
import { POSITIONS_KEY } from "./DTO/constant";
import { JwtService } from "@nestjs/jwt";
import { Positions, doctors } from "src/users/DTO/get-users-by-position.dto";





@Injectable()
export class PositionsGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService) {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  const requiredPositions = this.reflector.getAllAndOverride<Positions[]>(POSITIONS_KEY, [
    context.getHandler(),
    context.getClass()
  ])
  if (!requiredPositions) {
    return true;
  }
  try {
    const request = context.switchToHttp().getRequest()
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new UnauthorizedException({message: 'AuthHeader not found'})
  }
  const bearer = authHeader.split(' ')[0]
  const token = authHeader.split(' ')[1]
  if (!token || !bearer) {
   throw new UnauthorizedException({message: 'Token not found'});
 }
 const user = this.jwtService.verify(token)
 if (requiredPositions.includes('DOCTORS')) {
for (let posObj of user.positions) {
  if (doctors.includes(posObj.value)) {
    return true
  }
}
 }
 for (let posObj of user.positions) {
  if (requiredPositions.includes(posObj.value)) {
    return true
  }
 }
 throw new ForbiddenException({message: 'You dont have rights for this route'})
  } catch (error) {
    throw new UnauthorizedException({message: error})
  }
  }
  
}