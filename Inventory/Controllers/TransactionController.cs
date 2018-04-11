using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventory.Controllers
{
    public class TransactionController : Controller
    {
        // GET: Transaction
        public ActionResult Index() => View();
        public ActionResult AccountTransaction => View();
        
    }
}