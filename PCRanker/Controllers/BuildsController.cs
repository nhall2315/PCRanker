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
    public class BuildsController : ControllerBase
    {
        private readonly PCRankerContext _context;

        public BuildsController(PCRankerContext context)
        {
            _context = context;
        }

        // GET: api/Builds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Build>>> GetBuilds()
        {
            return await _context.Builds.ToListAsync();
        }

        // GET: api/Builds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Build>> GetBuild(long id)
        {
            var build = await _context.Builds.FindAsync(id);

            if (build == null)
            {
                return NotFound();
            }

            return build;
        }
        // GET: api/Builds/Parts/{id}
        [HttpGet("Parts/{id}")]
        public async Task<List<BuildPart>> GetFilteredParts(long id)
        {
            var parts = await _context.BuildParts
                .Where(bp => bp.BuildID == id)
                .Include(bp => bp.Part)
                .ToListAsync();

            return parts;
        }
        // PUT: api/Builds/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuild(long id, Build build)
        {
            if (id != build.ID)
            {
                return BadRequest();
            }

            _context.Entry(build).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuildExists(id))
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

        // POST: api/Builds
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Build>> PostBuild(Build build)
        {
            _context.Builds.Add(build);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBuild", new { id = build.ID }, build);
        }

        // DELETE: api/Builds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Build>> DeleteBuild(long id)
        {
            var build = await _context.Builds.FindAsync(id);
            if (build == null)
            {
                return NotFound();
            }

            _context.Builds.Remove(build);
            await _context.SaveChangesAsync();

            return build;
        }

        private bool BuildExists(long id)
        {
            return _context.Builds.Any(e => e.ID == id);
        }
    }
}
