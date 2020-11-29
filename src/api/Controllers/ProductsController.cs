using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private IMemoryCache _cache;
        private Dictionary<int, Product> _products = new Dictionary<int, Product>();
        private readonly ILogger<WeatherForecastController> _logger;

        public ProductsController(ILogger<WeatherForecastController> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _cache = memoryCache;

            PrepareCache();
        }

        [HttpGet] //GET: api/products
        public IEnumerable<Product> Get()
        {
            return _products.Values.ToArray().OrderBy(p => p.Name);
        }

        [HttpGet("{id}")] //GET: api/products/999
        public Product Get(int id)
        {
            return _products[id];
        }

        [HttpPost] //POST: api/products/
        public void Post([FromBody] Product p)
        {
            var id = 1 + (_products.Values.Max(p => p.ID) ?? 0);
            p.ID = id;
            _products.Add(id, p);
        }

        [HttpPut] //PUT: api/products/999
        [Route("{id}")]
        public void Put(int id, [FromBody] Product p)
        {
            p.ID = id;
            _products[id] = p;
        }


        [HttpPost] // POST: api/products/checkout
        [Route("checkout")]
        public void Checkout([FromBody] int[] productIds)
        {
            foreach (int id in productIds)
            {
                ReduceStock(id);
            }
        }


        private void ReduceStock(int productId)
        {
            var product = _products[productId];
            product.Quantity = product.Quantity > 0 ? product.Quantity - 1 : 0;
        }

        private void PrepareCache()
        {
            Dictionary<int, Product> dict = null;

            if (!_cache.TryGetValue("products", out dict))
            {
                //TODO: remove this!
                dict = new Dictionary<int, Product>();
                dict.Add(1, new Product() { ID = 1, Name = "Tea", Price = 4.99, Quantity = 50, ImageUrl = "https://chartwell.com/-/media/Images/blog/2019/05/7-medicinal-benefits%20-of-tea-for-older-adults" });
                dict.Add(2, new Product() { ID = 2, Name = "Coffee", Price = 7.25, Quantity = 10, ImageUrl = "https://images.creativemarket.com/0.1.0/ps/4795288/1820/1213/m1/fpnw/wm1/ukscxilngvqijvzfmi3okudf2p1yzqsjbw9ruuae30f8ii1hdnpkuom2nvrmnqel-.jpg?1532273884&s=e59186150d5089dd6ed2517de5359777" });
                dict.Add(3, new Product() { ID = 3, Name = "Sugar", Price = 0.99, Quantity = 250 });

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromMinutes(60));

                _cache.Set("products", dict, cacheEntryOptions);
            }

            _products = dict;
        }
    }
}
