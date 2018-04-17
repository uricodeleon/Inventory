$(document).ready(function () {
  
    PopulateCategoryToTransaction();
    FilterEvent();
    FilterEventItemDetails();
    //TransactionDetails();
});

/**
 * Adding Transaction per Accounts
 * 
 */
function AccountTransaction() {
   
    var quantityField = $('#quantityField').val();
    var packUnitField = $('#packUnitField').val();
    var salesQuantity = $('#salesQuantityField').val();
    var totalSalesField = $('#totalSalesField').val();
    var salesUnitField = $('#salesUnitField').val();
    var itemNameField = $('#itemNameField').val();
    var itemNumberField = $('#itemNumberField').val();
    var itemFieldPRice = $('#itemFieldPrice').val();
      
    var packQty = parseFloat(quantityField);
    var salesQty = parseFloat(salesQuantity);
    var itemPrice = parseFloat(itemFieldPRice);

    var totalSales = (packQty * salesQty).toString();
    var totalAmount = totalSales * itemPrice;

    var Transaction = {
        accountNumber: m_accountNumber,
        itemQuantity: quantityField,
        itemCode: itemNumberField,
        itemName: itemNameField,
        itemPrice: itemPrice,
        packunit: packUnitField,
        salesQty: salesQuantity,
        salesUnit: salesUnitField,
        totalSales: totalSales,
        ammount: totalAmount

    };

    $.ajax({
        url: "/Transaction/AddTransaction",
        data: $.param(Transaction, true),
        type: "POST",
        success: function (res) {
            alert(res);
            TransactionDetails(m_accountNumber);
        },
        error: function (res) {
            alert(res);
            console.log(res);
        }
    });
   
}

function TransactionDetails(accountNumber) {
   
    $(document).ready(function () {
        $('#transactionDetailsDatatable').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();
        });
        $('#transactionDetailsDatatable').DataTable({
            "lengthMenu": [5, 20, 50, 75, 100],
            stateSave: true,
            "bDestroy": true,
            "ajax": {
                "url": "/Transaction/TransactionDocument",
                "type": "GET",
                "datatype": "json",
                "data": { "accountNumber": accountNumber }
            },
            "columns": [

             
                { "mData": "accountNumber"},
                { "mData": "itemName" },
                { "mData": "itemCode" },
                { "mData": "itemQuantity" },
                { "mData": "itemPrice" },
                { "mData": "packUnit" },
                { "mData": "salesQty" },
                { "mData": "salesUnit" },
                { "mData": "totalSales" },
                { "mData": "ammount" },

                {
                    "mData": "id", "render": function (row, type, val, meta) {

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

/**
 * Populae category
 */
function PopulateCategoryToTransaction() {

    $.ajax({
        type: "GET",
        url: "/Transaction/ListOfCategories",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (data) {
            var $select = $('#categoryTransactionSelect');
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

/**
 * Filter Inventory item
 * Using their own category
 */
function FilterMultipleSelectItem(categoryName) {

    var params = { categoryName: categoryName };
    $.ajax({
        type: "GET",
        url: "/Transaction/FilterItemByCategory",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        data: {
            "category": categoryName
        },
        success: function (data) {
            var $select = $('#inventoryItemSelect');
            $select.empty();
            $.each(data, function (key, value) {
                for (var i = 0; i < value.length; i++) {
                    $select.append('<option value=' + value[i] + '>' + value[i] + '</option>');
                }
            });
        }
    });
}

/**
 * Filtering listbox
 * event will trigger when 
 * value is change in category select item.
 */
function FilterEvent() {
    $('#categoryTransactionSelect').change(function () {
        FilterMultipleSelectItem(this.value);
    });
}


/**
 * Filter Item Details
 * Event will trigger when
 * User select value in multiple list box
 * Details will be display in Item Name,
 * Item Number, Item Price Fields
 */
function FilterEventItemDetails() {

    var itemNameHolder = "";
    $('#inventoryItemSelect').change(function () {
        itemNameHolder = $("#inventoryItemSelect option:selected").text();
        var $multipleSelect = $('#GetItemDetails');
        $.ajax({
            type: "GET",
            url: "/Transaction/GetItemDetails",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: {
                "itemName": itemNameHolder
            },
            success: function (data) {

                $.each(data, function (key, value) {
                    //alert(itemNameHolder);
                    //console.log(value);
                    $('#itemNameField').val(value.itemName);
                    $('#itemNumberField').val(value.itemCode);
                    $('#itemFieldPrice').val(value.itemPrice);
                });
            }
        });
    });
}