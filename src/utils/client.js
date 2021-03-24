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

// * @urql/svelte runs in browser env by default, below funcs bypass SSR env errors w/ `query` / `mutation`

/** Creates a query for a component to consume, fires as soon as the component mounts.
 * @param {object} [variables]
 */
export const queryOp = (gqlQuery, variables) =>
  typeof window != "undefined" // fix: SSR env errors, query cannot run in SSR
    ? query(operationStore(gqlQuery, variables))
    : operationStore(gqlQuery, variables);

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
  const mutationStore = operationStore(gqlMutation);
  const mutateOp = mutation(mutationStore);
  /** Runs GQL mutation.
   * @param {object} variables GraphQL variables. Passed through cbVarsObj() for restructuring.
   */
  const setMutation =
    typeof window != "undefined" // fix: SSR env errors, mutation cannot run in SSR
      ? (variables) => mutateOp(cbVarsObj(variables))
      : () => new Promise((resolve) => resolve(mutationStore));
  return [setMutation, mutationStore];
}
