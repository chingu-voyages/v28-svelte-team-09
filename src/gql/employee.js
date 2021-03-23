import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";

export const employeesByUserID = ({ id }) =>
  queryOp(
    gql`
      query EmployessByUserID($id: ID!) {
        result: findUserByID(id: $id) {
          employees {
            data {
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
  );

export const useCreateEmployee = () =>
  mutationOp(
    gql`
      mutation CreateEmployee(
        $name: String!
        $phone: String
        $email: String
        $manager: ID!
        $hourlyWage: Int!
        $contactName: String
        $contactPhone: String
      ) {
        result: createEmployee(
          data: {
            name: $name
            phone: $phone
            email: $email
            manager: { connect: $manager }
            hourlyWage: $hourlyWage
            emergencyContact: {
              name:  $contactName 
              phone:  $contactPhone 
            }
          }
        ) {
          _id
          name
          phone
          email
          hourlyWage
          manager {
            name
          }
          emergencyContact{
            name
            phone
          }
        }
      }
    `
  );
