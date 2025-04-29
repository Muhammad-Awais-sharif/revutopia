import { ContactDetailsInputs } from '../pages/contact-details/contact-details-form.schema';
import { BusinessInfoInputs } from '../components/business-info/business-info-form.schema';
import { LinkAccountInputs } from '../pages/link-account/link-account-form.schema';
import { AccessPermissionsInputs } from '../components/access-permissions/access-permissions-form.schema';

export type FormData = {
  businessInfo: BusinessInfoInputs;
  contactDetails: ContactDetailsInputs;
  linkAccounts: LinkAccountInputs[];
  accessPermissions: AccessPermissionsInputs;
};
