import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

// This reirective transforms a string into uppercase, when called
// e.g. If you want to guarantee that certain attribute is always UpperCase in the database, you can use this directive directly in your mutation's attribute
function upperDirectiveTransformer(schema: any, directiveName: any) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === "string") {
            return result.toUpperCase();
          }

          return result;
        };

        return fieldConfig;
      }
    },
  });
}

export { upperDirectiveTransformer };
