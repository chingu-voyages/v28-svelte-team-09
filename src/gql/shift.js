import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";


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
      ){
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
                name:  $areaName
                company: { connect: $creator }
                color: $color
              }
            }
          }
        ){
          _id
          start
          finish
          creator{
            name
          }
          break
          assignedTo{
            name
            emergencyContact{
              name
              phone
            }
          }
          notes
          area{
            name
            company {
              name
            }
            color
          }
        }
      }
    `
  )
}