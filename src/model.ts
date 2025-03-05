export interface RootObject {
  Routes: Route[];
  GlobalConfiguration: GlobalConfiguration;
}

interface GlobalConfiguration {
  BaseUrl: string;
}

export interface Route {
  DownstreamPathTemplate: string;
  UpstreamPathTemplate: string;
  DownstreamScheme: string;
  UpstreamHttpMethod: string[];
  DownstreamHostAndPorts: DownstreamHostAndPort[];
  AuthenticationOptions?: AuthenticationOptions;
  RouteClaimsRequirement?: RouteClaimsRequirement;
  category?:string
}

interface RouteClaimsRequirement {
  UserData: string;
}

interface AuthenticationOptions {
  AuthenticationProviderKey: string;
}

interface DownstreamHostAndPort {
  Host: string;
  Port: number;
}