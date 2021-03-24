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

export const createShift = () => {
  mutationOp(
    gql`
      mutation CreateShift(
        $start: Date!
        $finish: Date!
        $creator: ID!
        $break: Int
        $assignedTo: ID!
        $notes: String
        $areaName: String!
        $color: String!
      ) {
        createShift(
          data: {
            start: $start
            finish: $finish
            creator: { connect: $creator }
            break: $break
            assignedTo: { connect: $assignedTo }
            notes: $notes
            area: {
              create: {
                name: $areaName
                company: { connect: $creator }
                color: $color
              }
            }
          }
        ) {
          ...shiftFields
        }
      }
      ${SHIFT_FIELDS}
    `
  );
};

export const assignShift = () => {
  mutationOp(
    gql`
      mutation UpdateShift(
        $employeeID: ID!
        $shiftID: ID!
        $start: Date!
        $finish: Date!
      ) {
        result: updateShift(
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
};
