let products = [];
let editIndex = null;

// Ajout de produit
document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let productQuantity = document.getElementById('productQuantity').value;
    let productStock = document.getElementById('productStock').value;

    // Vérifier si on est en mode ajout ou modification
    if (editIndex === null) {
        // Ajouter un produit
        let newProduct = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity),
            stock: productStock
        };
        products.push(newProduct);
    } else {
        // Modifier un produit existant
        products[editIndex] = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity),
            stock: productStock
        };
        document.getElementById('addProductButton').style.display = 'block';
        document.getElementById('updateProductButton').style.display = 'none';
        editIndex = null;
    }

    afficherProduits();
    resetForm();
});

// Affichage des produits
function afficherProduits() {
    let productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';

    products.forEach(function (product, index) {
        let row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)} FCFA</td>
                <td>${product.quantity}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="edit" onclick="editProduct(${index})">Modifier</button>
                    <button class="delete" onclick="deleteProduct(${index})">Supprimer</button>
                </td>
            </tr>
        `;
        productTableBody.innerHTML += row;
    });
}

// Modifier un produit
function editProduct(index) {
    let product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productStock').value = product.stock;

    document.getElementById('addProductButton').style.display = 'none';
    document.getElementById('updateProductButton').style.display = 'block';

    editIndex = index;
}

// Supprimer un produit
function deleteProduct(index) {
    products.splice(index, 1);
    afficherProduits();
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('productStock').value = '';
}
