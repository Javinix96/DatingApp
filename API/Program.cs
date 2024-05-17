using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(opt => 
    {
        opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConection"));
    }
);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors();

var app = builder.Build();

app.UseCors((builder) => builder.AllowAnyHeader().AllowAnyHeader().WithOrigins("http://localhost:4200"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
