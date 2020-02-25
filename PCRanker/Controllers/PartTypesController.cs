using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCRanker.Models;

namespace PCRanker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartTypesController : ControllerBase
    {
        private readonly PCRankerContext _context;

        public PartTypesController(PCRankerContext context)
        {
            _context = context;
        }

        // GET: api/PartTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartType>>> GetPartTypes()
        {
            return await _context.PartTypes.ToListAsync();
        }

        // GET: api/PartTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartType>> GetPartType(long id)
        {
            var partType = await _context.PartTypes.FindAsync(id);

            if (partType == null)
            {
                return NotFound();
            }

            return partType;
        }

        // PUT: api/PartTypes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartType(long id, PartType partType)
        {
            if (id != partType.ID)
            {
                return BadRequest();
            }

            _context.Entry(partType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PartTypes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<PartType>> PostPartType(PartType partType)
        {
            _context.PartTypes.Add(partType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartType", new { id = partType.ID }, partType);
        }

        // DELETE: api/PartTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PartType>> DeletePartType(long id)
        {
            var partType = await _context.PartTypes.FindAsync(id);
            if (partType == null)
            {
                return NotFound();
            }

            _context.PartTypes.Remove(partType);
            await _context.SaveChangesAsync();

            return partType;
        }

        private bool PartTypeExists(long id)
        {
            return _context.PartTypes.Any(e => e.ID == id);
        }
    }
}
