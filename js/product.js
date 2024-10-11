//Declaration

let ddlcategorys = document.getElementById("ddlcategory");
let lbPro = document.getElementById("lbPro");
let lbQnt = document.getElementById("lbQnt");
let lbPrice = document.getElementById("lbPrice");
let lbDesc = document.getElementById("lbDesc");
let product = document.getElementById("product");
let quntity = document.getElementById("quntity");
let price = document.getElementById("price");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let btnSave = document.getElementById("btnSave");
let btnRestProduct = document.getElementById("btnRestProduct");
let bodyPrd = document.getElementById("bodyPrd");
let countPrd = document.getElementById("countPrd");

// let Urls = 'http://localhost/api/Products';
// let Urls = 'http://192.168.56.1/api/Products';
let Urls = 'https://localhost:7231/api/Products';

let btnStatus = 'Create';
let ids;

//GetTotal

GetTotal = () => {
    
    if (price.value != 0) {

        let getTotal = (quntity.value * price.value) - descount.value;
        total.value = getTotal;
        total.className.replace = "form-control bg-danger text-center";
        total.className = "form-control bg-success text-center";

    } else {
        total.value = 0;
        total.className.replace = "form-control bg-success text-center";
        total.className = "form-control bg-danger text-center";
    }
};

//Save

SaveProduct = () => {

    let objProduct = {
        categoryId: ddlcategorys.value,
        name: product.value,
        quntity: quntity.value,
        price: price.value,
        descount: descount.value,
        total: total.value
    };

    let data = JSON.stringify(objProduct);

    if (ValidationProduct() == false)
        return;

    if (btnStatus == 'Create') {
        Helper.AjaxCallPost(Urls, data, (data) => {

        if (data != null) {
            toastr.success('Save the New Product' + " " + data.name, 'Successfuly');
            RestProduct();
            //ShowTable();
            ShowTable.ajax.reload();
            CountProduct();
        } else {
            toastr.error(`Not Save the Product ${data.name}`, 'Error');
        }
        });

    } else {
        Helper.AjaxCallPut(`${Urls}/${ids}`, data, (data) => {

        if (data != null) {
            toastr.warning('Update the New Product' + " " + data.name, 'Successfuly');
            RestProduct();
            // ShowTable();
            ShowTable.ajax.reload();
            CountProduct();
            btnSave.className.replace = "btn btn-info w-25";
            btnSave.className = "btn btn-success w-25";
            btnStatus = 'Create';
        } else {
            toastr.error(`Not Update the Product ${data.name}`, 'Error');
        }
        });
    }
};

//Rest

RestProduct = () => {
    ddlcategorys.value = '';
    product.value = '';
    quntity.value = 0;
    price.value = 0;
    descount.value = 0;
    total.value = 0;

    total.className.replace = "form-control bg-success text-center";
    total.className = "form-control bg-danger text-center";
}

//Show Table

ShowTable = () => {
    // let table = '';

    // Helper.AjaxCallGet(Urls, (data) => {
    //     data.forEach(element => {
    //         table +=
    //             `<tr>
    //                     <td>${element.id}</td>
    //                     <td>${element.category.name}</td>
    //                     <td>${element.name}</td>
    //                     <td>${element.price}</td>
    //                     <td>${element.quntity}</td>
    //                     <td>${element.descount}</td>
    //                     <td>${element.total}</td>
    //                     <td>
    //                         <button class="btn btn-success" onclick="EditProduct(${element.id})">
    //                             <i class="fa-solid fa-pen-to-square"></i>
    //                         </button>
    //                         <button class="btn btn-danger" onclick="DeleteProduct(${element.id})">
    //                             <i class="fa-solid fa-trash"></i>
    //                         </button>
    //                     </td>
    //                 </tr>`
    //     });
    //     bodyPrd.innerHTML = table;
    // });
    
};

//Count

CountProduct = () => {

    Helper.AjaxCallGet(Urls, (data) => {
        if (data != null) {
            countPrd.innerHTML = `Total Product (${data.length})`;
        }
    })
}

//Edit Product

//Delete Product

DeleteProduct = (id) => {

    if (confirm('Are you sure from Deleted', true)) {

        Helper.AjaxCallDelete(`${Urls}/${id}`, (data) => {
            if (data != null) {
                //ShowTable();
                ShowTable.ajax.reload();
                CountProduct();
                toastr.error('Delete the product is name ' + data.name, 'SuccessFully');
            }
        });
    }
};

EditProduct = (id) => {

    Helper.AjaxCallGet(`${Urls}/${id}`, (data) => {

        if (data != null) {
            ddlcategorys.value = data.categoryId;
            product.value = data.name;
            quntity.value = data.quntity;
            price.value = data.price;
            descount.value = data.descount;
            total.value = data.total;

            btnSave.className.replace = "btn btn-success w-25";
            btnSave.className = "btn btn-info w-25";

            btnStatus = 'Update';
            ids = id;
        }
    });
}

ValidationProduct = () => {
    let isValid = true;

    if (ddlcategorys.value == '') {
        lbcate.innerHTML = 'Category : * [Required]';
        lbcate.style.color = 'red';
        isValid = false;
    } else {
        lbcate.innerHTML = 'Category :';
        lbcate.style.color = 'white';
        isValid = true;
    }

    if (product.value == '') {
        lbPro.innerHTML = 'Product Name : * [Required]';
        lbPro.style.color = 'red';
        isValid = false;
    } else if (!isNaN(product.value)) {
        lbPro.innerHTML = 'Not a Number : * [Required]';
        lbPro.style.color = 'red';
        isValid = false;
    } else {
        lbPro.innerHTML = 'Product Name : *';
        lbPro.style.color = 'white';
        isValid = true;
    }

    if (quntity.value == '' || quntity.value == 0) {
        lbQnt.innerHTML = 'Quntity : * [Required]';
        lbQnt.style.color = 'red';
        isValid = false;
    } else {
        lbQnt.innerHTML = 'Quntity : *';
        lbQnt.style.color = 'white';
        isValid = true;
    }

    if (price.value == '' || price.value == 0) {
        lbPrice.innerHTML = 'Price : * [Required]';
        lbPrice.style.color = 'red';
        isValid = false;
    } else {
        lbPrice.innerHTML = 'Price : *';
        lbPrice.style.color = 'white';
        isValid = true;
    }

    if (descount.value == '') {
        lbDesc.innerHTML = 'Descount : * [Required]';
        lbDesc.style.color = 'red';
        isValid = false;
    } else {
        lbDesc.innerHTML = 'Descount : *';
        lbDesc.style.color = 'white';
        isValid = true;
    }

    return isValid;
}

//Print

//Event Run Time

price.addEventListener('keyup', GetTotal);
quntity.addEventListener('keyup', GetTotal);
descount.addEventListener('keyup', GetTotal);

price.addEventListener('change', GetTotal);
quntity.addEventListener('change', GetTotal);
descount.addEventListener('change', GetTotal);

btnSave.addEventListener('click', SaveProduct);

btnRestProduct.addEventListener('click', RestProduct);

//ShowTable();
//CountProduct();

$(document).ready(() => {
    ShowTable();
    CountProduct();
});