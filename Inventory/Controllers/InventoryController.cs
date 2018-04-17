using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventory.Models;

namespace Inventory.Controllers
{
    public class InventoryController : Controller
    {
        // GET: Inventory
        public ActionResult Index() => View();
        public ActionResult AddItemInventor() => View();
        public ActionResult ViewInventory() => View();

        /// <summary>
        /// Add Item in Inventory
        /// </summary>
        /// <param name="inventory"></param>
        /// <returns></returns>
        public string AddIventoryItem(Models.Inventory inventory)
        {
            //check if its not null
            if (inventory != null)
            {
                using (ELFILOEntities _entiies = new ELFILOEntities())
                {
                    //add the passed object.
                    _entiies.Inventory.Add(inventory);
                    _entiies.SaveChanges();
                    return "Customer Successfully Added";
                }
            }
            else
            {
                return "Error While Inserting";
            }
        }

        /// <summary>
        /// Get All List of Items
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllItem()
        {
            using (ELFILOEntities _entities = new ELFILOEntities())
            {
                List<Models.Inventory> _cusomter = _entities.Inventory.ToList();
                return Json(new { data = _cusomter }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Add New Cagories
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        public string AddItemCategory(Category category)
        {
            if (category != null)
            {
                using (ELFILOEntities _entities = new ELFILOEntities())
                {
                    _entities.Category.Add(category);
                    _entities.SaveChanges();
                    return "Item Category Successfully Added";
                }
            }
            else
            {
                return "Error while Inserting";
            }           
        }

      /// <summary>
      /// Get All List of Category
      /// </summary>
      /// <returns></returns>
        public JsonResult GetAllCategoryList()
        {
            using(ELFILOEntities _entites = new ELFILOEntities())
            {
                List<Category> categories = _entites.Category.ToList();
                return Json( new { data = categories}, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Get all the list of category
        /// pop
        /// </summary>
        /// <returns></returns>
        public JsonResult GetCategoryToSelect()
        {
            using (ELFILOEntities _entities  = new ELFILOEntities())
            {
                var categories = _entities.Category.Select(x => x.itemCategory).ToList();
                return Json(new { data = categories }, JsonRequestBehavior.AllowGet); 
            }
        }
        
        /// <summary>
        /// Get All List of Measurement
        /// </summary>
        /// <returns></returns>
        public JsonResult GetListOfMeasurement()
        {
            using (ELFILOEntities _entities = new ELFILOEntities())
            {
                var measurement = _entities.Measurement.ToList();
                return Json(new { data = measurement }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}