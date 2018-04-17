$(document).ready(function () {
    GetListOfCategory();
    PopoulateCategoryList();
    ListOfItemInventoryTable();
    PopulateItemMeasurement();
});



function AddItemInventory() {

    var itemCategory = $('#categorySelect').val();
    var itemName = $('#itemName').val();
    var itemCode = $('#itemCode').val();
    var itemQuantity = $('#itemQuantity').val();
    var itemPrice = $('#itemPrice').val();
    var itemSupplier = $('#itemSupplier').val();
    var itemMeasurement = $('#itemMeasurementSelect').val();

    var Inventory = {
        itemCategory: itemCategory,
        itemMeasurement: itemMeasurement,
        itemName: itemName,
        itemCode: itemCode,
        itemQuantity: itemQuantity,
        itemPrice: itemPrice,
        itemSupplier: itemSupplier
    };

    $.ajax({
        url: "/Inventory/AddIventoryItem",
        data: $.param(Inventory, true),
        type: "POST",
        success: function (res) {
            alert(res);
            ClearAddInventoryFields();
            ListOfItemInventoryTable();
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }     
    });

}


/**
 * Display All List Of Items
 * To Inventory DataTable
 */
function ListOfItemInventoryTable() {
    $(document).ready(function () {
        $('#inventoryDataTable').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();
        });
        $('#inventoryDataTable').DataTable({          
            stateSave: true,
            "bDestroy": true,
            "responsive": true,
            "ajax": {
                "url": "/Inventory/GetAllItem",
                "type": "GET",
                "datatype": "json"
            },
            "columns": [
               
                { "mData": "id" },
                { "mData": "itemCategory" },
                { "mData": "itemMeasurement" },
                { "mData": "itemName" },
                { "mData": "itemCode" },
                { "mData": "itemQuantity" },
                { "mData": "itemPrice" },
                { "mData": "itemSupplier" },
                { "mData": "date_added" },
            
                {
                    "mData": "date_added", "render": function (row, type, val, meta) {

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

function ClearAddInventoryFields() {
    $('#categorySelect').val('');
    $('#itemName').val('');
    $('#itemCode').val('');
    $('#itemQuantity').val('');
    $('#itemPrice').val('');
    $('#itemSupplier').val('');
    $('#itemMeasurementSelect').val('');
}


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
                    "mData": "itemCategory", "render": function (row, type, val, meta) {

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


/*populate list of category to dropdown*/
function PopoulateCategoryList() {

    $.ajax({
        type: "GET",
        url: "/Inventory/GetCategoryToSelect",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            var $select = $('#categorySelect');    
            var listofCategory = '';

            $select.empty();        
            $select.append($('<option>').text("Select Item Category"));
            $.each(data, function (key, value) {            
                for (var i = 0; i < value.length; i++) {          
                    $select.append('<option value=' + value[i] + '>' + value[i] + '</option>');        
                }              
            });    

        }
    });
}

function PopulateItemMeasurement() {

    $.ajax({
        type: "GET",
        url: "/Inventory/GetListOfMeasurement",
        contentType: "application/json;charset=UTF-8",
        datatype: "json",
        success: function (data) {
            var $select = $('#itemMeasurementSelect');

            $select.append($('<option>').text("Select Item Measurement"));
            $.each(data, function (key, value) {
                for (var i = 0; i < value.length; i++) {
                    $select.append('<option value= ' + value[i].itemMeasurement + '>' + value[i].itemMeasurement + '</option>');
                }
            });
        }
    });
}