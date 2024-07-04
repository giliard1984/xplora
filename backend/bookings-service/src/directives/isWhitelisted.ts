import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError } from "graphql";
const WhitelistSchema = require("../models/whitelist");

// This directive aims to check if an application is whitelisted, and prevent unexpected calls
// It is a security measure, so only whitelisted applications can access certain data
function isWhitelistedDirectiveTransformer(schema: any, directiveName :any) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isWhitelistedDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (isWhitelistedDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);

          if (!context?.appKey) throw new GraphQLError("appKey has not been informed");

          const whitelistedInfo = await WhitelistSchema.findOne({
            token: context.appKey
          });

          if (!whitelistedInfo) throw new GraphQLError("Request has been rejected");

          return result;
        };

        return fieldConfig;
      }
    },
  });
};

export { isWhitelistedDirectiveTransformer };
