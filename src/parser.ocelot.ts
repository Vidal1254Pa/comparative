import { Route } from "./model";

export default function ParserOcelot(item: Route) {
  return `new()
{
    Input="${item.UpstreamPathTemplate}",
    To="${item.DownstreamPathTemplate}",
    Methods=DeclaredMethods.GetHttpMethods(new[] {${GetMethodName(
      item.UpstreamHttpMethod
    )}}),
    ${item.AuthenticationOptions != undefined ? "AuthIsRequired=true," : ""}
    ${item.RouteClaimsRequirement != undefined ? "HasProtectedMetadata=true," : ""}
    ${item.RouteClaimsRequirement != undefined ? `
    ProtectedMetadataValue =
    {
        {"UserData", "${item.RouteClaimsRequirement.UserData}"}
    }
    ` : ""}
}`;
}

function GetMethodName(method: string[]) {
  return method
    .map((item) => {
      switch (item) {
        case "POST":
          return "Method.POST";
        case "PUT":
          return "Method.PUT";
        case "DELETE":
          return "Method.DELETE";
        case "GET":
          return "Method.GET";
      }
    })
    .join(",");
}
