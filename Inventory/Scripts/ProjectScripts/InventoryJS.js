$(document).ready(function () {
    GetListOfCategory();
    PopoulateCategoryList();
});


//add new cateogry item
function AddItemCategory() {

    var itemCategory = $('#itmCategoryField').val();
    var Category = {
        itemCategory : itemCategory
    };
    $.ajax({
        url: "/Inventory/AddItemCategory",
        data: $.param(Category, true),
        type: "POST",
        success: function (res) {
            alert(res);
            $('#itmCategoryField').val('');
            GetListOfCategory();
        }
    });
}

//get the list and display to datatable
function GetListOfCategory() {
    $(document).ready(function () {
        $('#categorytable').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();
        });
        $('#categorytable').DataTable({
            stateSave: true,
            "bDestroy": true,
            "responsive": true,
            "ajax": {
                "url": "/Inventory/GetAllCategoryList",
                "type": "GET",
                "datatype": "json"
            },
                "columns": [              
                { "mData": "id" },
                { "mData": "itemCategory" },            
                {
                    "mData": "itemCatoory", "render": function (row, type, val, meta) {

                        return "<a button type='button' class='btn btn-info btn-xs' onclick=''> <i class='fa fa-pencil'></i> Edit</a>" +
                            "<a button type='button' class='btn btn-danger btn-xs' onclick=''> <i class='fa fa - trash - o'></i> Delete </a>";
                    },
                    "orderable": false,
                    "width": "150px"

                }
            ]

        });
    });
}

function PopoulateCategoryList() {
    $.ajax({
        type: "GET",
        url: "/Inventory/GetCategoryToSelect",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, value) {
                alert(value);
                $('#categorySelect').append(value)
            });

        }
    })

}