import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import UsecaseFactory from "./infra/factory/UsecaseFactory";

const connection = new PgPromiseAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);

const httpServer = new ExpressAdapter();
new HttpController(httpServer, usecaseFactory);
httpServer.listen(3004);
