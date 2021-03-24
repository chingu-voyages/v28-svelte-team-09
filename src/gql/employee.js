import { queryOp, mutationOp } from "$utils/client";
import { gql } from "@urql/svelte";

const EMPLOYEE_FIELDS = gql`
  fragment employeeFields on Employee {
    _id
    name
    phone
    email
    hourlyWage
    manager {
      name
    }
    emergencyContact {
      name
      phone
    }
  }
`;

export const employeesByUserID = ({ id }) =>
  queryOp(
    gql`
      query EmployessByUserID($id: ID!) {
        result: findUserByID(id: $id) {
          employees {
            data {
             ...employeeFields
            }
          }
        }
      }
      ${EMPLOYEE_FIELDS}
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
            emergencyContact: { name: $contactName, phone: $contactPhone }
          }
        ) {
         ...employeeFields
        }
      }
      ${EMPLOYEE_FIELDS}
    `
  );
