//Declaration

let ddlcategory = document.getElementById("ddlcategory");
let category = document.getElementById("category");
let saveCategory = document.getElementById("saveCategory");
let bodyctg = document.getElementById("bodyctg");
let countCategory = document.getElementById("countCategory");

// let Url = 'http://localhost/api/Categories';
// let Url = 'http://192.168.56.1/api/Categories';
let Url = 'https://localhost:7231/api/Categories';

//Save Category

Savecategory = () => {

    let objCategory = {

        name: category.value
    };

    if (Validation() == false)
        return;

    let data = JSON.stringify(objCategory);

    $.ajax({
        url: `${Url}`,
        method: 'POST',
        contentType: 'application/json',
        data: data,
        cache: false,
        success: function (data) {
            Restcategory();
            ShowCategory();
            ShowTableCategory();

            // alert("Success");
            toastr.success('Solved new row category', 'SuccessFully')
            countCategory();

        }, error: function (err) {
            alert(err)
        }

    });
};

// Rest Category

Restcategory = () => {
    category.value = '';
};

//Show DDL Category

ShowCategory = () => {

    let item = '';

    item += `<option value="">Select Category ......</option>`;

    $.ajax({
        url: `${Url}`,
        method: 'GET',
        cache: false,
        success: function (data) {

            for (let x in data) {
                item += `<option value="${data[x].id}">
                </option>`
            }

            ddlcategory.innerHTML = item;
        }
    });
};

//Show Table Category

ShowTableCategory = () => {
    let table = '';

    $.ajax({
        url: `${Url}`,
        method: 'GET',
        cache: false,
        success: function (data) {
            data.forEach(function (item) {
                table +=
                    `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>
                            <button class="btn btn-danger" onclick="DeleteCategory(${item.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>`
            });

            bodyctg.innerHTML = table;
        }
    })

};

//Delete Category

DeleteCategory = (id) => {

    if (confirm('Are you sure from deleted', true)) {
        $.ajax({
            url: `${Url}/${id}`,
            method: 'DELETE',
            cache: false,
            success: function (data) {
                ShowTableCategory();
                ShowCategory();
                
                toastr.error('Deleted row category', 'SuccessFully')
                // countCategory();
            }

        });
    }
};

//Count Category Table

CountCategory = () => {

    $.ajax({
        url: `${Url}`,
        method: 'GET',
        cache: false,
        success: function (data) {
            countCategory.innerHTML = `Total Category (${data.length})`;
        }
    });
};

//Validation Category Name

Validation = () => {
    let isValid = true;

    if (category.value == '' || category.value == null) {
        toastr.warning('Enter Name Category', 'Error Validation');
        isValid = false;
    }

    return isValid;
}

saveCategory.addEventListener('click', Savecategory);
ShowCategory();
ShowTableCategory();
CountCategory();