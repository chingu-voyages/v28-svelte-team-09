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

export const useCreateArea = () =>
  mutationOp(gql`
    mutation CreateArea($id: ID!, $name: String!, $color: String!) {
      result: createArea(
        data: { name: $name, color: $color, company: { connect: $id } }
      ) {
        name
        _id
      }
    }
  `);

export const useUpdateArea = () =>
  mutationOp(gql`
    mutation UpdateArea($id: ID!, $name: String, $color: String) {
      partialUpdateArea(id: $id, data: { name: $name, color: $color }) {
        name
        color
        _id
      }
    }
  `);

export const useDeleteArea = () =>
  mutationOp(gql`
    mutation DeleteArea($id: ID!) {
      deleteArea(id: $id) {
        _id
        name
      }
    }
  `);
