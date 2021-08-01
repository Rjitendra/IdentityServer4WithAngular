using System;
using Bridgetree.Blazor.Server.Web.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(Bridgetree.Blazor.Server.Web.Areas.Identity.IdentityHostingStartup))]
namespace Bridgetree.Blazor.Server.Web.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<BridgetreeBlazorServerWebContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("BridgetreeBlazorServerWebContextConnection")));

                services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                    .AddEntityFrameworkStores<BridgetreeBlazorServerWebContext>();
            });
        }
    }
}