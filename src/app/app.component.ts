import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../demo-styling.css','./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-quickstart';
  product_details: any = [
    {
      Product_Name: 'Double A4 Paper',
      Product_Catagory: 'Stationary',
      Unit: 'rim',
      Price: 420
    },
    {
      Product_Name: 'Tissue',
      Product_Catagory: 'Toiletries',
      Unit: 'pc',
      Price: 140
    },
    {
      Product_Name: 'Stapler Machine Kangaroo',
      Product_Catagory: 'Stationary',
      Unit: 'pc',
      Price: 100
    },
    {
      Product_Name: 'Pin Kangaroo 24x6',
      Product_Catagory: 'Others',
      Unit: 'pkt',
      Price: 21
    },
    {
      Product_Name: 'Calculator',
      Product_Catagory: 'Stationary',
      Unit: 'pkt',
      Price: 15
    },
    {
      Product_Name: 'Handwash',
      Product_Catagory: 'Toiletries',
      Unit: 'pc',
      Price: 10
    },
    {
      Product_Name: 'Ocean Gel Pen',
      Product_Catagory: 'Others',
      Unit: 'pc',
      Price: 12
    },
    {
      Product_Name: 'Brush',
      Product_Catagory: 'Toiletries',
      Unit: 'pc',
      Price: 100
    },
    {
      Product_Name: 'Eraser',
      Product_Catagory: 'Others',
      Unit: 'pc',
      Price: 15
    },
    {
      Product_Name: 'Sharpener',
      Product_Catagory: 'Stationary',
      Unit: 'pc',
      Price: 20
    },
    {
      Product_Name: 'James Clip Deli',
      Product_Catagory: 'Stationary',
      Unit: 'litter',
      Price: 40
    },
  ]
  selected_Catagoty: string[] = [];
  catagoty_name: string = '';
  selected_product: any = [];
  product_name: string = '';
  masurement: any = '';

  isError: boolean = false;
  Message: string = ''

  date: any = new Date();

  form_product_purches: any; //for recive form data
  Product_requisition: any = []; //store all the requsition of same catagory
  billing: any = [];

  constructor(private fb: FormBuilder) {
    this.ExtractUniqueCatagoty();
    this.catagoryChange();
  }

  stopError() {
    this.isError = false;
  }

  private ExtractUniqueCatagoty() {
    const catagory = new Set<string>();
    for (let item of this.product_details) {
      catagory.add(item.Product_Catagory);
    }
    this.selected_Catagoty = Array.from(catagory);
  }

  catagoryChange() {
    this.selected_product = [];
    for (let item of this.product_details) {
      if (item.Product_Catagory === this.catagoty_name) {
        this.selected_product.push(item.Product_Name);
      }
    }
  }

  ngOnInit(): void {
    this.form_product_purches = this.fb.group({
      Product_Select: ['', Validators.required],
      Quentity: ['', Validators.required],
      Remarks: [''],
    });
  };

  ProductChange() {
    // console.log(this.form_product_purches.value.Product_Select);
    for (let item of this.product_details) {
      if (item.Product_Name === this.form_product_purches.value.Product_Select) {
        this.masurement = item.Unit;
      }
    }
  }

  DataSubmit() {
    if (!this.form_product_purches.invalid && this.form_product_purches.value.Quentity > 0) {
      this.Product_requisition.push(this.form_product_purches.value);
      // console.log(this.Product_requisition);
      this.form_product_purches.reset();
      this.Message = "Item Inserted Succesfull"
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 5000);
    } else if (this.form_product_purches.value.Quentity < 1) {
      this.Message = "Please Select Atleast One Item"
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 5000);
    } else if (this.form_product_purches.value.Product_Select === '') {
      this.Message = "Please Select an Item"
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 5000);
    }
    else {
      console.log('Error');
    }
  }

  DeleteProduct(data: any) {
    const indexToRemove = this.Product_requisition.indexOf(data);
    console.log(indexToRemove);
    if (indexToRemove !== -1) {
      this.Product_requisition.splice(indexToRemove, 1);
    }
    this.Message = "Item Is Removed Succesfully"
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 5000);
  }

  ClaearRequisation() {
    this.Product_requisition = [];
    this.form_product_purches.reset();
    this.Message = "Clear Succesfull"
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 5000);
  }


  Bill() {
    if(this.Product_requisition.length === 0){
      this.Message = "No item has been selected yet!!"
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 5000);
    }else{
      for (let items of this.Product_requisition) {
        for (let item of this.product_details) {
          if (items.Product_Select === item.Product_Name) {
            this.billing.push({
              Product: item.Product_Name,
              Catagoty: item.Product_Catagory,
              Ouentity: items.Quentity + item.Unit,
              Actual_Price: item.Price,
              Total_price: (items.Quentity * item.Price),
            });
          }
        }
      }
      this.Product_requisition = []
      this.Message = "Bill Is Given"
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 5000);
    }
  }

  Deletebill(data: any) {
    const indexToRemove = this.billing.indexOf(data);
    console.log(indexToRemove);
    if (indexToRemove !== -1) {
      this.billing.splice(indexToRemove, 1);
    }
  }
}
