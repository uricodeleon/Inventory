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
       
        
        public string AddItem(Models.Inventory inventory)
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
                return "Error While Inserting...";
            }

        }
        public JsonResult GetAllItem()
        {
            using (ELFILOEntities _entities = new ELFILOEntities())
            {
                List<Models.Inventory> _cusomter = _entities.Inventory.ToList();
                return Json(_cusomter, JsonRequestBehavior.AllowGet);
            }
        }

    }
}