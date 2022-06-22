import { Pipe, PipeTransform } from '@angular/core';
import { UserData } from '../user-data.model';

@Pipe({
    name: 'valueArray',
})
export class ValueArrayPipe implements PipeTransform {
    transform(objects: any = []): UserData[] {
        return Object.values(objects);
    }
}
