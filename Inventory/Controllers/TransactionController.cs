using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventory.Models;

namespace Inventory.Controllers
{
    public class TransactionController : Controller
    {
        // GET: Transaction
        public ActionResult Index() => View();
        public ActionResult AccountTransaction => View();
        

        /// <summary>
        /// Account Transactions
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public string AddTransaction(Transaction transaction)
        {
            string _result = string.Empty;
            if(transaction != null)
            {
                using (ELFILOEntities _entities = new ELFILOEntities())
                {
                    _entities.Transaction.Add(transaction);
                    _entities.SaveChanges();
                    _result = "Successfully Added";
                }
            }else
            {
                _result = "Error Occured while adding";
            }
            return _result;
        }

        /// <summary>
        /// Get All Transaction Details
        /// per account number
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <returns></returns>
        public JsonResult TransactionDocument(string accountNumber)
        {
            using (ELFILOEntities _entities = new ELFILOEntities())
            {
                var _result = _entities.Transaction.Where(x => x.accountNumber == accountNumber).ToList();
                return Json(new { data = _result }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Get List of Categories
        /// </summary>
        /// <returns></returns>
        public JsonResult ListOfCategories()
        {
            using (ELFILOEntities _entities = new ELFILOEntities())
            {
                var _result = _entities.Category.Select(x => x.itemCategory).ToList();
                return Json(new { data = _result }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Filter Inventory Items
        /// By Category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        public JsonResult FilterItemByCategory(string category)
        {
            using(ELFILOEntities _entities = new ELFILOEntities())
            {
                List<string> inventory = new List<string>();
                var _result = _entities.Inventory.Where(x => x.itemCategory == category).Select(x => x.itemName).ToList();
                if(_result != null)
                {
                    inventory = _result;                  
                }
                return Json(new { data = inventory }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Get Item Details
        /// </summary>
        /// <param name="itemName"></param>
        /// <returns></returns>
        public JsonResult GetItemDetails(string itemName)
        {
            using(ELFILOEntities _entites = new ELFILOEntities())
            {
                Models.Inventory inventoryDetails = new Models.Inventory();
                var _result = _entites.Inventory.Where(x => x.itemName == itemName).FirstOrDefault();

                if (_result != null)
                {
                    inventoryDetails = _result;
                }
                return Json(new { data = inventoryDetails }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}