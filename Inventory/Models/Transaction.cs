//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inventory.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Transaction
    {
        public int id { get; set; }
        public string accountNumber { get; set; }
        public string itemCode { get; set; }
        public byte[] itemName { get; set; }
        public Nullable<decimal> itemPrice { get; set; }
        public string packUnit { get; set; }
        public string salesQty { get; set; }
        public string salesUnit { get; set; }
        public string totalSales { get; set; }
        public Nullable<decimal> ammount { get; set; }
    }
}