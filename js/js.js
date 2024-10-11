// let table = new DataTable('#tblprd', {
//     "ajax": {
//         "url": Urls,
//         "dataSrc": ''
//     },
//     "columns": [
//         { "data": "id" },
//         { "data": "category.name" },
//         { "data": "name" },
//         { "data": "quntity" },
//         { "data": "price" },
//         { "data": "descount" },
//         { "data": "total" },
//         {
//             "data": "id",
//             "render": (id) => {
//                 return `<button class="btn btn-success" onclick="EditProduct(${id})">
//                                 <i class="fa-solid fa-pen-to-square"></i>
//                             </button>
//                             <button class="btn btn-danger" onclick="DeleteProduct(${id})">
//                                 <i class="fa-solid fa-trash"></i>
//                             </button>`
//             }
//         }
//     ]
// });

let ShowTable;

$(document).ready(function () {
    ShowTable = $('#tblprd').DataTable({
        "ajax": {
            "url": Urls,
            "dataSrc": ''
        },
        "columns": [
            { "data": "id" },
            { "data": "category.name" },
            { "data": "name" },
            { "data": "quntity" },
            { "data": "price" },
            { "data": "descount" },
            { "data": "total" },
            {
                "data": "id",
                "render": (id) => {
                    return `<button class="btn btn-success" onclick="EditProduct(${id})">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-danger" onclick="DeleteProduct(${id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>`
                }
            }
        ]
    })
});

let table1 = new DataTable('#bodyctg');


PrintTable = (el) => {
    let body = document.body.innerHTML;

    let x = document.getElementById('divTable').innerHTML;

    document.body.innerHTML = x;

    print();

    document.body.innerHTML = body;
}