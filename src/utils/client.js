import {
  initClient as urqlInit,
  operationStore,
  query,
  mutation,
  // defaultExchanges, // ! for dev only
} from "@urql/svelte";
// import { devtoolsExchange } from "@urql/devtools"; // ! for dev only

/** urql preconfigured fauna client */
export const initClient = (secret) =>
  urqlInit({
    url: "https://graphql.fauna.com/graphql",
    // exchanges: [devtoolsExchange, ...defaultExchanges], // ! for dev only
    fetchOptions() {
      return {
        headers: {
          authorization: secret ? `Bearer ${secret}` : "",
          "X-Schema-Preview": "partial-update-mutation",
        },
      };
    },
  });

/** Creates a query for a component to consume, fires as soon as the component mounts.
 * @param {object} [variables]
 */
export const queryOp = (gqlQuery, variables) =>
  typeof window != "undefined" && query(operationStore(gqlQuery, variables));

/** Creates a mutation for a component to consume.
 * @param {function} [cbVarsObj] Callback that de+restructures the query variables object passed in.
 * Useful for defaults/fallbacks. If undefined, will pass the var obj unmodified.
 * Example restructuring:
 * ```js
 * ({ name = "no name entered", id }) => ({ name, id })
 * ```
 * @returns {Array} Tuple: Mutation func & op store.
 * Usage:
 * ```js
 * const [createNote, noteStore] = useCreateNote();
 * $noteStore
 * createNote(varsObj)
 * ```
 */
export function mutationOp(gqlMutation, cbVarsObj = (variables) => variables) {
  if (typeof window == "undefined") return [null, null];
  const mutationStore = operationStore(gqlMutation);
  const mutateOp = mutation(mutationStore);
  /** Runs GQL mutation.
   * @param {object} variables GraphQL variables. Passed through cbVarsObj() for restructuring.
   */
  function setMutation(variables) {
    return mutateOp(cbVarsObj(variables));
  }

  return [setMutation, mutationStore];
}
