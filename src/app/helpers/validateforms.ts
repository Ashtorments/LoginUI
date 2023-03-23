import { FormControl, FormGroup } from "@angular/forms";

// A helper class for validating form fields
export default class validateforms{

  // A static method that marks all form fields as dirty, triggering validation messages to show
  static validateAllFormFields(formGroup:FormGroup){
    // Loop over all form fields
    Object.keys(formGroup.controls).forEach(field=>{
      // Get the form control for this field
      const control = formGroup.get(field);
      // If the control is a FormControl (i.e. not a FormGroup), mark it as dirty
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      } 
      // If the control is a FormGroup, recursively call this function on the FormGroup
      else if (control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}
