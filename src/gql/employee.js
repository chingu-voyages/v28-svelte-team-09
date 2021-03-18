import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";



export const employeesByUserID = ({ id }) => 
  queryOp(
    gql`
     query EmployessByUserID($id: ID!) {
       result: findUserByID(id: $id){
         employees{
           data{
             name
             manager {
               name
             }
             email
             phone
           }
         }
       }
     }
    `,
    { id }
  )
