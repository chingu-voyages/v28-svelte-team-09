import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";



export const employeesByUserID = ({ id }) => 
  queryOp(
    gql`
     query EmployessByUserID($id: ID!) {
       result: findUserByID(id: $id){
         employees{
           data{
             _id
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

export const  useCreateEmployee = () => 
  mutationOp(
    gql`
     mutation CreateEmployee(
       $name: String!
       $phone: String
       $email: String!
       $id: ID!
     ){
       result: createEmployee(
         data: {
           name: $name
           phone: $phone
           email: $email
           manager: { connect: $id }
         }
       ){
         _id
         name
         phone
         email
         manager {
           name
         }
       }
     }
    `
  )
