using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventory.Models;
namespace Inventory.Controllers
{
  
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index() => View();
        public ActionResult Customer() => View();
        public ActionResult ViewCustomer() => View();


        /// <summary>
        /// Create/Add New Customer
        /// </summary>
        /// <param name="_customer"></param>
        /// <returns></returns>
        public string AddCustomer(Customer _customer)
        {
            //check if its not null
            if(_customer != null)
            {
                using (ELFILOEntities _entiies = new ELFILOEntities())
                {
                    //add the passed object.
                    Customer customer = new Customer();
                
                    customer.accountCode = _customer.accountCode;
                    customer.accountNumber = _entiies.Database.SqlQuery<string>("EXEC GenerateCCAnumbers").FirstOrDefault();
                    customer.customerType = _customer.customerType;
                    customer.terms = _customer.terms;
                    customer.firstName = _customer.firstName;
                    customer.lastName = _customer.lastName;
                    customer.address = _customer.address;
                    customer.contactNumber = _customer.contactNumber;
                    customer.date_added = DateTime.Today;

                    if (customer != null)
                        _entiies.Customer.Add(customer);
                    
                    _entiies.SaveChanges(); //save data
                    return "Customer Successfully Added";
                }
            }else
            {
                return "Error While Inserting...";
            }
        
        }

        public string UpdateCustomerAccount(Customer _customer)
        {

            string updatedREsult = string.Empty;
            if (_customer != null)
            {
                using (ELFILOEntities _enties = new ELFILOEntities())
                {
                    var _cust = _enties.Customer.Where(x => x.accountNumber == _customer.accountNumber).FirstOrDefault();

                    _cust.customerType = _customer.customerType;
                    _cust.firstName = _customer.firstName;
                    _cust.lastName = _customer.lastName;
                    _cust.terms = _customer.terms;
                    _cust.address = _customer.address;
                    _cust.contactNumber = _customer.contactNumber;

                    if(_cust != null) 
                    _enties.Customer.AddOrUpdate(_cust);
                    _enties.SaveChanges();
                    updatedREsult = "Successfully Updated";                
                }
            }else
            {
                updatedREsult = "Error While updating";
            }
            return updatedREsult;

        }

        /// <summary>
        /// Delette Customer Account
        /// </summary>
        /// <param name="_customer"></param>
        /// <returns></returns>

        public string DeleteCustomer(string accountNumber)
        {
            using(ELFILOEntities _entites = new ELFILOEntities())
            {
                var result = _entites.Customer.Where(x => x.accountNumber == accountNumber).FirstOrDefault();
                if(result != null)
                {
                    _entites.Customer.Remove(result);
                    _entites.SaveChanges();
                    return "Successfully Deleted";
                }else
                {
                    return "Unable to delete";
                }
            }
        }

        /// <summary>
        /// Getl All Customer
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllCustomer()
        {
            using (ELFILOEntities _entities = new ELFILOEntities())
            {
                List<Customer> _cusomter = _entities.Customer.ToList();
                return Json(new { data = _cusomter },JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// Get Single Account
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <returns></returns>
        public JsonResult GetSingleCustomerAccount(string accountNumber)
        {    
                using (ELFILOEntities _entites = new ELFILOEntities())
                {
                    var _result = _entites.Customer.Where(x => x.accountNumber == accountNumber).FirstOrDefault();
                    return Json(_result, JsonRequestBehavior.AllowGet);
                }            
        }


    }


}