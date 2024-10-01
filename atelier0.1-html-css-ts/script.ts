interface Product {
  name: string;
  price: number;
  quantity: number;
  stock: string;
}
class ProductManager {
  products: Product[] = [];
  editIndex: number | null = null;
  constructor() {
    this.initEventListeners();
    this.renderProducts();
  }
  private initEventListeners(): void {
    const form = document.getElementById("productForm") as HTMLFormElement;
    const addProductButton = document.getElementById(
      "addProductButton"
    ) as HTMLButtonElement;
    const updateProductButton = document.getElementById(
      "updateProductButton"
    ) as HTMLButtonElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addOrUpdateProduct();
    });
    updateProductButton.addEventListener("click", () => {
      this.updateProduct();
    });
  }
    updateProduct() {
        throw new Error("Method not implemented.");
    }
  private addOrUpdateProduct(): void {
    const productNameInput = document.getElementById(
      "productName"
    ) as HTMLInputElement;
    const productPriceInput = document.getElementById(
      "productPrice"
    ) as HTMLInputElement;
    const productQuantityInput = document.getElementById(
      "productQuantity"
    ) as HTMLInputElement;
    const productStockInput = document.getElementById(
      "productStock"
    ) as HTMLInputElement;
    const product: Product = {
      name: productNameInput.value,
      price: parseFloat(productPriceInput.value),
      quantity: parseInt(productQuantityInput.value),
      stock: productStockInput.value,
    };
    if (this.editIndex === null) {
      this.products.push(product);
    } else {
      this.products[this.editIndex] = product;
      this.editIndex = null;
      document.getElementById("addProductButton")!.style.display = "block";
      document.getElementById("updateProductButton")!.style.display = "none";
    }
    this.renderProducts();
    this.resetForm();
  }
  private renderProducts(): void {
    const productTableBody = document.getElementById(
      "productTableBody"
    ) as HTMLElement;
    productTableBody.innerHTML = "";
    this.products.forEach((product, index) => {
      const row = `
    <tr>
    <td>${product.name}</td>
   <td>${product.price.toFixed(2)} €</td>
    <td>${product.quantity}</td>
   <td>${product.stock}</td>
   <td>
    <button class="edit" 
   onclick="productManager.editProduct(${index})">Modifier</button>
    <button class="delete" 
   onclick="productManager.deleteProduct(${index})">Supprimer</button>
    </td>
    </tr>
    `;
      productTableBody.innerHTML += row;
    });
  }
  public editProduct(index: number): void {
    const product = this.products[index];
    (document.getElementById("productName") as HTMLInputElement).value =
      product.name;
    (document.getElementById("productPrice") as HTMLInputElement).value =
      product.price.toString();
    (document.getElementById("productQuantity") as HTMLInputElement).value =
      product.quantity.toString();
    (document.getElementById("productStock") as HTMLInputElement).value =
      product.stock;
    document.getElementById("addProductButton")!.style.display = "none";
    document.getElementById("updateProductButton")!.style.display = "block";
    this.editIndex = index;
  }
  public deleteProduct(index: number): void {
    this.products.splice(index, 1);
    this.renderProducts();
  }
  private resetForm(): void {
    (document.getElementById("productName") as HTMLInputElement).value = "";
    (document.getElementById("productPrice") as HTMLInputElement).value = "";
    (document.getElementById("productQuantity") as HTMLInputElement).value = "";
    (document.getElementById("productStock") as HTMLInputElement).value = "";
  }
}
const productManager = new ProductManager();
