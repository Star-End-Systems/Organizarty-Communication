import "reflect-metadata";

import { ServerEnvironment } from "@expressots/adapter-express";
import { AppFactory } from "@expressots/core";
import { App } from "@providers/application/application.provider";
import { container } from "./app.container";
import ENV from "env";

async function bootstrap() {
  const app = await AppFactory.create(container, App);
  await app.listen(ENV.Application.PORT, GetRunningEnv());
}

function GetRunningEnv(): ServerEnvironment {
  if (ENV.Application.ENVIRONMENT == "Development") {
    return ServerEnvironment.Development;
  }

  return ServerEnvironment.Production
}

bootstrap();
