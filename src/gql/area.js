import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";

export const areasByUserID = ({ id }) =>
  queryOp(
    gql`
      query AreasByUserID($id: ID!) {
        result: findUserByID(id: $id) {
          areas {
            data {
              name
              color
              _id
            }
          }
        }
      }
    `,
    { id }
  );
