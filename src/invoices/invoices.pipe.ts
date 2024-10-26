import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NonEmptyArrayPipe implements PipeTransform {
  transform(value: any) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new BadRequestException('Array should not be empty');
    }
    return value;
  }
}
