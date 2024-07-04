import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError } from "graphql";
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

// This directive checks if a user is authenticated, in order to query a specific data or proceed with an operation
function authDirectiveTransformer(schema: any, directiveName: any) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);

          if (!context?.token) throw new GraphQLError("Unauthorized")

          jwt.verify(context?.token, config.secret, (err: any, decoded: any) => {
            if (err) {
              throw new GraphQLError("Unauthorized");
            }
          })

          return result;
        };

        return fieldConfig;
      }
    },
  });
}

export { authDirectiveTransformer };
