import express, { Request, Response } from "express";
import Checkout from "./Checkout";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PgPromiseAdapter from "./PgPromiseAdapter";
import ExpressAdapter from "./ExpressAdapter";
import HttpController from "./HttpController";
import UsecaseFactory from "./UsecaseFactory";

const connection = new PgPromiseAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);

const httpServer = new ExpressAdapter();
new HttpController(httpServer, usecaseFactory);
httpServer.listen(3000);
