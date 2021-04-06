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
        $start: Time!
        $finish: Time!
        $creator: ID!
        $break: Int
        $assignedTo: ShiftAssignedToRelation # employee ID
        $notes: String
        $area: ID!
      ) {
        createShift(
          data: {
            start: $start
            finish: $finish
            creator: { connect: $creator }
            break: $break
            assignedTo: $assignedTo
            notes: $notes
            area: { connect: $area }
          }
        ) {
          ...shiftFields
        }
      }
      ${SHIFT_FIELDS}
    `,
    ({ assignedTo, ...vars }) => ({
      assignedTo: assignedTo ? { connect: assignedTo } : undefined,
      ...vars,
    })
  );

export const useAssignShift = () =>
  mutationOp(
    gql`
      mutation UpdateShift(
        $shiftID: ID!
        $start: Time
        $finish: Time
        $assignedTo: ShiftAssignedToRelation # employee ID
        $break: Int
        $notes: String
        $area: ID
      ) {
        result: partialUpdateShift(
          id: $shiftID
          data: {
            start: $start
            finish: $finish
            break: $break
            notes: $notes
            area: { connect: $area }
            assignedTo: $assignedTo
          }
        ) {
          ...shiftFields
        }
      }
      ${SHIFT_FIELDS}
    `,
    ({ assignedTo, ...vars }) => ({
      assignedTo: assignedTo ? { connect: assignedTo } : undefined,
      ...vars,
    })
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

  export const useDeleteShift = () => 
  mutationOp(
    gql`
      mutation DeleteShift($id: ID!) {
        deleteShift(id: $id) {
          _id
          name
        }
      }
    `
  );
