import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproduct:[],searchkey:string,propname:string):any[] {
    const result:any=[]; 
  
    if(!allproduct || searchkey=='' || propname==''){
      return allproduct;
    }

    //searching
    allproduct.forEach((product:any)=>{
      if(product[propname].trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
        result.push(product);
      }
    })
    return result;
  }
}
