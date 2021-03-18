import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";



export const useCreateEmployee = () => {
   mutationOp(
     gql`
      mutation CreateEmployee(
        $name: String!
        $email: String!
        $id: ID!
      ){
        result: createEmployee(
          data: {
            name: $name
            email:$email
            manager: { connect: $id }
          }
        ){
          _id
          name
          email
          manager
        }
      }
     `
   )
}

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
