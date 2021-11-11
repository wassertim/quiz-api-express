import appRoot from "app-root-path";
import fs from "fs";
import jsYaml from "js-yaml";
import { OpenApiDocument, OpenApiValidator } from "express-openapi-validate";

const openApiDocument = jsYaml.load(fs.readFileSync(`${appRoot}/api.yaml`, "utf-8")) as OpenApiDocument;

export const openapi = new OpenApiValidator(openApiDocument, {});