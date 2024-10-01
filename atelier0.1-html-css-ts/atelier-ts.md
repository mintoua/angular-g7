# Installation et Exécution de TypeScript sur Windows

## Prérequis

Avant de commencer, assurez-vous d'avoir Node.js installé sur votre machine. Vous pouvez le télécharger et l'installer depuis [nodejs.org](https://nodejs.org/).

## Étapes d'installation

1. **Vérifiez l'installation de Node.js**

   Ouvrez une invite de commande (cmd) ou un terminal PowerShell et exécutez la commande suivante pour vérifier si Node.js est installé :
   ```sh
   node -v
   ```
2. **Installer Typescript en utilisant npm**

   Ouvrez une invite de commande (cmd) ou terminal de votre IDE et exécutez la commande suivante pour :

   ```sh
   npm install -g typescript
   ```

    Vérifier l'installation
   ```sh
   tsc --version
   ```

3. **Manipulation Typescript**
   ### index.html
   ```html
   <!DOCTYPE html>
      <html lang="fr">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Gestion de Produits en TypeScript</title>
      <link rel="stylesheet" href="styles.css" />
   </head>
   <body>
      <h1>Gestion des Produits</h1>
      <!-- Formulaire d'ajout/modification de produit -->
      <div class="form-container">
         <form id="productForm">
         <label for="productName">Nom du produit :</label>
         <input
            type="text"
            id="productName"
            placeholder="Nom du produit"
            required
         />
         <label for="productPrice">Prix :</label>
         <input
            type="number"
            id="productPrice"
            placeholder="Prix du produit"
            required
         />
         <label for="productQuantity">Quantité :</label>
         <input
            type="number"
            id="productQuantity"
            placeholder="Quantité"
            required
         />
         <label for="productStock">Stock :</label>
         <input
            type="text"
            id="productStock"
            placeholder="En stock (Oui/Non)"
            required
         />
         <button type="submit" id="addProductButton">Ajouter le produit</button>
         <button type="button" id="updateProductButton" style="display: none">
            Modifier le produit
         </button>
         </form>
      </div>
      <!-- Tableau pour afficher les produits -->
      <div class="table-container">
         <table id="productTable">
         <thead>
            <tr>
               <th>Nom</th>
               <th>Prix</th>
               <th>Quantité</th>
               <th>Stock</th>
               <th>Actions</th>
            </tr>
         </thead>
         <tbody id="productTableBody">
            <!-- Les produits ajoutés apparaîtront ici -->
         </tbody>
         </table>
      </div>
      <script src="dist/script.js"></script>
   </body>
   </html>
   ```

   ### styles.css
   ```css 
   body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
   }

   h1 {
    text-align: center;
   }

   .form-container, .table-container {
    margin: 20px auto;
    max-width: 600px;
    padding: 10px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
   }

   form {
      display: flex;
      flex-direction: column;
   }

   label, input, button {
      margin-bottom: 10px;
   }

   input[type="text"], input[type="number"] {
      padding: 8px;
      font-size: 14px;
   }

   button {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
      background-color: #5cb85c;
      color: white;
      border: none;
      border-radius: 5px;
   }

   button:hover {
      background-color: #4cae4c;
   }

   table {
      width: 100%;
      border-collapse: collapse;
   }

   table, th, td {
      border: 1px solid #ddd;
   }

   th, td {
      padding: 12px;
      text-align: center;
   }

   button.delete, button.edit {
      background-color: #d9534f;
      margin-left: 5px;
   }

   button.edit {
      background-color: #0275d8;
   }

   button.edit:hover {
      background-color: #025aa5;
   }

   button.delete:hover {
      background-color: #c9302c;
   }
   ```
   ### script.ts
   ```ts
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
   ```
   Ouvrez le terminal ou invite de commande:
   ```sh
    touch main.ts // ou créer un fichier main.ts manuellement dans le dossier ts-basics
    tsc --init //Cette commande génère un fichier tsconfig.json avec des options de configuration minimales, similaires à celles ci-dessous.
   ```
   Remplacer pqr ceci
   ```js
   {
      "compilerOptions": {
      "module": "commonjs",
      "target": "es5",
      "noImplicitAny": false,
      "sourceMap": false,
      "pretty": true
   },
   "exclude": [
         "node_modules"
    ]
   }
   ```

   Commande pour compilation du fichier ts
   ```shell
    tsc script.ts
   ```

   Un fichier script.js sera créé et vous allez créer un dossier dist pour mettre ça dedans.