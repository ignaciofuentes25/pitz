using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LectorQR.Startup))]
namespace LectorQR
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
