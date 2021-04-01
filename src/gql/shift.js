import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";

const SHIFT_FIELDS = gql`
  fragment shiftFields on Shift {
    _id
    start
    finish
    creator {
      name
    }
    break
    assignedTo {
      name
      emergencyContact {
        name
        phone
      }
    }
    notes
    area {
      name
      company {
        name
      }
      color
    }
  }
`;

export const useCreateShift = () =>
  mutationOp(
    gql`
      mutation CreateShift(
        $start: Date!
        $finish: Date!
        $creator: ID!
        $break: Int
        $assignedTo: ID
        $notes: String
        $area: ID!
      ) {
        createShift(
          data: {
            start: $start
            finish: $finish
            creator: { connect: $creator }
            break: $break
            assignedTo: { connect: $assignedTo }
            notes: $notes
            area: { connect: $area }
          }
        ) {
          ...shiftFields
        }
      }
      ${SHIFT_FIELDS}
    `
  );

export const useAssignShift = () =>
  mutationOp(
    gql`
      mutation UpdateShift(
        $employeeID: ID!
        $shiftID: ID!
        $start: Date!
        $finish: Date!
      ) {
        result: partialUpdateShift(
          id: $shiftID
          data: {
            start: $start
            finish: $finish
            assignedTo: { connect: $employeeID }
          }
        ) {
          ...shiftFields
        }
      }
      ${SHIFT_FIELDS}
    `
  );

export const updateArea = () =>
  mutationOp(
    gql`
      mutation UpdateArea(
        $areaId: ID!
        $name: String!
        $color: String!
        $company: ID
      ) {
        updateArea(
          id: $areaId
          data: { name: $name, color: $color, company: { connect: $company } }
        ) {
          name
          color
          company {
            name
          }
        }
      }
    `
  );

export const shiftsByUserID = ({ id }) =>
  queryOp(
    gql`
      query ShiftsByUserID($id: ID!) {
        result: findUserByID(id: $id) {
          shifts {
            data {
              start
              finish
              break
              notes
              assignedTo {
                name
                hourlyWage
                _id
              }
              _id
              area {
                name
                color
                _id
              }
            }
          }
        }
      }
    `,
    { id }
  );
