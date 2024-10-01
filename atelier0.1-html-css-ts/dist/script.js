var ProductManager = /** @class */ (function () {
    function ProductManager() {
        this.products = [];
        this.editIndex = null;
        this.initEventListeners();
        this.renderProducts();
    }
    ProductManager.prototype.initEventListeners = function () {
        var _this = this;
        var form = document.getElementById("productForm");
        var addProductButton = document.getElementById("addProductButton");
        var updateProductButton = document.getElementById("updateProductButton");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            _this.addOrUpdateProduct();
        });
        updateProductButton.addEventListener("click", function () {
            _this.updateProduct();
        });
    };
    ProductManager.prototype.updateProduct = function () {
        throw new Error("Method not implemented.");
    };
    ProductManager.prototype.addOrUpdateProduct = function () {
        var productNameInput = document.getElementById("productName");
        var productPriceInput = document.getElementById("productPrice");
        var productQuantityInput = document.getElementById("productQuantity");
        var productStockInput = document.getElementById("productStock");
        var product = {
            name: productNameInput.value,
            price: parseFloat(productPriceInput.value),
            quantity: parseInt(productQuantityInput.value),
            stock: productStockInput.value,
        };
        if (this.editIndex === null) {
            this.products.push(product);
        }
        else {
            this.products[this.editIndex] = product;
            this.editIndex = null;
            document.getElementById("addProductButton").style.display = "block";
            document.getElementById("updateProductButton").style.display = "none";
        }
        this.renderProducts();
        this.resetForm();
    };
    ProductManager.prototype.renderProducts = function () {
        var productTableBody = document.getElementById("productTableBody");
        productTableBody.innerHTML = "";
        this.products.forEach(function (product, index) {
            var row = "\n    <tr>\n    <td>".concat(product.name, "</td>\n   <td>").concat(product.price.toFixed(2), " \u20AC</td>\n    <td>").concat(product.quantity, "</td>\n   <td>").concat(product.stock, "</td>\n   <td>\n    <button class=\"edit\" \n   onclick=\"productManager.editProduct(").concat(index, ")\">Modifier</button>\n    <button class=\"delete\" \n   onclick=\"productManager.deleteProduct(").concat(index, ")\">Supprimer</button>\n    </td>\n    </tr>\n    ");
            productTableBody.innerHTML += row;
        });
    };
    ProductManager.prototype.editProduct = function (index) {
        var product = this.products[index];
        document.getElementById("productName").value =
            product.name;
        document.getElementById("productPrice").value =
            product.price.toString();
        document.getElementById("productQuantity").value =
            product.quantity.toString();
        document.getElementById("productStock").value =
            product.stock;
        document.getElementById("addProductButton").style.display = "none";
        document.getElementById("updateProductButton").style.display = "block";
        this.editIndex = index;
    };
    ProductManager.prototype.deleteProduct = function (index) {
        this.products.splice(index, 1);
        this.renderProducts();
    };
    ProductManager.prototype.resetForm = function () {
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
        document.getElementById("productStock").value = "";
    };
    return ProductManager;
}());
var productManager = new ProductManager();
