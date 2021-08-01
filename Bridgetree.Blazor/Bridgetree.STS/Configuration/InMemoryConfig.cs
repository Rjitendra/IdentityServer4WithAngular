using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Bridgetree.STS.Configuration
{
    public static class InMemoryConfig
    {
        public static IEnumerable<IdentityResource> GetIdentityResources() =>
          new List<IdentityResource>
          {
              new IdentityResources.OpenId(),
              new IdentityResources.Profile(),
              new IdentityResources.Address(),

          };

        public static IEnumerable<ApiScope> GetApiScopes() =>
           new List<ApiScope> { new ApiScope("companyApi", "CompanyEmployee API") };

        public static IEnumerable<ApiResource> GetApiResources() =>
            new List<ApiResource>
            {
                new ApiResource("companyApi", "CompanyEmployee API")
                {
                    Scopes = { "companyApi" }
                }
            };

        public static List<TestUser> GetUsers() =>
          new List<TestUser>
          {
              new TestUser
              {
                  SubjectId = "a9ea0f25-b964-409f-bcce-c923266249b4",
                  Username = "jitendra",
                  Password = "jitendra",
                  Claims = new List<Claim>
                  {
                      new Claim("given_name", "Mick"),
                      new Claim("family_name", "Mining"),
                      new Claim("address", "Sunny Street 4"),

                  }
              },
              new TestUser
              {
                  SubjectId = "c95ddb8c-79ec-488a-a485-fe57a1462340",
                  Username = "Jane",
                  Password = "JanePassword",
                  Claims = new List<Claim>
                  {
                      new Claim("given_name", "Jane"),
                      new Claim("family_name", "Downing"),
                      new Claim("address", "Long Avenue 289"),

                  }
              }
          };

        public static IEnumerable<Client> GetClients() =>
            new List<Client>
            {
               new Client
               {
                    ClientId = "company-employee",
                    ClientSecrets = new [] { new Secret("codemazesecret".Sha512()) },
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    AllowedScopes = { IdentityServerConstants.StandardScopes.OpenId, "companyApi" }
               },
               new Client
               {
                   ClientName = "MVC Client",
                   ClientId = "mvc-client",
                   AllowedGrantTypes = GrantTypes.Hybrid,
                   RedirectUris = new List<string>{ "https://localhost:5010/signin-oidc" },
                   RequirePkce = false,
                   AllowedScopes =
                   {
                       IdentityServerConstants.StandardScopes.OpenId,
                       IdentityServerConstants.StandardScopes.Profile,
                       IdentityServerConstants.StandardScopes.Address,
                      "companyApi",

                   },
                   ClientSecrets = { new Secret("MVCSecret".Sha512()) },
                   PostLogoutRedirectUris = new List<string> { "https://localhost:5010/signout-callback-oidc" },
                   RequireConsent = true
               },
               new Client
               {
                   ClientName = "Angular-Client",
                   ClientId = "angular-client",
                   AllowedGrantTypes = GrantTypes.Code,
                   RedirectUris = new List<string>{ "http://localhost:4210/src","http://localhost:4210/assets/signin-callback.html", "http://localhost:4210/assets/silent-callback.html" },
                   RequirePkce = true,
                   AllowAccessTokensViaBrowser = true,
                   AllowedScopes =
                   {
                       IdentityServerConstants.StandardScopes.OpenId,
                       IdentityServerConstants.StandardScopes.Profile,
                       "companyApi"
                   },
                   AllowedCorsOrigins = { "http://localhost:4210" },
                   RequireClientSecret = false,
                   PostLogoutRedirectUris = new List<string> { "http://localhost:4210" },
                   RequireConsent = false,
                   AccessTokenLifetime = 120
               }
            };
    }
}
