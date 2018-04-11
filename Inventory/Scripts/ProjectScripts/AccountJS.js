
$(document).ready(function () {
    GetAllAccounts(); 
    ClickableRow();
});

function AddCustomerAccount() {
    var customerType = $("input[name='iCheck']:checked").val();
    var accountCode = $('#accountCode').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var address = $('#address').val();
    var terms = $('#terms').val();
    var contactNumber = $('#contactNumber').val();


    var Customer = {
            customerType: customerType,
            accountCode: accountCode,
            firstName: firstName,
            lastName: lastName,
            address: address,
            terms: terms,
            contactNumber: contactNumber
        };
        $.ajax({
            url: "/Account/AddCustomer",
            data: $.param(Customer,true),
            type: "POST",
            success: function (result) {
                alert("Successfully Added!");
                GetAllAccounts();
            },
            error: function (errormessage) {
                alert(errormessage);
            }
        });
}

/*delete*/
function DeleteAccount(accountNumber) {

    var params = {
        accountNumber: accountNumber
    };
    var confirmation = confirm("Are you sure you want to delete this Account?");
    if (confirmation) {
        $.ajax({
            url: "/Account/DeleteCustomer",
            type: "POST",
            data: $.param(params, true),
            success: function (result) {
                alert("Sucessfully Deleted");
                GetAllAccounts();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

}

function UpdateCustomerAccount() {

    var accountNumber = $('#accountHolder').val();
    var customerType = $("input[name='iCheck']:checked").val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var address = $('#address').val();
    var terms = $('#terms').val();
    var contactNumber = $('#contactNumber').val();

    var Customer = {

        accountNumber: accountNumber,
        customerType: customerType,
        firstName: firstName,
        lastName: lastName,
        address: address,
        terms: terms,
        contactNumber: contactNumber
    };

    $.ajax({
        url: "/Account/UpdateCustomerAccount",
        type: "POST",
        data: $.param(Customer,true),    
        success: function (res) {
            alert(res);
            GetAllAccounts();
            $('#editModal').modal('hide');
            $("input:radio").attr("checked", false);
            $('#firstName').val("");
            $('#lastName').val("");
            $('#address').val("");
            $('#terms').val("");
            $('#contactNumber').val("");
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });

}


//get single account
function GetSingleCustomerAccount(accountNumber) {
    var params = {
        accountNumber: accountNumber
    };
  
    $.ajax({
        url: "/Account/GetSingleCustomerAccount",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        data: { "accountNumber": accountNumber },
        success: function (data) {
            ////var obj = JSON.stringify(data);
            if (data.customerType === "Customer/Walk-In") {
                $(':radio[name=iCheck][value=Customer/Walk-In]').iCheck('check');
            } else if (data.customerType === "Contractual") {
                $(':radio[name=iCheck][value=Contractual]').iCheck('check');
            } else if (data.customerType === "Dealer") {
                $(':radio[name=iCheck][value=Dealer]').iCheck('check');
            }

            $('#accountHolder').val(data.accountNumber); //use for update
            $('#firstName').val(data.firstName);
            $('#lastName').val(data.lastName);
            $('#address').val(data.address);
            $('#terms').val(data.terms);
            $('#contactNumber').val(data.contactNumber);
            $('#editModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage);
        }
    });

}

//clickable row
function ClickableRow() {
    $(document).ready(function () {
        var table = $('#datatable').DataTable();
        $('#datatable tbody').on('click', 'tr td:eq(0)', function () {
            var data = table.row(this).data();
            $('#transaction').modal('show');
        });

    });
}

//get all account records and dispaly to datatables.
function GetAllAccounts() {
            
            $(document).ready(function () {
            $('#datatable').on('click', 'a.editor_edit', function (e) {
                e.preventDefault();
            });
            //fetch all data. and use datatable constructor to have dyanmic tables.
             $('#datatable').DataTable({
                stateSave: true,
                "bDestroy": true,
                "responsive": true,
                "ajax": {
                    "url": "/Account/GetAllCustomer",
                    "type": "GET",
                    "datatype": "json" 
                },
                "columns": [              
                    { "mData": "accountNumber"},
                    { "mData": "accountCode"   },
                    { "mData": "customerType"  },
                    { "mData": "terms" },
                    { "mData": "firstName" },
                    { "mData": "address" },
                    { "mData": "contactNumber" },
                    { "mData": "date_added" },
                    {
                        "mData": "accountNumber", "render": function (row, type, val, meta) { 

                            return "<a button type='button' class='btn btn-info btn-xs' onclick='return GetSingleCustomerAccount(\"" + val.accountNumber + "\")'> <i class='fa fa-pencil'></i> Edit</a>" +
                                "<a button type='button' class='btn btn-danger btn-xs' onclick='return DeleteAccount(\"" + val.accountNumber + "\")'> <i class='fa fa - trash - o'></i> Delete </a>"; 
                        },
                        "orderable": false,
                        "width": "150px"
                        
                    }                   
                ]
            });
        });
}

function Test(test) {

    alert(test);
}



