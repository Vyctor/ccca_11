import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import GatewayHttpFactory from "./infra/factory/GatewayHttpFactory";
import FreightHttpGateway from "./infra/gateway/FreightHttpGateway";

const connection = new PgPromiseAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const httpClient = new AxiosAdapter();
const gatewayFactory = new GatewayHttpFactory(httpClient);
const freightGateway = new FreightHttpGateway(httpClient);
const usecaseFactory = new UsecaseFactory(
  repositoryFactory,
  gatewayFactory,
  freightGateway
);

const httpServer = new ExpressAdapter();
new HttpController(httpServer, usecaseFactory);
httpServer.listen(3000);
