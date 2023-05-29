import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";

const connection = new PgPromiseAdapter();
const usecaseFactory = new UsecaseFactory();

const httpServer = new ExpressAdapter();
new HttpController(httpServer, usecaseFactory);
httpServer.listen(3002);
