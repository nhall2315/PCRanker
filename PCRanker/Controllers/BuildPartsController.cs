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
    public class BuildPartsController : ControllerBase
    {
        private readonly BuildPartContext _context;

        public BuildPartsController(BuildPartContext context)
        {
            _context = context;
        }

        // GET: api/BuildParts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BuildPart>>> GetBuildParts()
        {
            return await _context.BuildParts.ToListAsync();
        }

        // GET: api/BuildParts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BuildPart>> GetBuildPart(long id)
        {
            var buildPart = await _context.BuildParts.FindAsync(id);

            if (buildPart == null)
            {
                return NotFound();
            }

            return buildPart;
        }

        // PUT: api/BuildParts/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuildPart(long id, BuildPart buildPart)
        {
            if (id != buildPart.ID)
            {
                return BadRequest();
            }

            _context.Entry(buildPart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuildPartExists(id))
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

        // POST: api/BuildParts
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<BuildPart>> PostBuildPart(BuildPart buildPart)
        {
            _context.BuildParts.Add(buildPart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBuildPart", new { id = buildPart.ID }, buildPart);
        }

        // DELETE: api/BuildParts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BuildPart>> DeleteBuildPart(long id)
        {
            var buildPart = await _context.BuildParts.FindAsync(id);
            if (buildPart == null)
            {
                return NotFound();
            }

            _context.BuildParts.Remove(buildPart);
            await _context.SaveChangesAsync();

            return buildPart;
        }

        private bool BuildPartExists(long id)
        {
            return _context.BuildParts.Any(e => e.ID == id);
        }
    }
}
