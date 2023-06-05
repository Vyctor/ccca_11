import RepositoryFactory from "../../application/factory/RepositoryFactory";

export default class UsecaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}
}
