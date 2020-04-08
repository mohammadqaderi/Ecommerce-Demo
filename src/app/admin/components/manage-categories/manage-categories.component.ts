import {Component, OnInit, TemplateRef} from '@angular/core';
import {CategoryService} from "../../../services/category/category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ProductService} from "../../../services/product/product.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Category} from "../../../models/category";
import {FileUploader} from "ng2-file-upload";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  categories: Category[];
  category: Category;
  createCategoryDto: FormGroup;
  categoryTypes = [
    "PCs",
    "LAPTOPS",
    "PLAY_STATIONS",
    "ACCESSORIES",
    "HEAD_PHONES",
    "OTHERS"
  ];
  modalRef: BsModalRef;
  selectedCategory = "";
  createProductDto: FormGroup;
  updateCategoryDto: FormGroup;
  updateProductDto: FormGroup;
  productCreationFormData: FormData = new FormData();
  productUpdatingFormData: FormData = new FormData();

  selectedFile: string;
  updateSelectedFile: string;
  public uploader: FileUploader = new FileUploader({});

  get cType() {
    return this.createCategoryDto.get("type");
  }

  viewCategoryProducts(category: Category) {
    this.prepareCategory(category);
  }

  prepareCategory(category: Category) {
    this.category = category;
  }

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {
    this.categories = this.route.snapshot.data.categories;
  }

  ngOnInit() {
    this.createCategoryDto = this.fb.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required)
    });
    this.createProductDto = this.fb.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });
    this.updateCategoryDto = this.fb.group({
      name: new FormControl(""),
      description: new FormControl(""),
      type: new FormControl({
        value: "",
        disabled: true
      })
    });
  }


  hide(): void {
    this.dialog.closeAll();
  }


  prepareProductForm(product: Product) {
    this.updateProductDto = this.fb.group({
      name: new FormControl(product.name),
      description: new FormControl(product.description),
      quantity: new FormControl(product.quantity),
      price: new FormControl(product.price),
      image: new FormControl(null)
    });
  }

  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  addCategory() {
    this.categoryService.createCategory(this.createCategoryDto.value).subscribe(
      res => {
        console.log("success");
        this.openSnackBar("Category added successfully", "OK");
        this.createCategoryDto.reset();
        this.categoryService
          .getCategories()
          .subscribe(resCategory => (this.categories = resCategory));
      },
      error => {
        this.openSnackBar("An error has occurred", "Cancel");
        console.error(error);
      }
    );
  }

  deleteProduct(categoryId: number, productId: number) {
    const products = this.category.products;
    this.categoryService.deleteProduct(categoryId, productId).subscribe(
      res => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === productId) {
            products.splice(i, 1);
            this.openSnackBar("product has been removed successfully", "OK");
          }
        }
      },
      error => {
        this.openSnackBar("An error has occurred", "Cancel");
        console.error(error);
      }
    );
  }

  onUploadingFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedFile = file.name;
      this.createProductDto.value.image = file;
      this.productCreationFormData.append("image", file);
    }
  }

  onChangingFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.updateSelectedFile = file.name;
      this.updateProductDto.value.image = file;
      this.productUpdatingFormData.append("image", file);
    }
  }

  addProduct() {
    this.productCreationFormData.append(
      "name",
      this.createProductDto.value.name
    );
    this.productCreationFormData.append(
      "description",
      this.createProductDto.value.description
    );
    this.productCreationFormData.append(
      "price",
      this.createProductDto.value.price
    );
    this.productCreationFormData.append(
      "quantity",
      this.createProductDto.value.quantity
    );

    this.categoryService
      .addProduct(this.category.id, this.productCreationFormData)
      .subscribe(
        res => {
          this.openSnackBar(
            "product was added successfully to this category",
            "OK"
          );
          this.deleteProductFormContentData();
          this.selectedFile = null;
          this.categoryService.getCategoryById(this.category.id).subscribe(
            catRes => {
              this.category = catRes;
            },
            err => {
              console.error(err);
            }
          );
        },
        err => {
          this.openSnackBar("An error has occurred", "Cancel");
          console.error(err);
        }
      );
  }

  updateProduct(categoryId: number, productId: number, product: Product) {
    this.productUpdatingFormData.append(
      "name",
      this.updateProductDto.value.name
    );
    this.productUpdatingFormData.append(
      "description",
      this.updateProductDto.value.description
    );
    this.productUpdatingFormData.append(
      "price",
      this.updateProductDto.value.price
    );
    this.productUpdatingFormData.append(
      "quantity",
      this.updateProductDto.value.quantity
    );
    this.categoryService
      .updateProduct(categoryId, productId, this.productUpdatingFormData)
      .subscribe(
        res => {
          this.openSnackBar("product was updated successfully", "OK");
          this.deleteUpdateProductFormContentData();
          this.updateSelectedFile = null;
          this.productService.getProductById(productId).subscribe(
            resProd => {
              product = resProd;
            },
            err => {
              console.error(err);
            }
          );
        },
        err => {
          console.error(err);
        }
      );
  }

  updateCategory(id: any) {
    this.categoryService
      .updateCategory(id, this.updateCategoryDto.value)
      .subscribe(
        res => {
          this.openSnackBar("Category was updated successfully", "OK");
          this.categoryService.getCategoryById(id).subscribe(
            catRes => {
              this.category = catRes;
            },
            err => {
              console.error(err);
            }
          );
        },
        err => {
          this.openSnackBar("An error has occurred", "Cancel");
          console.error(err);
        }
      );
  }

  deleteProductFormContentData(): void {
    this.createProductDto.reset();
    this.productCreationFormData.delete("name");
    this.productCreationFormData.delete("description");
    this.productCreationFormData.delete("price");
    this.productCreationFormData.delete("quantity");
    this.productCreationFormData.delete("image");
  }

  deleteUpdateProductFormContentData(): void {
    this.updateProductDto.reset();
    this.productUpdatingFormData.delete("name");
    this.productUpdatingFormData.delete("description");
    this.productUpdatingFormData.delete("price");
    this.productUpdatingFormData.delete("quantity");
    this.productUpdatingFormData.delete("image");
  }

  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      res => {
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].id === categoryId) {
            this.categories.splice(i, 1);
            this.openSnackBar("Category has been removed successfully", "OK");
          }
        }
      },
      err => {
        this.openSnackBar("An error has occurred", "Cancel");
        console.error(err);
      }
    );
  }

}
