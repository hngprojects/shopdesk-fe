import { create } from "zustand";

type State = {
  organizationId: string;
  organizationName: string;
  setOrganizationId: (organizationId: string) => void;
  setOrganizationName: (organizationName: string) => void;
};

export const useStore = create<State>((set) => ({
  organizationId: "",
  organizationName: "",
  setOrganizationId: (organizationId) => set({ organizationId }),
  setOrganizationName: (organizationName) => set({ organizationName }),
}));


/*
Usage for Stephen
import useStore from 'path'

const {organizationId, organizationName, setOrganizationId, setOrganizationName} = useStore(); // just destructure the properties that you need.

 TO SET A VALUE

setOrganizationId('the_organization_id');
or
setOrganizationName('the_organization_name');

TO USE THE STATE

EXAMPLE:

<p>Organization ID: {organizationId}</p>
or 
<p>Organization Name: {organizationName}</p>

Or To send to an API route as request body

const body = {
  organizationId, // ensure you've set the organization id first
  productId, // if available or needed
  name: inputValueStateForName,
} // and so on

 TO SEND TO API ROUTE AS A PARAMETER

 const apiUrl = `api/stocks/create?organization_id=${organizationId}`

 THANK YOU!!!!!!!!!!1
*/
